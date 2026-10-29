
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendProjectEmail = async ({
  to,
  projectName,
  projectUrl,
  permission,
}) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `CollabSphere: Project shared with you`,
    text: `A project has been shared with you on CollabSphere.

Project: ${projectName}
Permission: ${permission}
Open project: ${projectUrl}`,
    html: `
      <h2>CollabSphere Project Invitation</h2>
      <p>A project has been shared with you.</p>
      <p><strong>Project:</strong> ${projectName}</p>
      <p><strong>Permission:</strong> ${permission}</p>
      <p><a href="${projectUrl}">Open Project</a></p>
    `,
  });
};
