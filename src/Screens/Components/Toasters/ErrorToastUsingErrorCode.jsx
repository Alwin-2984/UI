import errorCodes from "../../../API/ErrorCodes/ErrorCode"; // Import the errorCodes object that maps error codes to error messages.
import ToasterGlobal from "./GlobalToaster";

/**
 * Display an error toast using an error code.
 * @param {Error} error - The error object containing response data.
 */
export function ErrorToastUsingErrorCode(error) {
  // Get the error message based on the error code from errorCodes object,
  // or use the error message from the response data, or a default message.

  const data = error.response.data;
  const firstDataItem = Array.isArray(data) ? data[0] : data;
  const errorMessage =
    errorCodes[firstDataItem.errorCode] ||
    firstDataItem.errorMessage ||
    "Unknown error occurred";

  // Display a toast notification with the error message and appropriate styling.
  // The second argument is toastId.
  // The third argument (["error"]) is the style of the toasterzz
  ToasterGlobal(errorMessage, 405, ["error"], 3000);
}
