import React, { useRef, useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefault";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/HomePage.module.css";

function HomePage({ message, filter = "" }) {
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(5000);
    const intervalRef = useRef(); // Add a ref to store the interval id
    const [hasLoaded, setHasLoaded] = useState(false);
    const [nextRace, setNextRace] = useState(null)
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    const [races, setRaces] = useState({ results: [] });

    // Select the race that is closest in time. 
    const calculateNext = (allOptions) => {
        const now = new Date()
        let answer = null
        for (let i = 0; i < allOptions.length; i++) {
            let option = allOptions[i];
            
            let optionDate = new Date(option.date);
            if (now < optionDate) { // Check that this race has not already been run. 
                if (answer == null) // Select this race if there is no currently selected race.
                    answer = option
                else if (optionDate < new Date(answer.date)) // Otherwise select this race if it's closer in time then currently selected race.
                    answer = option
            }
        }
        return answer
    }

    const fetchRaces = async () => {
        try {
            const { data } = await axiosReq.get(`/races?runs__owner__profile=${profile_id}`);
            setRaces(data)
            if (data.results.length > 0) {
                const nr = calculateNext(data.results)
                setNextRace(nr)

                const start = new Date(nr.date).getTime() / 1000
                const now = new Date().getTime() / 1000
                setTimeLeftSeconds(start - now)
            }
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setHasLoaded(false);
        fetchRaces();
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeftSeconds((t) => t - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    // Add a listener to `timeLeft`
    useEffect(() => {
        if (timeLeftSeconds <= 0) {
            clearInterval(intervalRef.current);
        }
    }, [timeLeftSeconds]);

    return (
        <>
            {!hasLoaded ?
                (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )
                :
                nextRace == null ?
                (
                <div> Welcome to my site</div>
                )
                :
                ( 
                    <Card className={styles.HomePage}>
                        <Card.Body>
                            <div className="container">
                                <div className="row">
                                    <div className="NameCol col" >
                                        {Math.floor(timeLeftSeconds / (60 * 60 * 24))}
                                        <p>Days</p>
                                    </div>
                                    <div className="NameCol col" >
                                        {Math.floor(timeLeftSeconds % (60 * 60 * 24) / (60 * 60))}.
                                        <p>Hours</p>
                                    </div>
                                    <div className="NameCol col" >
                                        {Math.floor(timeLeftSeconds % (60 * 60) / 60)}.
                                        <p>Minutes</p>
                                    </div>
                                    <div className="NameCol col" >
                                        {Math.floor(timeLeftSeconds % 60)}.
                                        <p>Seconds</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-md-center NextRun">
                                <div className={styles.NextRun}>Your next run is in:
                                </div>
                            </div>
                            <div> {nextRace?.country}</div>
                        </Card.Body>
                    </Card>
                )
            }
        </>
    );
}

export default HomePage