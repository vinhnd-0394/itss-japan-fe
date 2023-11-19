import Api from "./baseApi";

export const login = (email, password) => {
  return Api.post("/login", { email, password });
};

// register
// ...
//


//forgotPassword
// ...
//
