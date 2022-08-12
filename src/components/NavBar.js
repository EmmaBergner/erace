import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser()

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null)
    } catch (err) {
      console.log(err.response?.data)
    }
  }


  const loggedInIcons = <>

        <NavLink to="/races" 
          className= {({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")} >
          <FontAwesomeIcon icon="fa-solid fa-earth-americas" />
          Races
        </NavLink>
     
        <NavLink to="/liked"
          className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
          <FontAwesomeIcon icon="fa-solid fa-star" />Liked
        </NavLink>

        <NavLink to='/runs'
          className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
          <Avatar src={currentUser?.profile_image} text="My Runs" height={40} />
        </NavLink>

        <NavLink to="/signin"
          className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}
          onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i>
        </NavLink>
      </>

      const loggedOutIcons =
      <>
        <NavLink to="/signin"
          className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
          <i className="fas fa-sign-in-alt"></i>Sign in
        </NavLink>

        <NavLink to="/signup"
          className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
          <i className="fas fa-user-plus"></i>Sign up
        </NavLink>
      </>

      return (
      <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed='top'>
        <Container>
          <NavLink to="/">

          </NavLink>

          <Navbar.Toggle ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto text-left">
              <NavLink to="/"
                className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
                <FontAwesomeIcon icon="fa-solid fa-person-running" />Next
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
};

      export default NavBar;