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
            type="text"
            value={ingredientValue}
            onChange={(e) => setIngredientValue(e.target.value)}
            onFocus={() => setShowSelectTags(true)}
            className="block w-full p-2 ps-10 text-base text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your ingredients"
          />
          <div className="absolute mt-1 flex flex-col w-full bg-white shadow-md shadow-gray-500 rounded overflow-y-auto max-h-[150px]">
            {showSelectTags &&
              ingredients
                ?.filter((ingredient) =>
                  ingredient.ingredientName.includes(ingredientValue)
                )
                ?.filter(
                  (ingredient) =>
                    !ingredientTags.some((item) => item.id === ingredient.id)
                )
                ?.map((ingredient) => (
                  <button
                    className="text-left px-2 py-1 hover:bg-gray-300"
                    value={ingredient.ingredientName}
                    key={ingredient.id}
                    onClick={() => addTagsSelect(ingredient)}
                  >
                    {ingredient.ingredientName}
                  </button>
                ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {ingredientTags.map((ingredient, index) => {
            return (
              <span
                className=" bg-blue-700 rounded-md p-2 m-1 text-white flex items-center"
                key={index}
              >
                <span>{ingredient.ingredientName}</span>
                <button
                  className="ml-2 text-black flex items-center justify-center rounded-full bg-white w-[15px] h-[15px]"
                  onClick={() => removeTags(ingredient)}
                >
                  x
                </button>
              </span>
            );
          })}
        </div>
        <button
          className="my-5 bg-blue-500 rounded-md p-2 text-white text-center font-bold"
          onClick={fetchRecipes}
        >
          Search
        </button>
      </div>
      <div className="px-4 w-2/3 flex flex-col text-lg gap-y-4 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipes();
          }}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchOutlined className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={foodNameValue}
              onChange={(e) => setFoodNameValue(e.target.value)}
              className="block w-full p-2 ps-10 text-base text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter food name"
            />
          </div>
        </form>
        <div className="max-h-[750px] overflow-y-auto flex flex-col gap-4">
          {recipes?.map((item) => {
            return (
              <FoodSearchCard
                key={item.id}
                foodName={item.food.foodName}
                foodDescription={item.food.foodDescription}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
