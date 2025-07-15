import React from "react";
import { AddCircleOutline, Google, VideoCall } from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InterviewCard, Layout } from "../../components";
import { BASE_URL_PROD } from "../../constants/baseUrl";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  const [interviews, setInterviews] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const fetchUserInterviews = async () => {
    try {
      const res = await axios.get(`
        ${BASE_URL_PROD}/interview/user/${user?.uid}`);
      setInterviews(res?.data?.data); // update your state
      // console.log("Response aPI",res)
      // console.log(interviews);
    } catch (err) {
      console.error("Failed to fetch user interviews", err);
      setToast({
        open: true,
        message: "Unable to fetch your interviews",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchUserInterviews();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link to="/create-interview">
            <div className="bg-white p-4 rounded-xl shadow-md h-[150px]">
              <IconButton>
                <VideocamIcon
                  className="text-[#6851ff]"
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
              <CallIcon className="text-[#6851ff]" style={{ fontSize: 40 }} />
            </IconButton>
            <h3 className="font-semibold mb-1">Create Phone Screening Call</h3>
            <p className="text-sm text-gray-500">
              Schedule phone screening calls with potential candidates
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mt-[40px] ">
            Previously Created Interviews
          </h3>

          {interviews?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-[#f4f5f7] to-[#c3c6c9] rounded-xl">
              <VideoCall
                sx={{ fontSize: 40, color: "#6851ff", marginBottom: 1 }}
              />
              <p className="text-gray-700 mb-4 text-center">
                You don't have any interview created!
              </p>
              <Link to="/create-interview">
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    mb: 3,
                    // padding: "10px 16px",
                    backgroundColor: "#6851FF",
                    "&:hover": {
                      backgroundColor: "#5a46d1",
                    },
                  }}
                >
                  Create Interview
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {interviews?.map((item, index) => (
                <Link to={`/interview/${item._id}`}>
                  <InterviewCard key={index} icon={<Google />} data={item} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;