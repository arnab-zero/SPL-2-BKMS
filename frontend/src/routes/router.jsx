import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SubmitPaper from "../pages/SubmitPaper";
import Graph from "../pages/Graph";
import Home from "../pages/Home";
import PaperDiscussion from "../pages/PaperDiscussion";
import UserDashboard from "../pages/UserDashboard";
import Statistics from "../pages/Statistics";
import Admin from "../pages/Admin";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/graph",
        element: <Graph />,
      },
      {
        path: "/submit-paper",
        element: <SubmitPaper></SubmitPaper>,
      },
      {
        path: "/discussion/:paperId",
        element: <PaperDiscussion />,
      },
      {
        path: "/user",
        element: <UserDashboard />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
]);

export default router;
