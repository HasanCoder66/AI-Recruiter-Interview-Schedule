// import React from "react";
// import SubHeader from "../../components/Header/SubHeader";
// import { useSelector } from "react-redux";

// const CandidateReportCard = () => {
//   const { feedback } = useSelector((state) => state?.candidate);
//   console.log(feedback)
//   return (
//     <>
//       <SubHeader />
//       <div className=" mx-auto p-6 bg-white shadow-lg rounded-xl">
//         {/* Header */}
//         <div className="flex justify-between items-center  pb-4 mt-[50px] mx-auto p-6 bg-white shadow-lg rounded-xl">
//           <div className="flex items-center gap-4">
//             <img
//               src="https://randomuser.me/api/portraits/men/30.jpg"
//               alt="profile"
//               className="w-16 h-16 rounded-full"
//             />
//             <div>
//               <h2 className="text-xl font-semibold">Michael Chen</h2>
//               <p className="text-sm text-gray-500">
//                 Full Stack Developer Position
//               </p>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-3xl font-bold text-blue-600">8.5</p>
//             <p className="text-sm text-gray-500">/10</p>
//           </div>
//         </div>

//         {/* Skills Assessment */}
//         <div className="mt-6 mx-auto p-6 bg-white shadow-lg rounded-xl">
//           <h3 className="font-semibold mb-2 text-lg">Skills Assessment</h3>

//           {/* Each Skill */}
//           {[
//             { label: "Technical Skills", score: 9 },
//             { label: "Problem Solving", score: 8 },
//             { label: "Communication", score: 8.5 },
//             { label: "Experience", score: 8.5 },
//           ].map((skill) => (
//             <div key={skill.label} className="mb-4">
//               <div className="flex justify-between text-sm mb-1">
//                 <span>{skill.label}</span>
//                 <span>{skill.score}/10</span>
//               </div>
//               <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-blue-600"
//                   style={{ width: `${(skill.score / 10) * 100}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Performance Summary */}
//         <div className="mt-6 mx-auto p-6 bg-white shadow-lg rounded-xl">
//           <h3 className="font-semibold mb-2 text-lg">Performance Summary</h3>
//           <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-lg">
//             Michael demonstrated exceptional technical proficiency and
//             problem-solving abilities. His communication was clear and
//             professional throughout the interview. He showed strong
//             understanding of full-stack development concepts and provided
//             excellent examples from his past experience.
//           </p>
//         </div>

//         {/* Footer Action */}
//         <div className="mt-6 bg-green-100  flex items-center justify-between mx-auto p-6  shadow-lg rounded-xl">
//           <div>
//             <h4 className="font-semibold text-green-800">
//               Recommended for Hire
//             </h4>
//             <p className="text-sm text-green-700">
//               Candidate shows strong potential and matches our requirements
//             </p>
//           </div>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition ">
//             Proceed to Offer
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CandidateReportCard;










import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SubHeader from "../../components/Header/SubHeader";
import { BASE_URL, BASE_URL_PROD } from "../../constants/baseUrl";
import { Avatar, Box, Container } from "@mui/material";

const CandidateReportCard = () => {
  const { candidateId } = useParams();
  const [data, setData] = useState(null);
  const [jobTitle, setJobTitle] = useState()
  const [interviewId, setInterviewId] = useState("");
  // console.log(data)
  // console.log(interviewId)


  const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/candidate/${candidateId}`);
        setData(res?.data?.message);
        setInterviewId(res?.data?.message?.interviewId)
      } catch (err) {
        console.error(err);
      }
    };

    const getInterview = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/interview/single/${interviewId}`)
        console.log(response?.data?.data)
        setJobTitle(response?.data?.data?.jobTitle)
      } catch (error) {
       console.error(error) 
      }
    }
  useEffect(() => {
    
    fetchFeedback();
    getInterview()
  }, [candidateId, interviewId]);

  if (!data) return <div>Loading...</div>;

  const { fullName, feedback} = data;

  return (
    <>
       <SubHeader />
     <Container maxWidth={"lg"}>

     <Box sx={{
      marginTop:"30px"
     }}>
       <div className="mx-auto p-6 bg-white shadow-lg rounded-xl ">
        {/* Header */}
        <div className="flex justify-between items-center pb-4">
          <div className="flex items-center gap-4">
              <Avatar
              sx={{ width: 80, height: 80, fontSize: 36, bgcolor: "#1E293B" }}
            >
              {fullName?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-gray-500">{jobTitle}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">{feedback?.overallRating}</p>
            <p className="text-sm text-gray-500">/10</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Skills Assessment</h3>
          {feedback?.skills?.map((skill, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{skill.label}</span>
                <span>{skill.score}/10</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div className="h-full bg-blue-600" style={{ width: `${(skill.score / 10) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Performance Summary</h3>
          <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-lg">{feedback?.summary}</p>
        </div>

        {/* Recommendation */}
        <div className="mt-6 bg-green-100 flex items-center justify-between p-6 rounded-xl">
          <div>
            <h4 className="font-semibold text-green-800">{feedback?.recommendation}</h4>
            <p className="text-sm text-green-700">{feedback?.recommendationReason}</p>
          </div>
          
          <button
  className={`px-4 py-2 rounded-md text-white cursor-pointer ${
    feedback?.overallRating >= 7
      ? "bg-green-600 hover:bg-green-700"
      : "bg-red-600 hover:bg-red-700"
  }`}
>
  {feedback?.overallRating >= 7 ? "Proceed to Offer" : "Not Recommended"}
</button>

          {/* <button className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 
            `}>{feedback?.overallRating  === 7 ? "Proceed to Offer" : "Not Recommended"}</button> */}
        </div>
      </div>
     </Box>
     </Container>
    </>
  );
};

export default CandidateReportCard;
