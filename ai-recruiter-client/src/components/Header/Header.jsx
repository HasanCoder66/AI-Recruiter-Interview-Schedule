// import React from "react";
// import { NotificationsNone, ArrowDropDown } from "@mui/icons-material";
// import { IconButton, InputBase, Paper } from "@mui/material";
// import { useSelector } from "react-redux";

// const Header = () => {
//   const { user } = useSelector((state) => state.auth);
//   console.log(user);
//   return (
//     <div className="flex items-center justify-between px-6 py-4 bg-white  shadow sticky top-0 z-30">
//       {/* Left: Branding or search */}
//       <div className="flex items-center gap-4">
//         <div className="ml-5">
//           <h2 className="text-lg font-semibold">
//             👋 <span className="hidden sm:inline">Welcome back, </span>{" "}
//             {user?.name}
//           </h2>
//           <p className="text-sm text-gray-500">
//             AI-Driven Interview{" "}
//             <span className="hidden sm:inline">, Hassle-Free Hiring</span>
//           </p>
//         </div>
//         {/* <h2 className="text-2xl font-bold text-primary">AIcruiter</h2> */}
//         {/* Optional Search */}

//         {/* <Paper
//           component="form"
//           className="flex items-center px-2 py-1 rounded-md shadow-sm"
//           sx={{ width: 250 }}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search interviews"
//             inputProps={{ "aria-label": "search" }}
//           />
//         </Paper> */}
//       </div>

//       {/* Right: User Section */}
//       <div className="flex items-center gap-4">
//         <IconButton>
//           <NotificationsNone />
//         </IconButton>

//         <div className="flex items-center gap-2 cursor-pointer">
//           <img
//             src={user?.avatar || "https://i.pravatar.cc/40"} // Fallback avatar
//             alt="User"
//             className="rounded-full w-10 h-10"
//             // src="https://i.pravatar.cc/40"
//           />
//           {/* <span className="hidden md:block font-medium">Hasan</span> */}
//           <ArrowDropDown className="text-gray-600" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

// components/Header.jsx
import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlices.js";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const user = useSelector((state) => state.auth.user);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut(auth); // Firebase logout
    dispatch(logout()); // Redux logout
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect to login
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-30">
      <div>
        <h2 className="text-lg font-semibold">
          👋 Welcome back, {user?.name?.split(" ")[0]}
        </h2>
        <p className="text-sm text-gray-500">
          AI-Driven Interview, Hassle-Free Hiring
        </p>
      </div>

      {/* Avatar + Dropdown */}
      <div className="flex items-center gap-2">
        <IconButton onClick={handleMenuOpen}>
          <Avatar src={user?.avatar} />
          <ArrowDropDown />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>
            <Typography>{user?.email}</Typography>
          </MenuItem>
          <Box
            onClick={handleLogout}
            sx={{
              display: "flex",
              cursor: "pointer",
              backgroundColor: "#fef2f2",
              "&:hover": {
                backgroundColor: "#fee2e2",
              },
            }}
          >
            <IconButton>
              <LogoutIcon />
            </IconButton>
            <MenuItem>Logout</MenuItem>
          </Box>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
