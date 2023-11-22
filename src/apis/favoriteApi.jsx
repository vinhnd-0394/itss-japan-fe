import Api from "./baseApi";

export const getFavoriteFoods = (userId) => {
  return Api.get(`/favorites/${userId}`)
    .then(response => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch(error => {
      // Xử lý lỗi ở đây
      throw error;
    });
};
