import React from "react";
import { useParams } from "react-router-dom";

const Profile = (props) => {
  console.log(props);

  let { id } = useParams();
  console.log(id);
  return <div>Profile</div>;
};

export default Profile;
