import Api from "./baseApi";

export const getAllIngredients = () => {
  return Api.get("/ingredients")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};
