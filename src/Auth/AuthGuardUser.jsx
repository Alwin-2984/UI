import { Navigate, useLocation } from "react-router-dom";

const AuthGuardUser = (props) => {
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem("Profile"));
  const token = profile?.data.accessToken;

  if (!token) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/userLogin" state={{ from: location }} />;
  }

  // User is authenticated, allow access to the protected component
  // eslint-disable-next-line react/prop-types
  return <>{props.children}</>;
};

export default AuthGuardUser;
