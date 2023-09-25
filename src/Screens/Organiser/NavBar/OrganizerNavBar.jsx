import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink } from "react-router-dom";
export function OrganizerNavBar(token, logout) {
  return (
    <ul className="menu" style={{ backgroundColor: "#757575" }}>
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
          to="/Organiser/questionList"
          style={({ isActive }) =>
            isActive ? { color: "#8739FA" } : undefined
          }
        >
          <ListAltIcon /> QuestionList
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
