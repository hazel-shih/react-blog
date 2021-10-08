import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import HomePage from "../../pages/Homepage";
import LoginPage from "../../pages/LoginPage";
import AboutPage from "../../pages/AboutPage";
import RegisterPage from "../../pages/RegisterPage";
import ListPage from "../../pages/ListPage";
import PostPage from "../../pages/PostPage";
import WritePage from "../../pages/WritePage";
import Header from "../Header";
import { AuthContext } from "../../context";
import { getMe } from "../../WebAPI";
import Banner from "../Banner";
import EditPage from "../../pages/EditPage";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    getMe().then((res) => {
      if (res.ok !== 1) {
        localStorage.setItem("token", "");
      }
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <Banner />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/list">
              <ListPage />
            </Route>
            <Route path="/Register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route exact path="/write">
              <WritePage />
            </Route>
            <Route path="/edit/:id">
              <EditPage />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
