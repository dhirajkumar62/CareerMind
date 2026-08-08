import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        const error = new Error("Email service is not configured.");
        error.statusCode = 503;
        throw error;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"CareerMinds" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error.message);
        const deliveryError = new Error(
            "Unable to send the verification email. Please try again later."
        );
        deliveryError.statusCode = 502;
        throw deliveryError;
    }
};

export default sendEmail;
