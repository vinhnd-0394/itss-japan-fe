import moment from "moment";
import { acceptRecipe, refuseRecipe } from "../apis/recipeApi";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/prop-types */
const RecipeUser = ({
  recipe,
  fetchNotAcceptRecipes,
  notifySuccess,
  notifyError,
}) => {
  const handelAcceptRecipe = async (id) => {
    const response = await acceptRecipe(id);
    if (response.success) {
      await fetchNotAcceptRecipes();
      notifySuccess();
    } else {
      notifyError();
    }
  };

  const handleRefuseRecipe = async (id) => {
    const response = await refuseRecipe(id);
    await fetchNotAcceptRecipes();
    if (response.success) {
      await fetchNotAcceptRecipes();
      notifySuccess();
    } else {
      notifyError();
    }
  };

  return (
    <div className="border rounded-sm p-8 shadow-xl w-2/3">
      <p>
        <span className="font-bold mr-5">Author:</span>
        <span>{recipe.user.displayName}</span>
      </p>
      <p>
        <span className="font-bold mr-5">Date Submitted:</span>
        <span>{moment(recipe.createdAt).format("YYYY-MM-DD")}</span>
      </p>
      <p>
        <span className="font-bold mr-5">Title:</span>
        <span>{recipe.recipeName}</span>
      </p>
      <p>
        <span className="font-bold mr-5">Ingredients:</span>
        <span>{recipe.unknownIngre}</span>
      </p>
      <p>
        <button
          className="bg-blue-500 text-white py-2 px-4 font-semibold mr-5"
          onClick={() => handelAcceptRecipe(recipe.id)}
        >
          Accept
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 font-semibold"
          onClick={() => handleRefuseRecipe(recipe.id)}
        >
          Refuse
        </button>
      </p>
    </div>
  );
};

export default RecipeUser;
