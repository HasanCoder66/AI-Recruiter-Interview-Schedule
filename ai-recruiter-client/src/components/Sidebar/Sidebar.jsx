import React from "react";
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
  { label: "Dashboard", icon: <Dashboard />, link: "/dashboard" },
  { label: "Scheduled Interview", icon: <CalendarToday /> },
  { label: "All Interview", icon: <ListAlt /> },
  { label: "Billing", icon: <CreditCard /> },
  { label: "Settings", icon: <Settings /> },
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
