import nodemailer from "nodemailer";
import Form from "../models/formModel.js";

// @desc  Submit contact form + send email notification
// @route POST /api/contact
export const submitForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    // Save to MongoDB
    const form = await Form.create({ name, email, message });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to store owner
    await transporter.sendMail({
      from: `"IrisNlo Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.STORE_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New message from your website contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Auto-reply to the customer
    await transporter.sendMail({
      from: `"IrisNlo Jewellery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out to IrisNlo Jewellery! We've received your message and will get back to you as soon as possible.</p>
        <br/>
        <p>Here's a copy of what you sent:</p>
        <p><em>${message}</em></p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>IrisNlo Jewellery Team</strong></p>
      `,
    });

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
};

// @desc  Get all contact form submissions (admin only)
// @route GET /api/contact
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages.", error: error.message });
  }
};