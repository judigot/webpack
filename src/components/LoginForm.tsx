import React from "react";
import { FormEventHandler, useRef, useState } from "react";

import axios from "axios";

interface Props {}

interface Form {
  username?: string;
  password?: string;
}

export const LoginForm = (props: Props) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = React.useState<Form["username"]>();
  const [password, setPassword] = React.useState<Form["password"]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const data: { [key: string]: boolean } = res.data;
        if (res.status == 200 && res.statusText === "OK") {
          if (data.userExists && data.passWordValid) {
            // Successful login
            alert("Login successful!");
          }
          if (data.userExists && !data.passWordValid) {
            // Failed login
            alert("Wrong password!");
          }
          if (!data.userExists) {
            // User does not exist
            alert("User does not exist!");
          }
        }
      })
      .catch((error) => {
        // Fail
        console.log(error);
      })
      .finally(() => {
        // Finally
      });
  };

  const handleChange = (e: React.KeyboardEvent) => {
    const usernameVal: Form["username"] = usernameRef.current?.value;
    const passwordVal: Form["password"] = passwordRef.current?.value;
    setUsername(usernameVal);
    setPassword(passwordVal);
  };

  return (
    <div className="login-form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Username</label>
        <input
          ref={usernameRef}
          onKeyUp={(e) => {
            handleChange(e);
          }}
          type="text"
          name="username"
        />

        <label>Password</label>
        <input
          ref={passwordRef}
          onKeyUp={(e) => {
            handleChange(e);
          }}
          type="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
