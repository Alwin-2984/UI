import { NavLink } from "react-router-dom";
import BallotIcon from '@mui/icons-material/Ballot';import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { BsCalendar2Plus } from "react-icons/bs";


export function OrganizerNavBar(token, logout) {
  return (
    <ul className="menu" style={{ backgroundColor: "rgb(21,20,24)" }}>
      <li>
        <NavLink
          to="/Organiser/app"
          style={({ isActive }) =>
            isActive ? { color: "#8739FA" } : undefined
          }
        >
          <HomeIcon /> Home
        </NavLink>
      </li>
     
      <li>
        <NavLink
          to="/Organiser/EventList"
          style={({ isActive }) =>
            isActive ? { color: "#8739FA" } : undefined
          }
        >
          <BallotIcon />
          Event list
        </NavLink>
      </li>
      <li>
        {token ? (
          <NavLink onClick={logout}>
            <LogoutIcon />
            Log out
          </NavLink>
        ) : (
          <NavLink to="/organizerLogin">
            <PersonOutlineIcon />
            Sign In
          </NavLink>
        )}
      </li>
    </ul>
  );
}
