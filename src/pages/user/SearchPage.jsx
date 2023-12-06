import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getAllIngredients } from "../../apis/ingredientApi";
import { getAllRecipes } from "../../apis/recipeApi";
import FoodSearchCard from "../../components/FoodSearchCard";

const SearchPage = () => {
  const [ingredientValue, setIngredientValue] = useState("");
  const [foodNameValue, setFoodNameValue] = useState("");
  const [ingredientTags, setIngredientTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showSelectTags, setShowSelectTags] = useState(false);
  const inputTagRef = useRef(null);

  const fetchAllIngredients = async () => {
    const response = await getAllIngredients();
    if (response.success) {
      setIngredients(response.ingredients);
    }
  };

  const handleMouseDown = (e) => {
    if (inputTagRef.current && !inputTagRef.current.contains(e.target)) {
      setShowSelectTags(false);
    }
  };

  useEffect(() => {
    fetchAllIngredients();
    fetchRecipes();
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const addTagsSelect = (ingredient) => {
    if (!ingredientTags?.some((item) => item.id === ingredient.id))
      setIngredientTags([...ingredientTags, ingredient]);
  };

  const removeTags = (ingredient) => {
    const newTags = ingredientTags.filter((tag) => tag.id !== ingredient.id);
    setIngredientTags(newTags);
  };

  const fetchRecipes = async () => {
    const ingredient_ids = ingredientTags.map((item) => item.id);
    const response = await getAllRecipes({
      foodName: foodNameValue,
      ingredient_ids: ingredient_ids,
    });
    if (response.success) {
      setRecipes(response.recipes);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3 flex flex-col text-lg bg-slate-300">
        <div className="relative w-full" ref={inputTagRef}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchOutlined className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            value={foodname}
            onChange={handleFoodnameChange}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search your favorite food"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchPage;
