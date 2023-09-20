// Function to generate initial form values based on 'signUp' and 'isOrganiser' props

export function initialValuesFunction(signUp) {
  // Common initial form values for all cases
  const commonValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // If the form is for sign-up
  if (signUp) {
  

    // Return initial values for organiser sign-up without 'dob' and 'gender'
    return commonValues;
  }

  // If the form is for log-in, return initial values with only 'email' and 'password'
  return {
    email: "",
    password: "",
  };
}
