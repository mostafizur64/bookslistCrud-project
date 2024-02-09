import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../page/Home/Home";
import AddItem from "../page/AddITem/AddItem";
import EditItem from "../page/EditItem/EditItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addItem",
        element: <AddItem />,
      },
      {
        path: "/editItem/:id",
        element: <EditItem />,
      },
    ],
  },
]);
export default router;
