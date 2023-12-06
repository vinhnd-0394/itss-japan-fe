import Api from "./baseApi";

export const getFavoriteFoods = (foodname) => {
  return Api.get(`/favorites/${foodname}`)
    .then(response => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch(error => {
      // Xử lý lỗi ở đây
      throw error;
    });
};