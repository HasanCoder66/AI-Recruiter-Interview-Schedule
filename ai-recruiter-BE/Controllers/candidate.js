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




// @desc    Submit candidate answers
// @route   PUT /candidate/submit/:id
// @access  Public (or Authenticated based on your setup)
export const submitInterviewAnswers = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Invalid or missing answers array." });
  }

  try {
    // Example scoring logic: 2 points per answered question
    const score = answers.length * 2;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      {
        $set: {
          answers,
          score,
          status: "Completed",
        },
      },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found." });
    }

    res.status(200).json({
      message: "Answers submitted successfully.",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({
      message: "Failed to save answers. Please try again later.",
      error: error.message,
    });
  }
};

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
