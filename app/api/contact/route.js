import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const REQUIRED_ENV_KEYS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_EMAIL_TO"
]

const escapeHtml = (value) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const toSafeString = (value) => {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request) {
  try {
    const body = await request.json()

    const firstName = toSafeString(body.firstName)
    const lastName = toSafeString(body.lastName)
    const email = toSafeString(body.email)
    const phone = toSafeString(body.phone)
    const service = toSafeString(body.service)
    const message = toSafeString(body.message)

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const missingEnv = REQUIRED_ENV_KEYS.filter((key) => !process.env[key])

    if (missingEnv.length > 0) {
      return NextResponse.json(
        { error: `Email service is not configured: ${missingEnv.join(", ")}` },
        { status: 500 }
      )
    }

    const port = Number(process.env.SMTP_PORT)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const sender = process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER
    const recipient = process.env.CONTACT_EMAIL_TO
    const senderName = [firstName, lastName].filter(Boolean).join(" ")

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact form: ${senderName || firstName}`,
      text: [
        `Name: ${senderName || firstName}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Service: ${service || "N/A"}`,
        "",
        "Message:",
        message
      ].join("\n"),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(senderName || firstName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "N/A")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `
    })

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 })
  } catch (error) {
    console.error("Contact email send error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
