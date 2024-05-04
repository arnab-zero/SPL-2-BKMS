import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SubmitPaper from "../pages/SubmitPaper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Page not found</p>,
    children: [
      {
        path: "/",
        element: <div>Hello World!</div>,
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
        path: "/knowledge-graph",
        element: <h1>Knowledge Graph</h1>,
      },
      {
        path: "/submit-paper",
        element: <SubmitPaper></SubmitPaper>,
      },
    ],
  },
]);

export default router;
