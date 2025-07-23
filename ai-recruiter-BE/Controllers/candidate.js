import Candidate from "../Models/candidate.js";
import Interview from "../Models/interview.js";


export const getCandidatesByInterviewId = async (req, res) => {
  const { interviewId } = req.params;

  try {
    const candidates = await Candidate.find({ interviewId }).sort({ joinedAt: -1 });

    return res.status(200).json({
      totalCandidates: candidates.length,
      candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};




export const createCandidate = async (req, res) => {
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



// controllers/candidateController.js





export const submitInterviewAnswers = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  try {
    const score = answers.length * 2;

    const updated = await Candidate.findByIdAndUpdate(
      id,
      {
        $set: {
          answers: answers,
          score: score,
          status: "Completed",
        },
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to save answers", error });
  }
};





// export const submitInterviewAnswers = async (req, res) => {
//   const { id } = req.params;
//   const { answers } = req.body;

//   try {
//     const candidate = await Candidate.findById(id);

//     if (!candidate) {
//       return res.status(404).json({ message: "Candidate not found." });
//     }

//     const score = answers.length * 2; // Score logic

//     candidate.answers = answers;
//     candidate.score = score;
//     candidate.status = "Completed";

//     const updated = await candidate.save();

//     res.status(200).json(updated);
//   } catch (error) {
//     console.error("❌ Error saving candidate answers:", error);
//     res.status(500).json({ message: "Failed to save answers", error });
//   }
// };

// export const submitInterviewAnswers = async (req, res) => {
//   const { id } = req.params;
//   const { answers } = req.body;

//   try {
//     const score = answers.length * 2; // Example logic (2 points per question)

//     const updated = await Candidate.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           answers: answers,
//           score: score,
//           status: "Completed",
//         },
//       },
//       { new: true }
//     );

//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save answers", error });
//   }
// };


export default createCandidate;
