// import { List, ListItem, ListItemText, Button } from "@mui/material";
// import React from "react";
// const navItems = [
//   "Dashboard",
//   "Scheduled Interview",
//   "All Interview",
//   "Billing",
//   "Settings",
// ];

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-white border-r px-4 py-6">
//       <h1 className="text-xl font-bold mb-6">AIcruiter</h1>
//       <Button variant="contained" fullWidth className="mb-4">
//          Create New Interview
//       </Button>
//       <List>
//         {navItems.map((text, index) => (
//           <ListItem button key={index}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default Sidebar;

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
// import {
//   Drawer,
//   IconButton,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Button,
// } from "@mui/material";
// import { useState } from "react";
// import React from "react";
// import { Link } from "react-router-dom";
// const navItems = [
//   { label: "Dashboard", icon: <Dashboard /> , link:'/'},
//   { label: "Scheduled Interview", icon: <CalendarToday /> },
//   { label: "All Interview", icon: <ListAlt /> },
//   { label: "Billing", icon: <CreditCard /> },
//   { label: "Settings", icon: <Settings /> },
// ];

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleCollapse = () => setCollapsed(!collapsed);
//   const toggleMobile = () => setMobileOpen(!mobileOpen);

//   const drawerWidth = collapsed ? 80 : 240;

//   const DrawerContent = (
//     <div className="h-full flex flex-col justify-between py-6 px-3 fixed">
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           {!collapsed && <h1 className="text-xl font-bold">AI Recruiter</h1>}
//           <IconButton onClick={toggleCollapse} size="small">
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </IconButton>
//         </div>

//         {!collapsed && (
//           <Link to="/create-interview">
//             <Button
//               variant="contained"
//               fullWidth
//               startIcon={<AddCircleOutline />}
//               className="mb-4"
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 500,
//                 marginBottom: "1rem",
//               }}
//             >
//               Create Interview
//             </Button>
//           </Link>
//         )}

 
//           <List disablePadding>
//             {navItems.map((item, index) => (
//               <Link key={index} to={item.link} >
//               <ListItemButton
//                 key={index}
//                 className="rounded-lg mb-1"
//                 selected={index === 0}
//                 // sx={{
//                 //   "&.Mui-selected": {
//                 //     backgroundColor: "#6851FF",
//                 //     color: "white",
//                 //     "& .MuiListItemIcon-root": { color: "white" },
//                 //   },
//                 // }}
//               >
//                 <ListItemIcon className="text-gray-500">
//                   {item.icon}
//                 </ListItemIcon>
//                 {!collapsed && (
//                   <ListItemText
//                     primary={item.label}
//                     primaryTypographyProps={{
//                       fontSize: 14,
//                       fontWeight: 500,
//                     }}
//                   />
//                 )}
//               </ListItemButton>
//         </Link>
//             ))}
//           </List>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Icon */}
//       <div className="md:hidden p-2 fixed top-2 left-2 z-50">
//         <IconButton onClick={toggleMobile}>
//           <Menu />
//         </IconButton>
//       </div>

//       {/* Desktop Sidebar */}
//       <div
//         className="hidden md:block bg-white border-r shadow-sm transition-all duration-300"
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
//         <div style={{ width: 240 }}>{DrawerContent}</div>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;
















import React from "react"
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
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, link: "/" },
  { label: "Scheduled Interview", icon: <CalendarToday />, },
  { label: "All Interview", icon: <ListAlt />,  },
  { label: "Billing", icon: <CreditCard />,  },
  { label: "Settings", icon: <Settings />,  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const drawerWidth = collapsed ? 80 : 250;

  const DrawerContent = (
    <div className="flex flex-col justify-between h-full p-4 fixed">
      {/* Logo + Toggle */}
      <div>
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
        )}

        {/* Nav Items */}
        <List disablePadding>
          {navItems.map((item, index) => {
            const active = location.pathname === item.link;

            return (
              <Link key={index} to={item.link} className="block mb-1">
                <Tooltip title={collapsed ? item.label : ""} placement="right">
                  <ListItemButton
                    selected={active}
                    sx={{
                      borderRadius: "8px",
                      px: collapsed ? 1.5 : 2,
                      py: 1.2,
                      // color: active ? "#fff" : "#333",
                      backgroundColor: active ? "#6851FF" : "transparent",
                      "&:hover": {
                        backgroundColor: active ? "#5a46d1" : "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        // color: active ? "#fff" : "#666",
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
    </>
  );
};

export default Sidebar;