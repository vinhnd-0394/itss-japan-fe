import Api from "./baseApi";

export const getCommentsByFoodID = (foodID) => {
  return Api.get(`/comments/${foodID}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const createComment = (user_id, star, content, food_id) => {
  return Api.post("/comments", { user_id, star, content, food_id })
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};
