import Api from "./baseApi";

export const login = (username, password) => {
  return Api.post("/login", { username, password })
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

// register
// ...
//

//forgotPassword
// ...
//
