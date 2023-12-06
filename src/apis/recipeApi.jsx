import Api from "./baseApi";

export const getAllRecipes = ({
  type = "",
  ingredient_ids = [],
  foodName = ""
}) => {
  return Api.get("/recipes", {
    params: {
      type: type,
      ingredient_ids: ingredient_ids,
      foodName: foodName,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
