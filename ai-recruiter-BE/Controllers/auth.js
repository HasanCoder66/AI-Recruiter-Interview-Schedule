// Controllers/auth.js
import User from "../Models/user.js";

export const loginWithGoogle = async (req, res) => {
  const { name, email, avatar, uid } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ name, email, avatar, uid });
      await user.save();
    }

    res.status(200).json({ message: "User saved", user });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
};
