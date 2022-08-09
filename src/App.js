import styles from './App.module.css';
import './api/axiosDefault';
import NavBar from './components/NavBar';
import { useCurrentUser } from './contexts/CurrentUserContext';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPersonRunning, faStar, faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import RacesPage from './pages/races/RacesPage';
import { Container } from 'react-bootstrap';
import RaceCreateForm from './pages/races/CreateRace';
import HomePage from './pages/home/HomePage';
library.add(faPersonRunning, faStar, faEarthAmericas)

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
      <Routes>
        <Route exact path="/races"
          element={<RacesPage
            message="No results found. Adjust the search keyword or follow a user."
            filter={`owner__followed__owner__profile=${profile_id}&`} />} />

        <Route exact path="/signup" element={<SignUpForm />} />
        <Route exact path="/signin" element={<SignInForm />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/races" element={<RacesPage />} />
        <Route exact path="/races/create" element={<RaceCreateForm />} />

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
      </Container>
    </div>
  );
}

export default App;
