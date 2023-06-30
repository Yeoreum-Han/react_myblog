import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Blogs from "./components/Blogs";
import CreatePage from "./pages/CreatePage";
import ShowPosts from "./components/ShowPost";
import NavResult from "./components/NavResult";
import Admin from "./components/Admin";
import EditPost from "./components/EditPost";

const routes = [
    {
        path: "/",
        component : Home
    },
    {
        path: "/reviews",
        component : Reviews
    },
    {
        path: "/blogs",
        component : Blogs
    },
    {
        path: "/create",
        component : CreatePage,
        auth : true
    },
    {
        path:"/:id",
        component: ShowPosts
    },
    {
        path: "/:id/edit",
        component : EditPost,
        auth : true
    },
    {
        path:"/search/navResult",
        component : NavResult
    },
    {
        path:"/private/admin",
        component : Admin,
        auth : true
    }
];
export default routes;