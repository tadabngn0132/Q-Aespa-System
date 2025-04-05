const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP details: host, port, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const SENDER_NAME = process.env.EMAIL_USER_NAME;
const SENDER_EMAIL = process.env.EMAIL_USER;
const FROM_ADDRESS = `${SENDER_NAME} <${SENDER_EMAIL}>`;

const emailService = {
    /**
     * Send a simple email
     * @param {string} to - Recipient email address
     * @param {string} subject - Email subject
     * @param {string} text - Plain text email body
     * @param {string} html - HTML email body (optional)
     * @returns {Promise} - Resolves with info about the sent email
     */
    sendEmail: async (to, subject, text, html) => {
        const mailOptions = {
            from: FROM_ADDRESS,
            to,
            subject,
            text,
            html: html || text
        };

        return await transporter.sendMail(mailOptions);
    },

    /**
     * Send welcome email to new users
     * @param {string} to - User's email address
     * @param {string} name - User's name
     * @returns {Promise} - Resolves with info about the sent email
     */
    sendWelcomeEmail: async (to, name) => {
        const subject = 'Welcome to Q&Aespa!';
        const text = `Hello ${name}, welcome to Q&Aespa! We're happy to have you join our community.`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0; text-align: left;">
                <h2 style="color: #3498db;">Welcome to Q&Aespa!</h2>
                <p>Hello ${name},</p>
                <p>Thank you for joining our community. We're excited to have you with us!</p>
                <p>You can now:</p>
                <ul>
                <li>Ask questions about topics you're interested in</li>
                <li>Answer questions to help others</li>
                <li>Vote on the best content</li>
                </ul>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <p>Best regards,<br>The Q&Aespa Team</p>
            </div>
        `;

        return await emailService.sendEmail(to, subject, text, html);
    },

    /**
     * Send email notification when a question is answered
     * @param {string} to - User's email address
     * @param {string} name - User's name
     * @param {string} questionTitle - Title of the question
     * @param {string} questionId - ID of the question
     * @returns {Promise} - Resolves with info about the sent email
     */
    sendAnswerNotification: async (to, name, questionTitle, questionId) => {
        const subject = `New answer to your question: ${questionTitle}`;
        const text = `Hello ${name}, your question "${questionTitle}" has received a new answer. Check it out!`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0; text-align: left;">
                <h2 style="color: #3498db;">New Answer!</h2>
                <p>Hello ${name},</p>
                <p>Your question has received a new answer:</p>
                <p style="font-weight: bold;">"${questionTitle}"</p>
                <p><a href="${process.env.FRONTEND_URL}/student/questions/${questionId}" style="color: #3498db; text-decoration: none; font-weight: bold;">Click here</a> to view the answer.</p>
                <p>Best regards,<br>The Q&Aespa Team</p>
            </div>
        `;

        return await emailService.sendEmail(to, subject, text, html);
    },

    /**
     * Send password reset email
     * @param {string} to - User's email address
     * @param {string} name - User's name
     * @param {string} newPassword - Password reset token
     * @returns {Promise} - Resolves with info about the sent email
     */
    sendPasswordReset: async (to, name, newPassword) => {
        const subject = 'Your New Password for Q&Aespa';
        const text = `Hello ${name}, we've reset your password as requested. Your new password is: ${newPassword}\n\nFor security reasons, we recommend changing this password after logging in.\n\nIf you didn't request this password reset, please contact our support team immediately.`;
        
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0; text-align: left;">
                <h2 style="color: #3498db;">Password Reset</h2>
                <p>Hello ${name},</p>
                <p>We've reset your password as requested. Your new password is:</p>
                <p style="background-color: #f8f9fa; padding: 10px; font-family: monospace; font-size: 16px; border: 1px solid #ddd; border-radius: 4px; text-align: center; letter-spacing: 1px;">
                ${newPassword}
                </p>
                <p>For security reasons, we recommend changing this password after logging in.</p>
                <p style="color: #e74c3c; font-weight: bold;">If you didn't request this password reset, please contact our support team immediately.</p>
                <p>Best regards,<br>The Q&Aespa Team</p>
            </div>
        `;
        
        return await emailService.sendEmail(to, subject, text, html);
    }
};

module.exports = emailService;