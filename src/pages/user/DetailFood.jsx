/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodDetail } from "../../apis/foodApi";
import { HeartFilled, HeartOutlined, WechatOutlined } from "@ant-design/icons";
import path from "../../utils/path";
import { StarFilled } from "@ant-design/icons";
import CommentCard from "../../components/CommentCard";
import { createComment, getCommentsByFoodID } from "../../apis/commentApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DetailFood = () => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const params = useParams("foodId");
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [foodDetail, setFoodDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [addComments, setAddComments] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [commentText, setCommentText] = useState("");
  const [aveStar, setAveStar] = useState(0);
  const fetchDetailFood = async (foodId) => {
    const response = await getFoodDetail(foodId);
    if (response.success) {
      setFoodDetail(response.foodDetail);
    } else {
      navigate(path.HOME);
    }
  };
  const fetchCreateComment = async () => {
    const food_id = params.foodId;
    let userLogin = localStorage.getItem("userLogin");
    userLogin = JSON.parse(userLogin);
    const user_id = userLogin.id;
    console.log(food_id);
    if (selectedValue !== "?") {
      const response = await createComment(
        user_id,
        selectedValue,
        commentText,
        food_id
      );
      if(response){
        notifySuccess()
      }
      setAddComments(false);
      setComments([...comments, response.comment]);

      averageStars += response.comment.star;
      averageStars = (averageStars / comments.length).toFixed(1);
    }
  };
  const fetchComments = async (foodId) => {
    const response = await getCommentsByFoodID(foodId);
    if (response.success) {
      setComments(response.comments);
    } else {
      navigate(path.HOME);
    }
  };
  const handleCommentsClick = () => {
    setShowComments(true);
    setAddComments(false);
  };
  const handleCommentsClose = () => {
    setShowComments(false);
  };
  let totalStars = 0;
  for (const comment of comments) {
    totalStars += comment.star;
  }

  let averageStars = (totalStars / comments.length).toFixed(1);
  const commentsArray = Object.values(comments);
  useEffect(() => {
    fetchDetailFood(params.foodId);
    fetchComments(params.foodId);
    setAveStar(averageStars);
  }, [averageStars]);

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

  return (
    foodDetail && (
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 flex-3 w-full">
          <p
            className="text-blue-500 cursor-pointer text-lg"
            onClick={() => navigate(-1)}
          >
            Return
          </p>
          <img
            src={
              "https://i1-dulich.vnecdn.net/2020/03/04/7174177733-6c0af1a0b2-b-4778-1583317457.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=W5Ll2-T9398seyb0orXqFA" ||
              "https://daynauan.info.vn/wp-content/uploads/2019/05/suon-non-kho-nuoc-dua.jpg"
            }
            alt="mon-an"
            className="w-full"
          />
          <h2 className="font-bold text-3xl my-5">{foodDetail.foodName}</h2>
          <p>
            <span className="font-bold">ACTIVE TIME: </span>
            <span>24 mins</span>
          </p>
          <p>
            <span className="font-bold">TOTAL TIME: </span>
            <span>24 mins</span>
          </p>
        </div>
        {showComments ? (
          <div className="w-3/4">
            {addComments ? (
              <div className="flex flex-col flex-2 gap-4  bg-green-100 rounded-md ">
                <div className=" flex items-end justify-between p-4">
                  <button
                    onClick={handleCommentsClose}
                    className="text-xl underline text-blue-600"
                  >
                    Return
                  </button>
                  <button
                    className="bg-gray-300 text-black rounded-full px-4 py-2"
                    onClick={() => setAddComments(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center">
                  <p className="text-3xl font-bold">
                    <StarFilled className="text-yellow-400 ml-2 mr-1" />
                  </p>
                  <select
                    className="ml-2"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    defaultValue="?"
                  >
                    {["?", 1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-4 w-full">
                  <textarea
                    className="resize-y bg-gray-300 w-full h-32 text-left pl-2 pt-1 break-all rounded-md"
                    placeholder="Write comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                <div className="flex justify-center items-center mb-4 ">
                  <button
                    className="text-xl text-black bg-green-400 p-2 rounded-full"
                    onClick={fetchCreateComment}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-2 gap-4  bg-green-100 rounded-md">
                <div className=" flex items-end justify-between p-4">
                  <button
                    onClick={handleCommentsClose}
                    className="text-xl underline text-blue-600"
                  >
                    Return
                  </button>
                  <button
                    className="bg-gray-300 text-black rounded-full px-4 py-2"
                    onClick={() => setAddComments(true)}
                  >
                    New comment
                  </button>
                </div>
                <p className="text-3xl font-bold">
                  <StarFilled className="text-yellow-400 ml-2 mr-1" /> {aveStar}
                </p>
                {commentsArray.length > 0 ? (
                  commentsArray
                    .reverse()
                    .map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))
                ) : (
                  <p>You don't have favorite food</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col flex-2 gap-4 w-3/4">
            <div className="flex text-xl gap-10 items-center">
              <span>INGREDIENTS</span>
              <span>{foodDetail?.recipe?.ingredients?.length} servings</span>
              <span>
                {foodDetail?.favorite?.some(
                  (item) => item.user_id === userLogin.id
                ) ? (
                  <HeartFilled className="text-red-500 " />
                ) : (
                  <HeartOutlined />
                )}
              </span>
              <span>
                <WechatOutlined onClick={handleCommentsClick} />
              </span>
            </div>
            <hr className="h-1 bg-black" />
            {foodDetail?.recipe?.ingredients.map((item) => {
              return (
                <p key={item.id} className="flex gap-4 items-center">
                  <span>{item.ingredient.ingredientName}</span>
                  <span>{item.quantity}</span>
                  <span>{item.unit}</span>
                </p>
              );
            })}
            <hr className="h-1 bg-black" />
            <p>{foodDetail.foodDescription}</p>
          </div>
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
    )
  );
};

export default DetailFood;
