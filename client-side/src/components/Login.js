import React, { useState } from "react";
import validator from "validator";
import _ from "lodash";
import { login } from "../services/authService";
import { onInputError } from "../services/errorsHandler";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [requestError, setRequestError] = useState({});

  const onEmailChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isEmail(input);
    if (!isValid) {
      setFormError({ ...formError, email: "email in not valid" });
    } else delete formError.email;
    setEmail(input);
  };

  const onPasswordChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isEmpty(input);
    if (isValid) {
      setFormError((prevState) => ({
        ...prevState,
        password: "password in invalid",
      }));
    } else delete formError.password;
    setPassword(input);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || _.isEmpty(password) || _.isEmpty(email)) {
      return onInputError();
    }
    try {
      await login(email, password);
      /*
      props.location.state
        ? props.history.push(props.location.state.from)
        : props.history.push("/");
        */
      window.location = props.location.state ? props.location.state.from : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const requestError = { ...requestError };
        requestError.request = ex.response.data;
        setRequestError(requestError);
      } else console.log(ex.message);
    }
  };
  //Helmi@mail.com
  return (
    <div>
      <form onSubmit={onSubmitLogin}>
        <input
          name="email"
          type="text"
          value={email}
          onChange={onEmailChange}
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

export default Login;
