/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { getAllIngredients } from "../../apis/ingredientApi";
import { createRecipe } from "../../apis/recipeApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ShareRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientValue, setIngredientValue] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [showSelectTags, setShowSelectTags] = useState(false);
  const [ingredientTags, setIngredientTags] = useState([]);
  const inputTagRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    } else {
      setSelectedImage(null);
    }
  };
  const fetchCreateRecipe = async () => {
    let userLogin = localStorage.getItem("userLogin");
    userLogin = JSON.parse(userLogin);
    const author = userLogin.id;
    const food = { foodName, foodDescription };
    const response = await createRecipe(
      recipeName,
      author,
      ingredientTags,
      food
    );
    if (response.success) {
      notifySuccess();
      handlelReset();
    } else {
      notifyError();
    }
  };
  const handlelReset = () => {
    setFoodDescription("");
    setFoodName("");
    setIngredientTags([]);
    setIngredientValue("");
    setRecipeName("");
    setSelectedImage("");
    setShowSelectTags([]);
  };

  const notifySuccess = () =>
    toast.success("Success", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = () =>
    toast.error("Error", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  return (
    <div>
      <div className="flex justify-center flex-col">
        <h1 className="text-2xl mb-2">Recipe's Name:</h1>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter the recipe name"
          className="block w-11/12 p-3 text-base text-black border border-gray-300 rounded-lg mb-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <h1 className="text-2xl mb-2">Food Name:</h1>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Enter the food name"
          className="block w-11/12 p-3 text-base text-black border border-gray-300 rounded-lg mb-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <h1 className="text-2xl mb-2">Food Description:</h1>
        <input
          type="text"
          value={foodDescription}
          onChange={(e) => setFoodDescription(e.target.value)}
          placeholder="Enter the food description"
          className="block w-11/12 p-3 text-base text-black border border-gray-300 rounded-lg mb-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <h1 className="text-2xl mb-2 mt-2">Ingredients:</h1>
        <div className="relative w-11/12" ref={inputTagRef}>
          <input
            type="text"
            value={ingredientValue}
            onChange={(e) => setIngredientValue(e.target.value)}
            onFocus={() => setShowSelectTags(true)}
            className="block w-full p-3 text-base text-black border border-gray-300 rounded-lg mb-2 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
        <h1 className="text-2xl mt-2 mb-2">Image (Optional):</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <div className="flex justify-center items-center space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchCreateRecipe}
          >
            Submit
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ShareRecipe;
