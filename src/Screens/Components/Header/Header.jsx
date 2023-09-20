/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { OrganizerNavBar } from "../../Organiser/NavBar/OrganizerNavBar";
import { NavBar } from "../../User/Navbar/UserNavBar";
import "./header.css";

/**
 *
 * @param {boolean} isOrganizer
 * @returns
 */
export default function Header({ isOrganizer }) {
  const navigate = useNavigate(); // React Router's navigate function for navigation

  // Get the user's profile and token from the local storage
  const profile = JSON.parse(
    localStorage.getItem(isOrganizer ? "OrganizationProfile" : "Profile")
  );
  const token = profile?.data.accessToken;

  // Function to handle user logout
  const logout = () => {
    if (isOrganizer) {
      localStorage.removeItem("OrganizationProfile");
    } else {
      localStorage.removeItem("Profile");
    }
    isOrganizer ? navigate("/organizerLogin") : navigate("/dashboard"); // Navigate to the login page or Home page after logout
    window.location.reload();
  };

  return (
    <header className={!isOrganizer ? "headerOrg" : "header"}>
      <nav>
        <div className="logo">
          <a href="/dashboard/home">
            Quiz<span className={!isOrganizer && "Wire"}>App</span>
          </a>
        </div>
        <div className="flex flex-row w-full justify-center"></div>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          &#9776;
        </label>
        {/* switching header according to user */}
        {isOrganizer ? OrganizerNavBar(token, logout) : NavBar(token, logout)}
      </nav>
    </header>
  );
}
