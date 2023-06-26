import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'
import { Navbar, NavbarBrand, Nav, NavItem, NavbarText, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import CreateRecipe from './pages/CreateRecipe';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from "react"
import EditRecipe from './pages/EditRecipe';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: "0",
    status: false
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false })
        }
        else {
          setAuthState(
            {
              username: response.data.username,
              id: response.data.id,
              status: true
            }
          )
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: "0",
      status: false
    });
    window.location.pathname = "/login"
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router >
          <Navbar
            color="light"
            expand="md"
            light
          >
            {authState.status && (
              <>
                <NavbarBrand href="/" className='navbar-black'>
                  Strona główna
                </NavbarBrand>
              </>
            )}

            <Nav
              className="me-auto"
              navbar
            >
              {authState.status && (
                <>
                  <NavItem>
                    <Link to="/createrecipe" className='navbar-item'> Dodaj nowy przepis</Link>
                  </NavItem>
                </>
              )}

              {!authState.status && (
                <>
                  <NavItem>
                    <Link to="/login" className='navbar-item'> Zaloguj się</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/register" className='navbar-item'> Zarejestruj się </Link>
                  </NavItem>
                </>
              )}

            </Nav>
            {authState.status && (
              <>
                <UncontrolledDropdown
                  inNavbar nav
                >
                  <DropdownToggle
                    caret nav
                  >
                    <NavbarText>
                      {authState.username}
                    </NavbarText>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to={`/profile/${authState.id}`} className='navbar-item navbar-item-long'> Profil</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavItem>
                        <Link to="/" onClick={logout} className='navbar-item navbar-item-long'> Wyloguj się</Link>
                      </NavItem>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Navbar>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createrecipe" exact element={<CreateRecipe />} />
            <Route path="/editrecipe/:id" exact element={<EditRecipe />} />
            <Route path="/recipe/:id" exact element={<Recipe />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>

        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
