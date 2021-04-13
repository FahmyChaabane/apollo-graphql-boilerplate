import { toast } from "react-toastify";

export const QUERYING = "querying data";
export const MUTATING = "mutating data";

export default (event) => {
  return toast.error(`something went wrong when ${event}`);
};
