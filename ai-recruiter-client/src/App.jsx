// import Dashboard from "./Pages/Dashoboard/Dashboard";
// import React from "react";
// function App() {
//   return <Dashboard />;
// }

// export default App;



import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashoboard/Dashboard";
import CreateInterview from "./Pages/CreateInterview/CreateInterview";
import InterviewSuccess from "./Pages/InterviewSuccess/InterviewSuccess";
import InterviewSession from "./Pages/InterviewSession/InterviewSession";
import InterviewDetails from "./Pages/InterviewDetail/InterviewDetail";
// import InterviewSession from "./Pages/InterviewSession"; // create this later

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-interview" element={<CreateInterview />} />
        <Route path="/interview-success" element={<InterviewSuccess />} />
        <Route path="/interview/:id" element={<InterviewSession />} />
        <Route path="/InterviewDetails" element={<InterviewDetails />} />
        {/* <Route path="/interview-session" element={<InterviewSession />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
