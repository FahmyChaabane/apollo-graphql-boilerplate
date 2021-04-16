import React from "react";

const UserItem = (props) => {
  const { user } = props;
  return (
    <li>
      <div>
        <p>FirstName: {user.firstName}</p>
        <p>LastName: {user.lastName}</p>
        <p>UserName: {user.userName}</p>
        <p>age: {user.age}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <button>delete user</button>
      </div>
    </li>
  );
};

export default UserItem;
