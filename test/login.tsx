import React from "react";
import "@testing-library/jest-dom";

const login = () => {
  return (
    <>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="username" data-testid="Username" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" data-testid="Password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default login;
