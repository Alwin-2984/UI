// Import required modules and components
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationAndLogin } from "../../../API/ApiService/ApiServices";
import { ErrorToastUsingErrorCode } from "../Toasters/ErrorToastUsingErrorCode";
import { ToasterWithLoading } from "../Toasters/ToasterWithLoading";
import DynamicForm from "./DynamicForm";
import { initialValuesFunction } from "./initialValuesFunction";
import { yupValidation } from "./yupValidation";
// Define the Login component, which accepts 'signUp' and 'isOrganiser' as props
function Login({ signUp, isOrganiser }) {
  const navigate = useNavigate();
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  // Generate initial form values and validation schema based on 'signUp' and 'isOrganiser' props
  const initialValues = initialValuesFunction(signUp);
  const validationSchema = yupValidation(signUp);

  // Function to handle form submission
  const handleSubmit = (values) => {
    if (apiCallInProgress) {
      return; // Don't proceed if an API call is already in progress
    }

    setApiCallInProgress(true);
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...userData } = values;
    try {
      const apiPromise = new Promise((resolve, reject) => {
        RegistrationAndLogin(userData, signUp, isOrganiser)
          .then((response) => {
            const { storageKey, navigatePath } =
              LocalSotageProfileStoring(isOrganiser);
            setApiCallInProgress(false);

            if (isOrganiser && response.data.status === 0) {
              logout();
            }

            resolve(response);

            // Handle successful form submission
            // Store the response data in local storage
            localStorage.setItem(storageKey, JSON.stringify(response));

            navigate(navigatePath);
          })
          .catch((error) => {
            setApiCallInProgress(false);
            reject(error);
          });
      });

      ToasterWithLoading(
        apiPromise,
        "loading",
        signUp ? "Registered Successfully" : "Login Success"
      );
    } catch (err) {
      setApiCallInProgress(false);

      // Handle errors in form submission
      ErrorToastUsingErrorCode(err);
    }
  };

  const logout = () => {
    if (isOrganiser) {
      localStorage.removeItem("OrganizationProfile");
    } else {
      localStorage.removeItem("Profile");
    }
    isOrganiser ? navigate("/organizerLogin") : navigate("/dashboard"); // Navigate to the login page or Home page after logout
    window.location.reload();
  };
  return (
    <>
      <div className=" bg-gray-100 flex  justify-center sm:py-0 py-0 min-h-screen max-h-screen overflow-y-auto  overflow-x-hidden">
        <div className="  w-1/4 max-xl:w-1/3 max-md:w-1/2 max-sm:w-full">
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <div className="font-bold text-center text-2xl mb-3">
                <div className="logo">
                  <h3 className="font-semibold text-xl text-gray-600">
                    Quiz
                    <span className="font-semibold text-xl text-violet-700">
                      App
                    </span>
                    {isOrganiser && <>&nbsp;Questinare</>}
                  </h3>
                </div>
              </div>
              <DynamicForm
                signUp={signUp}
                isOrganiser={isOrganiser}
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  isOrganiser: PropTypes.any,
  setValue: PropTypes.func,
  signUp: PropTypes.string,
  value: PropTypes.number,
};

export default Login;

function LocalSotageProfileStoring(isOrganiser) {
  const storageKey = isOrganiser ? "OrganizationProfile" : "Profile";
  const navigatePath = isOrganiser ? "/Organiser/app" : "/dashboard";
  return { storageKey, navigatePath };
}
