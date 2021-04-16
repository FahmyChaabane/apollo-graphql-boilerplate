import { toast } from "react-toastify";

export const QUERYING = "QUERYING data";
export const MUTATING = "MUTATING data";

export default (event) => {
  return toast.error(`something went wrong when ${event}`);
};

export const onInputError = () => {
  toast.error("Form Input is not Valid.");
};

export const onServerRequestError = () => {
  toast.error("Something wrong occured when server requested.");
};
