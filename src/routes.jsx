import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import AuthGuard from "./Auth/AuthGuard";
import LoginAuth from "./Auth/LoginAuth";

const UserLayout = lazy(() => import("./Screens/User/Dashboard/UserLayout"));
const NotFound = lazy(() => import("./Screens/Components/NotFound404"));
const LoginOrganiser = lazy(() =>
  import("./Screens/Organiser/Login/LoginOrganiser")
);
const OrganizerLayout = lazy(() =>
  import("./Screens/Organiser/Dashboard/OrganizerLayout")
);
const OrganiserDashboard = lazy(() =>
  import("./Screens/Organiser/Dashboard/OrganiserDashboard")
);
import UserDashboard from "./Screens/User/Dashboard/UserDashboard";
import "./routes.css";
import LoginPage from "./Screens/User/LoginAndRegistration/LoginPage";
import LoginAuthUser from "./Auth/LoginAuthUser";
import AuthGuardUser from "./Auth/AuthGuardUser";

export default function Routes() {
  return (
    <Suspense fallback={<div id="loader" />}>
      {useRoutes([
        {
          path: "/organizerLogin",
          element: (
            <LoginAuth>
              <LoginOrganiser />
            </LoginAuth>
          ),
        },
        {
          path: "/Organiser",
          element: (
            <AuthGuard>
              <OrganizerLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to="app" />, index: true },
            {
              path: "app",
              element: <OrganiserDashboard />,
              index: true,
            },
          ],
        },

        {
          path: "/userLogin",
          element: (
            <LoginAuthUser>
              <LoginPage />
            </LoginAuthUser>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <AuthGuardUser>
              <UserLayout />
            </AuthGuardUser>
          ),
          children: [
            { element: <Navigate to="home" />, index: true },
            { path: "home", element: <UserDashboard />, index: true },
          ],
        },

        {
          path: "*",
          element: <NotFound replace />,
          index: true,
        },
        {
          path: "",
          element: <UserLayout />,
          children: [
            { element: <Navigate to="/dashboard/home" />, index: true },
          ],
        },
      ])}
    </Suspense>
  );
}
