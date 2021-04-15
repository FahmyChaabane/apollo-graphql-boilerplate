import { toast } from "react-toastify";

export const QUERYING = "QUERYING data";
export const MUTATING = "MUTATING data";

export default (event) => {
  return toast.error(`something went wrong when ${event}`);
};
