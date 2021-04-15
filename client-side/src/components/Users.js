import React from "react";
import { GET_USERS } from "../services/apollo/queries";
import onError, { QUERYING } from "../services/apollo/errorsHandler";
import { useQuery } from "@apollo/client";
import loader from "../images/loader.gif";
import UserItem from "./UserItem";
import { isAdmin } from "../services/apollo/cache";
import { Redirect } from "react-router";

const Users = () => {
  if (!isAdmin()) return <Redirect to="/not-found" />;

  const { loading, error, data } = useQuery(GET_USERS, {
    onError: () => onError(QUERYING),
  });

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  const { users } = data;
  return (
    <div>
      {users.length !== 0 && (
        <ul>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
