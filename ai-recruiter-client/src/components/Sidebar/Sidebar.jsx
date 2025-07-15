// // // src/components/Sidebar.jsx
// import React, { useState } from "react";
// import {
//   Dashboard,
//   CalendarToday,
//   ListAlt,
//   CreditCard,
//   Settings,
//   Menu,
//   AddCircleOutline,
//   ChevronLeft,
//   ChevronRight,
// } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import {
//   Drawer,
//   IconButton,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Button,
//   Tooltip,
// } from "@mui/material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/Slices/authSlices";

// const navItems = [
//   { label: "Dashboard", icon: <Dashboard />, link: "/dashboard" },
//   { label: "Scheduled Interview", icon: <CalendarToday />, link: "/scheduled" },
//   { label: "All Interview", icon: <ListAlt />, link: "/all" },
//   { label: "Billing", icon: <CreditCard />, link: "/billing" },
//   { label: "Settings", icon: <Settings />, link: "/settings" },
//   { label: "Logout", icon: <LogoutIcon />, action: "logout" }, // 👈 Action for logout
// ];

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const auth = getAuth();

//   const toggleCollapse = () => setCollapsed(!collapsed);
//   const toggleMobile = () => setMobileOpen(!mobileOpen);
//   const drawerWidth = collapsed ? 80 : 250;

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       dispatch(logout());
//       toast.success("Logout Successfully 👋");
//       navigate("/");
//     } catch (err) {
//       toast.error("Logout Failed!");
//       console.error("Logout Error:", err);
//     }
//   };

