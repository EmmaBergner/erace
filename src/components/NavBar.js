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

  const loggedInIcons =
    <>

      <NavLink to="/"
        className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
        <FontAwesomeIcon icon="fa-solid fa-person-running" />Next
      </NavLink>

      <NavLink to="/races"
        className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")} >
        <FontAwesomeIcon icon="fa-solid fa-earth-americas" />
        Races
      </NavLink>

      <NavLink to="/races/create"
        className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")} >
        <FontAwesomeIcon icon="fa-solid fa-plus" />
        Add Race
      </NavLink>

      <NavLink to='/runs'
        className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}>
        <FontAwesomeIcon icon="fa-solid fa-person-running" />Runs
      </NavLink>

      <NavLink to="/signin"
        className={({ isActive }) => styles.NavLink + (isActive ? " " + styles.Active : "")}
        onClick={handleSignOut}>
       <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
      </NavLink>
    </>

  return (
    <>
      {currentUser ?
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed='top' >
          <Container>
            <NavLink to="/">
            </NavLink>
            <Navbar.Toggle ref={ref}
              onClick={() => setExpanded(!expanded)}
              aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto text-left">


                {loggedInIcons}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar >
        :
        <div />
      }
    </>
  )
};

export default NavBar;