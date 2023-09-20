import { toast } from "react-hot-toast";
import errorCodes from "../../../API/ErrorCodes/ErrorCode";

/**
 * Display a global toast notification.
 * @param {any} apiPromise - The promise from api calls.
 * @param {string} loadingMessage - message when loading.
 * @param {string} successMessage - message when success).
 */
export function ToasterWithLoading(apiPromise, loadingMessage, successMessage) {
  toast.dismiss();

  toast.promise(
    apiPromise,
    {
      loading: loadingMessage,
      success: successMessage,
      error: (error) => {
        // Display the error message from the API response
        const data = error.response.data;
        const firstDataItem = Array.isArray(data) ? data[0] : data;
        const errorMessage =
          errorCodes[firstDataItem.errorCode] ||
          firstDataItem.errorMessage ||
          "Unknown error occurred";

        return errorMessage;
      },
    },
    {
      duration: 3000,
      position: "top-center",
      iconTheme: {
        primary: "#3B82F6",
        secondary: "#FFFAEE",
      },
      style: {
        border: "1px solid #3B82F6",
        padding: "16px",
        color: "#713200",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    }
  );
}
