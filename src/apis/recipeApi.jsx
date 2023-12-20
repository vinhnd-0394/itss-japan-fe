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

// export const createRecipe = (recipeName, author, unknownIngre, food) => {
export const createRecipe = (recipeName, author, ingredientTags, food) => {
  return Api.post("/recipes", {
    recipeName,
    author,
    // unknownIngre,
    ingredientTags,
    food,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getNotAcceptRecipes = () => {
  return Api.get("/recipes/not-accept")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const acceptRecipe = (id) => {
  return Api.put(`/recipes/${id}/accept`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const refuseRecipe = (id) => {
  return Api.delete(`/recipes/${id}/not-accept`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
