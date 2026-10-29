
import Member from "../models/Member.js";
import User from "../models/User.js";

// Invite an existing registered user by email
export const inviteMember = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Member email is required.",
      });
    }

    const invitedUser = await User.findOne({ email });

    if (!invitedUser) {
      return res.status(404).json({
        message:
          "This email is not registered on CollabSphere. Please ask the user to register first.",
      });
    }

    if (invitedUser._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot invite yourself.",
      });
    }

    const existingMember = await Member.findOne({
      owner: req.user._id,
      member: invitedUser._id,
    });

    if (existingMember) {
      return res.status(409).json({
        message: "This user is already invited or added.",
      });
    }

    const member = await Member.create({
      owner: req.user._id,
      member: invitedUser._id,
      status: "accepted",
    });

    return res.status(201).json({
      message: "Member added successfully.",
      member: {
        id: member._id,
        name: invitedUser.name,
        email: invitedUser.email,
        status: member.status,
      },
    });
  } catch (error) {
    console.error("Invite member error:", error);

    // Handle duplicate records if a request happens twice
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This user is already added.",
      });
    }

    return res.status(500).json({
      message: "Unable to add member.",
    });
  }
};

// Get workspace members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find({
      owner: req.user._id,
    })
      .populate("member", "name email avatar")
      .sort({ createdAt: -1 });

    const validMembers = members.filter((item) => item.member);

    return res.status(200).json({
      count: validMembers.length,
      members: validMembers.map((item) => ({
        id: item._id,
        name: item.member.name,
        email: item.member.email,
        avatar: item.member.avatar,
        status: item.status,
      })),
    });
  } catch (error) {
    console.error("Get members error:", error);

    return res.status(500).json({
      message: "Unable to fetch members.",
    });
  }
};

// Delete all members from the logged-in user's workspace
export const deleteAllMembers = async (req, res) => {
  try {
    const result = await Member.deleteMany({
      owner: req.user._id,
    });

    return res.status(200).json({
      message: "All workspace members deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete all members error:", error);

    return res.status(500).json({
      message: "Unable to delete workspace members.",
    });
  }
};
