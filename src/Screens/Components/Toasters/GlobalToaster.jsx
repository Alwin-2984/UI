import toast from "react-hot-toast";
/**
 * Display a global toast notification.
 * @param {string} message - The message to be displayed in the toast.
 * @param {number|string} id - The unique identifier for the toast.
 * @param {string} type - The type or style of the toast (e.g., "success", "error").
 */
export default function GlobalToaster(message, id, type, duration) {
  toast.dismiss();

  toast[type](message, {
    id: id,
    duration: duration,
    position: "top-center",

    // Change colors of success/error/loading icon
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
}