//   const DrawerContent = (
//     <div className="flex flex-col justify-between h-full p-4 fixed">
//       {/* Logo + Collapse Button */}
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           {!collapsed && (
//             <h1 className="text-xl font-bold text-primary">AI Recruiter</h1>
//           )}
//           <IconButton onClick={toggleCollapse} size="small">
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </IconButton>
//         </div>

//         {/* Create Interview Button */}
//         {!collapsed && (
//           <Link to="/create-interview">
//             <Button
//               variant="contained"
//               startIcon={<AddCircleOutline />}
//               fullWidth
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 500,
//                 mb: 3,
//                 backgroundColor: "#6851FF",
//                 "&:hover": {
//                   backgroundColor: "#5a46d1",
//                 },
//               }}
//             >
//               Create Interview
//             </Button>
//           </Link>
//         )}

//         {/* Navigation Items */}
//         <List disablePadding>
//           {navItems.map((item, index) => {
//             const active = location.pathname === item.link;

//             return (
//               <div key={index} className="mb-1">
//                 {item.action === "logout" ? (
//                   <Tooltip title={collapsed ? item.label : ""} placement="right">
//                     <ListItemButton
//                       onClick={handleLogout}
//                       sx={{
//                         borderRadius: "8px",
//                         px: collapsed ? 1.5 : 2,
//                         py: 1.2,
//                         backgroundColor: "#fef2f2",
//                         "&:hover": {
//                           backgroundColor: "#fee2e2",
//                         },
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           minWidth: collapsed ? "unset" : "40px",
//                           mr: collapsed ? 0 : 1.5,
//                           justifyContent: "center",
//                         }}
//                       >
//                         {item.icon}
//                       </ListItemIcon>
//                       {!collapsed && (
//                         <ListItemText
//                           primary={item.label}
//                           primaryTypographyProps={{
//                             fontSize: 14,
//                             fontWeight: 500,
//                           }}
//                         />
//                       )}
//                     </ListItemButton>
//                   </Tooltip>
//                 ) : (
//                   <Link to={item.link} className="block">
//                     <Tooltip title={collapsed ? item.label : ""} placement="right">
//                       <ListItemButton
//                         selected={active}
//                         sx={{
//                           borderRadius: "8px",
//                           px: collapsed ? 1.5 : 2,
//                           py: 1.2,
//                           backgroundColor: active ? "#6851FF" : "transparent",
//                           "&:hover": {
//                             backgroundColor: active ? "#5a46d1" : "#f5f5f5",
//                           },
//                         }}
//                       >
//                         <ListItemIcon
//                           sx={{
//                             minWidth: collapsed ? "unset" : "40px",
//                             mr: collapsed ? 0 : 1.5,
//                             justifyContent: "center",
//                           }}
//                         >
//                           {item.icon}
//                         </ListItemIcon>
//                         {!collapsed && (
//                           <ListItemText
//                             primary={item.label}
//                             primaryTypographyProps={{
//                               fontSize: 14,
//                               fontWeight: 500,
//                             }}
//                           />
//                         )}
//                       </ListItemButton>
//                     </Tooltip>
//                   </Link>
//                 )}
//               </div>
//             );
//           })}
//         </List>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-3 left-3 z-50">
//         <IconButton onClick={toggleMobile}>
//           <Menu />
//         </IconButton>
//       </div>

//       {/* Desktop Sidebar */}
//       <div
//         className="hidden md:block bg-white border-r transition-all duration-300 shadow-sm"
//         style={{ width: drawerWidth }}
//       >
//         {DrawerContent}
//       </div>

//       {/* Mobile Drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={toggleMobile}
//         ModalProps={{ keepMounted: true }}
//         className="md:hidden"
//       >
//         <div style={{ width: 250 }}>{DrawerContent}</div>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;














import React, { useState } from "react";
import {
  Dashboard,
  CalendarToday,
  ListAlt,
  CreditCard,
  Settings,
  Menu,
  AddCircleOutline,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slices/authSlices";

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, link: "/dashboard" },
  { label: "Scheduled Interview", icon: <CalendarToday />, link: "/scheduled" },
  { label: "All Interview", icon: <ListAlt />, link: "/all" },
  { label: "Billing", icon: <CreditCard />, link: "/billing" },
  { label: "Settings", icon: <Settings />, link: "/settings" },
  { label: "Logout", icon: <LogoutIcon />, action: "logout" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const drawerWidth = collapsed ? 80 : 250;

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());

      setToast({
        open: true,
        message: "Logout successfully 👋",
        severity: "success",
      });

      // Delay navigation so toast can be seen
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } catch (err) {
      setToast({
        open: true,
        message: "Logout failed!",
        severity: "error",
      });
      console.error("Logout Error:", err);
    }
  };

  const DrawerContent = (
    <div className="flex flex-col justify-between h-full p-4 fixed">
      <div>
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h1 className="text-xl font-bold text-primary">AI Recruiter</h1>
          )}
          <IconButton onClick={toggleCollapse} size="small">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>

        {/* Create Interview Button */}
        {!collapsed && (
          <Link to="/create-interview">
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: 500,
                mb: 3,
                backgroundColor: "#6851FF",
                "&:hover": {
                  backgroundColor: "#5a46d1",
                },
              }}
            >
              Create Interview
            </Button>
          </Link>
        )}

        {/* Sidebar Nav Items */}
        <List disablePadding>
          {navItems.map((item, index) => {
            const active = location.pathname === item.link;

            return (
              <div key={index} className="mb-1">
                {item.action === "logout" ? (
                  <Tooltip title={collapsed ? item.label : ""} placement="right">
                    <ListItemButton
                      onClick={handleLogout}
                      sx={{
                        borderRadius: "8px",
                        px: collapsed ? 1.5 : 2,
                        py: 1.2,
                        backgroundColor: "#fef2f2",
                        "&:hover": {
                          backgroundColor: "#fee2e2",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: collapsed ? "unset" : "40px",
                          mr: collapsed ? 0 : 1.5,
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {!collapsed && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                ) : (
                  <Link to={item.link} className="block">
                    <Tooltip title={collapsed ? item.label : ""} placement="right">
                      <ListItemButton
                        selected={active}
                        sx={{
                          borderRadius: "8px",
                          px: collapsed ? 1.5 : 2,
                          py: 1.2,
                          backgroundColor: active ? "#6851FF" : "transparent",
                          "&:hover": {
                            backgroundColor: active ? "#5a46d1" : "#f5f5f5",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: collapsed ? "unset" : "40px",
                            mr: collapsed ? 0 : 1.5,
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </Link>
                )}
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <IconButton onClick={toggleMobile}>
          <Menu />
        </IconButton>
      </div>

      {/* Desktop Sidebar */}
      <div
        className="hidden md:block bg-white border-r transition-all duration-300 shadow-sm"
        style={{ width: drawerWidth }}
      >
        {DrawerContent}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobile}
        ModalProps={{ keepMounted: true }}
        className="md:hidden"
      >
        <div style={{ width: 250 }}>{DrawerContent}</div>
      </Drawer>

      {/* Snackbar for logout */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Sidebar;