import React, { useState } from "react";
import onCustomError, {
  onServerRequestError,
  QUERYING,
} from "../services/errorsHandler";
import {
  onSuccessMailReceive,
  sendDeleteRequestEmail,
} from "../services/mailService";
import { useParams, useHistory } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import { GET_USER } from "../services/apollo/queries";
import { useQuery } from "@apollo/client";
import loader from "../images/loader.gif";

const Profile = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id,
    },
    onError: () => onCustomError(QUERYING),
  });

  const [mailSent, setmailSent] = useState(false);

  const onDeleteUser = async () => {
    try {
      const result = await sendDeleteRequestEmail(user.userName, user.email);
      onSuccessMailReceive(result);
      setmailSent(true);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
        return onServerRequestError();
      }
    }
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  const { user } = data;

  return (
    <div>
      <p>FirstName: {user.firstName}</p>
      <p>LastName: {user.lastName}</p>
      <p>UserName: {user.userName}</p>
      <p>age: {user.age}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {isToBeShownButton(id) && (
        <React.Fragment>
          <button onClick={() => history.push(`/profile/${user.id}/modify`)}>
            edit
          </button>
          <button disabled={mailSent} onClick={onDeleteUser}>
            delete
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Profile;
