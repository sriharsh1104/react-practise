import { Toaster, toast } from "react-hot-toast";

const toastOptions = {
  duration: 2000,
  success: {
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  error: {
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
};

const CommanToast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={toastOptions}
    />
  );
};

// Custom toast utility using the same styling
export const Toast = {
  success: (message: string) => {
    toast.success(message, toastOptions);
  },
  error: (message: string) => {
    toast.error(message, toastOptions);
  },
};

export default CommanToast;
