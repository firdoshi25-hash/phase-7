
import Project from "../models/Project.js";
import User from "../models/User.js";

import { sendProjectEmail } from "../services/emailService.js";
// Create project
export const createProject = async (req, res) => {
  try {
    const { name, description, language, status, color } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || "",
      language: language || "JavaScript",
      status: status || "In Progress",
      color: color || "#8b5cf6",
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get owned and shared projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { user: req.user._id },
        { "members.user": req.user._id },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Share project with a registered user
export const shareProject = async (req, res) => {
  try {
    const { email, permission = "view" } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Member email is required.",
      });
    }

    if (!["view", "edit"].includes(permission)) {
      return res.status(400).json({
        success: false,
        message: "Permission must be view or edit.",
      });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you are not the owner.",
      });
    }

    const member = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "This email is not registered.",
      });
    }

    if (member._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot share a project with yourself.",
      });
    }

    const alreadyShared = project.members.some(
      (item) => item.user.toString() === member._id.toString()
    );

    if (alreadyShared) {
      return res.status(409).json({
        success: false,
        message: "Project is already shared with this member.",
      });
    }

    project.members.push({
      user: member._id,
      permission,
    });

    await project.save();

const projectUrl = `${process.env.CLIENT_URL}/projects/${project._id}`;

await sendProjectEmail({
  to: member.email,
  projectName: project.name,
  projectUrl,
  permission,
});

    return res.status(200).json({
      success: true,
      message: "Project shared successfully.",
      project,
      member: {
        id: member._id,
        name: member.name,
        email: member.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
