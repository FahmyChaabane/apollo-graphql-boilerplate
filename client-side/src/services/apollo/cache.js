import { makeVar } from "@apollo/client";

const ADMIN = "ADMIN";

const currentUser = makeVar({});
export const isToBeShownButton = (id) => currentUser()._id === id;
export const isAdmin = () => currentUser().role === ADMIN;

export default currentUser;
