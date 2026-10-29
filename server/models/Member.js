
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.index({ owner: 1, member: 1 }, { unique: true });

const Member = mongoose.model("Member", memberSchema);

export default Member;
