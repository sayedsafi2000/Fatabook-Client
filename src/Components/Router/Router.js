import About from "../About/About";
import Home from "../Home/Home";
import Main from "../Layout/Main";
import Media from "../Media/Media";
import Message from "../Message/Message";
import SignUp from "../Signup/SignUp";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/media",
                element:<Media></Media>
            },
            {
                path:"/message",
                element:<Message></Message>
            },
            {
                path:"/about",
                element:<About></About>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            },
        ]
    }
])