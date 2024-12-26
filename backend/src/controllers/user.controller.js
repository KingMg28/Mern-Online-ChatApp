import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    await res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({
      participants: loggedInUserId,
    })
      .populate("participants", "-password")
      .select("participants, -_id");

    let filteredConversations = [];
    conversations.map((conversation) => {
      filteredConversations.push(
        conversation.participants.filter(
          (participant) =>
            participant._id.toString() !== loggedInUserId.toString()
        )[0]
      );
    });

    await res.status(200).json(filteredConversations);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

