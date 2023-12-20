import { useEffect, useState } from "react";
import { getNotAcceptRecipes } from "../../apis/recipeApi";
import RecipeUser from "../../components/RecipeUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRecipes = () => {
  const [notAcceptRecipes, setNotAcceptRecipes] = useState([]);
  const fetchNotAcceptRecipes = async () => {
    const response = await getNotAcceptRecipes();
    if (response.success) {
      setNotAcceptRecipes(response.recipes);
    }
  };
  useEffect(() => {
    fetchNotAcceptRecipes();
  }, []);

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
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold text-center">Censored Recipes</p>
      {notAcceptRecipes?.length > 0 ? (
        notAcceptRecipes.map((item) => (
          <RecipeUser
            key={item.id}
            recipe={item}
            fetchNotAcceptRecipes={fetchNotAcceptRecipes}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
          />
        ))
      ) : (
        <p className="text-lg bg-blue-200 p-5">No data</p>
      )}
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

export default UserRecipes;
