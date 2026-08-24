export const prerender = false;

import { Resend } from "resend";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  lang?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST({ request }: { request: Request }) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO;

  if (!apiKey || !to) {
    return new Response(JSON.stringify({ ok: false, error: "Email service not configured." }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const name = (body.name || "").trim().slice(0, 80);
  const email = (body.email || "").trim().slice(0, 120);
  const message = (body.message || "").trim().slice(0, 4000);

  if (!name || name.length < 2) {
    return new Response(JSON.stringify({ ok: false, error: "Name required." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (!email || !isEmail(email)) {
    return new Response(JSON.stringify({ ok: false, error: "Valid email required." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (!message || message.length < 10) {
    return new Response(JSON.stringify({ ok: false, error: "Message too short (10+ chars)." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);

  // Use onboarding@resend.dev until soofshoot.app domain is verified in Resend.
  // replyTo lets you answer directly to the sender.
  try {
    const { error } = await resend.emails.send({
      from: "soofShoot Contact <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `[soofShoot] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nLang: ${body.lang || "en"}\n\n${message}`,
      html: `<div style="font-family: ui-sans-serif, system-ui, -apple-system; line-height:1.6; color:#0a0a0f">
        <h2 style="margin:0 0 12px; font-size:18px">New soofShoot contact</h2>
        <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 16px"><strong>Lang:</strong> ${escapeHtml(body.lang || "en")}</p>
        <div style="white-space:pre-wrap; background:#f4f4f5; border:1px solid #e4e4e7; border-radius:10px; padding:14px; font-size:14px">${escapeHtml(message)}</div>
      </div>`,
    });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message || "Failed to send." }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
