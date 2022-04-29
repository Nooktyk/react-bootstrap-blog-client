import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import FormComponent from "./components/FormComponent";
import App from "./App";
import SingleComponent from "./components/SingleComponent";
import React from "react";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import AdminRoute from "./Adminroute";

const MyRoute =()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path="/create" exact element={<AdminRoute/>}>
                    <Route path="/create" exact element={<FormComponent/>}/>
                </Route>
                <Route path="/blog/:slug" exact element={<SingleComponent/>}/>
                <Route path="/blog/edit/:slug" exact element={<AdminRoute/>}>
                    <Route path="/blog/edit/:slug" exact element={<EditComponent/>}/>
                </Route>
                <Route path="/login" exact element={<LoginComponent/>}/>
            </Routes>
        </Router>
    )
}

export default MyRoute;