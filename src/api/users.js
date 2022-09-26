import jwt_decode from "jwt-decode";

export const login = async (user) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.text();

    if (res.ok) localStorage.setItem("token", data);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const register = async (details) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data = await res.text();
    if (res.ok) return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const checkAuth = () => {
  let isAuth = localStorage.getItem("token") ? true : false;
  let user = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;
  return { isAuth, user };
};
