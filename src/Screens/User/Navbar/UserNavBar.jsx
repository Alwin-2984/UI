import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../Components/Header/header.css";
import { LoginModal } from "./LoginModal";

export function NavBar(token, logout) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <ul className="menu" style={{ backgroundColor: "#757575" }}>
      {/* Navigation links */}
      <li>
        <NavLink
          to="/dashboard/home"
          style={({ isActive }) => (isActive ? { color: "black" } : undefined)}
        >
          <HomeIcon /> Home
        </NavLink>
      </li>
      
     

      <li>
        <NavLink
          to="/organizerLogin"
          style={({ isActive }) => (isActive ? { color: "black" } : undefined)}
        >
          <PlaylistAddIcon />
          Post Event
        </NavLink>
      </li>
      <li>
        {token ? (
          <a onClick={logout}>
            <LogoutIcon />
            Log out
          </a>
        ) : (
          <a onClick={openModal}>
            <PersonOutlineIcon />
            Sign In
          </a>
        )}
        {/* Modal for the login/sign-up process */}
        <>{LoginModal(isOpen, closeModal)}</>
      </li>
    </ul>
  );
}
