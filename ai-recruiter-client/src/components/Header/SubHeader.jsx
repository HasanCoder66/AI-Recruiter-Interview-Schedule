import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SubHeader = () => {
  const {params} = useParams()
  // console.log(params)
  return (
    <div>
      <div className="w-full flex items-center h-[50px]  mx-auto p-6 bg-white shadow-lg fixed">
        <Link to="/">
          <ArrowBackIcon className="m-4 text-gray-600 " />
        </Link>
        <img
          src="https://www.hiringmine.com/assets/Hiring%20Mine%20Logo-453a72d3.png"
          alt="Logo"
          width={150}
          className="w-[200px] px-2 py-2"
        />
      </div>
    </div>
  );
};

export default SubHeader;
