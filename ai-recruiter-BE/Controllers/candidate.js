import Candidate from "../Models/candidate.js";
import Interview from "../Models/interview.js";

const createCandidate = async (req, res) => {
  const { fullName, joinCode } = req.body;

  try {
    const interview = await Interview.findOne({ joinCode });

    if (!fullName)
      return res.status(404).json({
        message: "Name is Required",
      });

    if (!interview) {
      return res.status(404).json({ message: "Invalid join code" });
    }

    const newCandidate = new Candidate({
      fullName,
      interviewId: interview._id,
      joinCode,
    });

    await newCandidate.save();

    return res.status(201).json({
      message: "Candidate joined successfully",
      candidateId: newCandidate._id,
      fullName: newCandidate.fullName,
    });
  } catch (err) {
    console.error("Candidate Join Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default createCandidate;
