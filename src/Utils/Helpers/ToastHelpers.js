import toast from "react-hot-toast";

export const toastSuccess = (msg) => toast.success(msg);
export const toastError = (msg) => toast.error(msg);

export const showSuccessToast = toastSuccess;
export const showErrorToast = toastError;

export const showToast = (type, msg) => {
  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "loading":
      toast.loading(msg);
      break;
    default:
      toast(msg);
  }
};
