import { Fragment, useEffect, useState } from "react";
import FoodSuggestionCard from "../../components/FoodSuggestionCard";
import { getAllFoods } from "../../apis/foodApi";

const HomePage = () => {
  const [foods, setFoods] = useState([]);
  const fetchFoodSuggestions = async () => {
    const response = await getAllFoods();
    if (response.success) {
      setFoods(response.foods);
    }
  };
  useEffect(() => {
    fetchFoodSuggestions();
  }, []);
  return (
    <Fragment>
      <h2 className="font-bold text-xl mb-3">Suggestion for your meal</h2>
      <div className="grid grid-cols-3 gap-4">
        {foods.length > 0 ? (
          foods.map((food) => <FoodSuggestionCard key={food.id} food={food} />)
        ) : (
          <p>No food suggestions available</p>
        )}
      </div>
    </Fragment>
  );
};

export default HomePage;
