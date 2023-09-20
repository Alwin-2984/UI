/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { RegistrationFormOrganizer } from "../../Organiser/Login/Forms/RegistrationFormOrganizer";
import { LoginForm } from "../../User/LoginAndRegistration/LoginForm";
import { RegistrationForm } from "../../User/LoginAndRegistration/RegistrationForm";

/**
 * DynamicForm component dynamically renders different forms based on props.
 * @param {boolean} signUp - Determines whether the user is signing up.
 * @param {boolean} isOrganiser - Determines whether the user is an organizer.
 * @param {boolean} forgotPassword - Determines whether the user is recovering password.
 * @param {function} handleSubmit - The form submission handler.
 * @param {object} initialValues - Initial values for form fields.
 * @param {object} validationSchema - Validation schema for form fields.
 * @returns {JSX.Element} - Rendered form component.
 */
const DynamicForm = ({
  signUp,
  isOrganiser,
  handleSubmit,
  initialValues,
  validationSchema,
}) => {
  // Determine which form component to render based on props.
  let FormComponent = null;

  if (signUp && !isOrganiser) {
    /**User registration form */
    FormComponent = RegistrationForm;
  } else if (signUp && isOrganiser) {
    /**Organizer registration form */
    FormComponent = RegistrationFormOrganizer;
  } else if (!signUp ) {
    /**Login form of both User and Organizer*/
    FormComponent = LoginForm;
  }

  // Render the selected form component within a suspense boundary.
  return (
    <Suspense fallback={<div id="loader" />}>
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
      />
    </Suspense>
  );
};

export default DynamicForm;
