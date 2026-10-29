
import express from "express";
import {
  inviteMember,
  getMembers,
  deleteAllMembers,
} from "../controllers/memberController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/invite", authMiddleware, inviteMember);
router.get("/", authMiddleware, getMembers);
router.delete("/delete-all", authMiddleware, deleteAllMembers);
export default router;
