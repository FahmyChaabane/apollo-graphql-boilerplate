import React, { useEffect, useState } from "react";
import onCustomError, {
  MUTATING,
  onInputError,
  QUERYING,
} from "../services/errorsHandler";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { GET_USER, UPDATE_USER } from "../services/apollo/queries";
import { onUpdateSuccess } from "../services/onSuccess";
import validator from "validator";
import _ from "lodash";
import loader from "../images/loader.gif";

const UserForm = () => {
  let { id } = useParams();
  const history = useHistory();
  let location = useLocation();
  let user;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id,
    },
    onError: () => onCustomError(QUERYING),
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setAge(user.age);
    } else {
      return history.push(`/profile/${id}`);
    }
  }, []);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: () => onCustomError(MUTATING),
  });

  const onFirstNameChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        firstName: "firstName is not valid",
      }));
    } else delete formError.firstName;
    setFirstName(input);
  };

  const onLastNameChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        lastName: "lastName is not valid",
      }));
    } else delete formError.lastName;
    setLastName(input);
  };

  const onUserNameChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        userName: "userName is not valid",
      }));
    } else delete formError.userName;
    setUserName(input);
  };

  const onAgeChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isInt(input, { min: 10, max: 120 });
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        age: "age is not valid",
      }));
    } else delete formError.age;
    setAge(input);
  };

  const anyInputIsEmpty = () => {
    return _.isEmpty(userName) || _.isEmpty(lastName) || _.isEmpty(firstName);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || anyInputIsEmpty()) {
      console.log(anyInputIsEmpty());
      console.log("age", age);
      console.log("userName", userName);
      console.log("lastName", lastName);
      console.log("firstName", firstName);
      return onInputError();
    }
    updateUser({
      variables: {
        id,
        data: { firstName, lastName, userName, age },
      },
    });
    onUpdateSuccess();
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  user = data.user;

  return (
    <div>
      <form onSubmit={onSubmitLogin}>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={onFirstNameChange}
          placeholder="firstName"
        />
        {formError && formError.firstName && (
          <small>
            <i>{formError.firstName}</i>
          </small>
        )}
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={onLastNameChange}
          placeholder="lastName"
        />
        {formError && formError.lastName && (
          <small>
            <i>{formError.lastName}</i>
          </small>
        )}
        <br />
        <input
          name="userName"
          type="text"
          value={userName}
          onChange={onUserNameChange}
          placeholder="userName"
        />
        {formError && formError.userName && (
          <small>
            <i>{formError.userName}</i>
          </small>
        )}
        <br />
        <input
          name="age"
          type="number"
          value={age}
          onChange={onAgeChange}
          placeholder="age"
        />
        {formError && formError.age && (
          <small>
            <i>{formError.age}</i>
          </small>
        )}
        <br />
        <input name="email" type="text" value={user.role} disabled={true} />

        <br />
        <input name="email" type="text" value={user.email} disabled={true} />

        <br />
        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default UserForm;
