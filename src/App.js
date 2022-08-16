import styles from './App.module.css';
import './api/axiosDefault';
import NavBar from './components/NavBar';
import { useCurrentUser } from './contexts/CurrentUserContext';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPersonRunning, faStar, faEarthAmericas, faImage } from '@fortawesome/free-solid-svg-icons'
import RaceListPage from './pages/races/RaceListPage';
import { Container } from 'react-bootstrap';
import RaceCreateForm from './pages/races/CreateRace';
import HomePage from './pages/home/HomePage';
import RunsPage from './pages/runs/RunsPage';
import RaceDetailPage from './pages/races/RaceDetailPage';
library.add(faPersonRunning, faStar, faEarthAmericas, faImage)

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/races"
            element={<RaceListPage
              message="No results found. Adjust the search keyword or follow a user."
              filter={""} />} />

          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/races" element={<RaceListPage />} />
          <Route exact path="/races/create" element={<RaceCreateForm />} />
          <Route exact path="/runs" element={<RunsPage />} />
          <Route exact path="/races/:id" element={<RaceDetailPage />} />

          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
