import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import onCustomError, { QUERYING } from "../services/apollo/errorsHandler";
import loader from "../images/loader.gif";
import { GET_USER } from "../services/apollo/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id,
    },
    onError: () => onCustomError(QUERYING),
  });
  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  const { user } = data;

  return (
    <div>
      <p>FirstName: {user.firstName}</p>
      <p>LastName: {user.lastName}</p>
      <p>UserName: {user.userName}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {isToBeShownButton(id) && (
        <React.Fragment>
          <button onClick={() => history.push(`/profile/${user.id}/modify`)}>
            edit
          </button>
          <button>delete</button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Profile;
