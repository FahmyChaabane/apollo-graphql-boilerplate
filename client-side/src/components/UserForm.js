import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import validator from "validator";
import { useQuery } from "@apollo/client";
import loader from "../images/loader.gif";
import { GET_USER } from "../services/apollo/queries";

const UserForm = () => {
  let { id } = useParams();
  const history = useHistory();
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
  const [requestError, setRequestError] = useState({});

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setAge(user.age);
    } else {
      history.push(`profile/${id}`);
    }
  }, []);

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
    return (
      _.isEmpty(age) ||
      _.isEmpty(userName) ||
      _.isEmpty(lastName) ||
      _.isEmpty(firstName)
    );
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || anyInputIsEmpty()) {
      return toast.error("Form is not elligible to be sent to the server !");
    }
    try {
      await register(firstName, lastName, userName, age, role, email, password);
      props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const requestError = { ...requestError };
        requestError.request = ex.response.data;
        setRequestError(requestError);
      }
    }
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
        {requestError && requestError.request && (
          <small>
            <i>{requestError.request}</i>
          </small>
        )}
      </form>
    </div>
  );
};

export default UserForm;
