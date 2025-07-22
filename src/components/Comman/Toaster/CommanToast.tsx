import { Toaster } from "react-hot-toast";

const CommanToast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
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
      }}
    />
  );
};

export default CommanToast;
