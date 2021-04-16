import { toast } from "react-toastify";

export const onUpdateSuccess = () =>
  toast.success("Changes were successfully Saved.");

export const onAppendSuccess = () =>
  toast.success("New Item was successfully Created.");
