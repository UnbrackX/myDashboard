import { useState, useRef } from "react";
import { Button, Menu, MenuItem, useTheme } from "@mui/material"; // ✅ useTheme
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ title, icon, path, children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const theme = useTheme(); // ✅

  const isActive = path && location.pathname === path;
  const isChildActive =
    children && children.some((item) => location.pathname === item.path);

  const handleOpen = (e) => {
    if (children) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => setAnchorEl(null);

  const activeColor = theme.palette.primary.dark;
  const activeBg = theme.palette.primary.lighter;
  const hoverBg = theme.palette.action.hover;

  if (children) {
    return (
      <>
        <Button
          ref={buttonRef}
          onClick={handleOpen}
          endIcon={<Icon icon="mdi:chevron-right" />}
          startIcon={<Icon icon={icon} />}
          sx={{
            textTransform: "none",
            color: isChildActive ? activeColor : theme.palette.text.primary,
            bgcolor: isChildActive ? activeBg : "transparent",
            width: "100%",
            justifyContent: "flex-start",
            p: 2,
            borderRadius: "12px",
            fontWeight: 600,
            transition: "all 0.2s ease-in-out",
            boxShadow: isChildActive
              ? "0 2px 8px rgba(13, 71, 161, 0.1)"
              : "none",
            "&:hover": {
              bgcolor: hoverBg,
              transform: "scale(1.01)",
            },
          }}
        >
          {title}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              width: buttonRef.current?.offsetWidth || 200,
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            },
          }}
        >
          {children.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <MenuItem
                key={index}
                component={Link}
                to={item.path}
                onClick={handleClose}
                sx={{
                  color: active ? activeColor : theme.palette.text.primary,
                  fontWeight: active ? 600 : 500,
                  bgcolor: active ? activeBg : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: hoverBg,
                  },
                }}
              >
                <Icon icon={item.icon} style={{ marginRight: 8 }} />
                {item.title}
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  }

  return (
    <Button
      component={Link}
      to={path}
      startIcon={<Icon icon={icon} />}
      sx={{
        textTransform: "none",
        color: isActive ? activeColor : theme.palette.text.primary,
        bgcolor: isActive ? activeBg : "transparent",
        width: "100%",
        justifyContent: "flex-start",
        p: 2,
        borderRadius: "12px",
        fontWeight: 600,
        transition: "all 0.2s ease-in-out",
        boxShadow: isActive ? "0 2px 8px rgba(13, 71, 161, 0.1)" : "none",
        "&:hover": {
          bgcolor: hoverBg,
          transform: "scale(1.01)",
        },
      }}
    >
      {title}
    </Button>
  );
}

export default NavItem;
