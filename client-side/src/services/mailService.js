import { toast } from "react-toastify";
import axios from "../services/axiosConfig";

export const sendDeleteRequestEmail = async (user, email) => {
  const { data } = await axios.post("/api/mail", {
    user,
    email,
  });
  return data;
};

export const onSuccessMailReceive = (result) => {
  toast.success(
    `The resquest of deletion for user ${result} was successfully made.`
  );
};
