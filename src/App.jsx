import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import DashBoardUser from "./pages/user";
import HomePage from "./pages/user/HomePage";
import SearchPage from "./pages/user/SearchPage";
import FavoriteFood from "./pages/user/FavoriteFood";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ForgotPassword from "./pages/public/ForgotPassword";
import DashBoardAdmin from "./pages/admin";
import SearchPageAdmin from "./pages/admin/SearchPage";
import ReportPageAdmin from "./pages/admin/ReportPage";
import ReportPage from "./pages/user/ReportPage";
import ShareRecipe from "./pages/user/ShareRecipe";
import AddNewRecipe from "./pages/admin/AddNewRecipe";
import Suggestion from "./pages/admin/Suggestion";
import UserRecipes from "./pages/admin/UserRecipes";
import DetailFood from "./pages/user/DetailFood";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.REGISTER} element={<RegisterPage />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.HOME} element={<DashBoardUser />}>
          <Route path={path.HOME} element={<HomePage />} />
          <Route path={path.DETAIL_FOOD} element={<DetailFood />} />
          <Route path={path.SEARCH_PAGE} element={<SearchPage />} />
          <Route path={path.FAVORITE_PAGE} element={<FavoriteFood />} />
          <Route path={path.REPORT_PAGE} element={<ReportPage />} />
          <Route path={path.SHARE_RECIPE} element={<ShareRecipe />} />
        </Route>
        <Route path={path.ADMIN_HOME} element={<DashBoardAdmin />}>
          <Route path={path.ADMIN_SEARCH_PAGE} element={<SearchPageAdmin />} />
          <Route path={path.ADMIN_USERS_RECIPE} element={<UserRecipes />} />
          <Route path={path.ADMIN_REPORT_PAGE} element={<ReportPageAdmin />} />
          <Route path={path.ADMIN_SUGGESTION} element={<Suggestion />} />
          <Route path={path.ADMIN_NEW_RECIPE} element={<AddNewRecipe />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
