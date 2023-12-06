import Api from "./baseApi";

export const getAllRecipes = ({
  type = "",
  ingredient_ids = [],
  foodName = "",
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

export const createRecipe = (recipeName, author, unknownIngre, foodID) => {
  return Api.post("/recipes", {
    recipeName,
    author,
    unknownIngre,
    foodID,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
