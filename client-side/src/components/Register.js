import React, { useState } from "react";
import { register } from "../services/authService";
import { onInputError } from "../services/errorsHandler";
import validator from "validator";
import _ from "lodash";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [requestError, setRequestError] = useState({});

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

  const onRoleChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        role: "role is not valid",
      }));
    } else delete formError.role;
    setRole(input);
  };

  const onEmailChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isEmail(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        email: "email is not valid",
      }));
    } else delete formError.email;
    setEmail(input);
  };

  const onPasswordChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isStrongPassword(input, {
      pointsPerRepeat: 1,
      pointsPerUnique: 1,
      returnScore: true,
    });
    if (isValid < 18) {
      setFormError((prevState) => ({
        ...prevState,
        password: "password is not strong enough",
      }));
    } else delete formError.password;
    setPassword(input);
  };

  const anyInputIsEmpty = () => {
    return (
      _.isEmpty(password) ||
      _.isEmpty(email) ||
      _.isEmpty(role) ||
      _.isEmpty(age) ||
      _.isEmpty(userName) ||
      _.isEmpty(lastName) ||
      _.isEmpty(firstName)
    );
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || anyInputIsEmpty()) {
      return onInputError();
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
  //Helmi@mail.com
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
        <select name="role" value={role} onChange={onRoleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {formError && formError.role && (
          <small>
            <i>{formError.role}</i>
          </small>
        )}
        <br />
        <input
          name="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="email"
        />
        {formError && formError.email && (
          <small>
            <i>{formError.email}</i>
          </small>
        )}
        <br />
        <input
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="password"
        />
        {formError && formError.password && (
          <small>
            <i>{formError.password}</i>
          </small>
        )}
        <br />
        <button>login</button>
        {requestError && requestError.request && (
          <small>
            <i>{requestError.request}</i>
          </small>
        )}
      </form>
    </div>
  );
};

export default Register;
