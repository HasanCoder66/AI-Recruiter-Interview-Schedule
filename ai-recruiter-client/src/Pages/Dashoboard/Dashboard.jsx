import React from "react";
import { Facebook, Google, Circle } from "@mui/icons-material";
import { InterviewCard, Layout } from "../../components";
import CallIcon from "@mui/icons-material/Call";
import { IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <Layout>
      <div>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link to="/create-interview">
          <div className="bg-white p-4 rounded-xl shadow-md h-[150px]">
            <IconButton>
              <VideocamIcon
                className="text-blue-500"
                style={{ fontSize: 40 }}
              />
            </IconButton>
            <h3 className="font-semibold mb-1">Create New Interview</h3>
            <p className="text-sm text-gray-500">
              Create AI interviews and schedule them with candidates
            </p>
          </div>
          </Link>
          <div className="bg-white p-4 rounded-xl shadow-md h-[150px]">
            <IconButton>
              <CallIcon className="text-blue-500" style={{ fontSize: 40 }} />
            </IconButton>
            <h3 className="font-semibold mb-1">Create Phone Screening Call</h3>
            <p className="text-sm text-gray-500">
              Schedule phone screening calls with potential candidates
            </p>
          </div>
        </div>

        <h3 className="text-md font-semibold mt-[40px] mb-2">
          Previously Created Interviews
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InterviewCard icon={<Google />} date="20 Oct 2024" />
          <InterviewCard icon={<Facebook />} date="20 Oct 2024" />
          <InterviewCard
            icon={<Circle style={{ color: "orange" }} />}
            date="20 Oct 2024"
          />
          {/* <InterviewCard icon={<Google />} date="20 Oct 2024" />
          <InterviewCard icon={<Facebook />} date="20 Oct 2024" />
          <InterviewCard
            icon={<Circle style={{ color: "orange" }} />}
            date="20 Oct 2024"
          /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
