import React, { useRef, useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefault";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/HomePage.module.css";

const HomePage = () => {
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(5000);
    const intervalRef = useRef(); // Add a ref to store the interval id
    const [hasLoaded, setHasLoaded] = useState(false);
    const [nextRace, setNextRace] = useState(null)
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

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
            console.log("NEXT", JSON.stringify(data))
            if (data.results.length > 0) {
                const nr = calculateNext(data.results)
                setNextRace(nr)
                if (nr != null) {
                    const start = new Date(nr.date).getTime() / 1000
                    const now = new Date().getTime() / 1000
                    setTimeLeftSeconds(start - now)
                }
            }
            console.log("NEXT loaded")
            setHasLoaded(true)
        } catch (err) {
            console.log("Home page", "fetchRaces", err)
        }
    }

    useEffect(() => {
        setHasLoaded(false);
        if (currentUser) fetchRaces();
        // eslint-disable-next-line
    }, [currentUser]);

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

                        <div className={styles.Welcome}>
                            <p>This page will show where you are running next.
                                In addition, use this application to:
                                <ul>
                                    <li>find races that you might want to run.</li>
                                    <li>join the buzz and share information about races.</li>
                                    <li>keep tabs on all your upcoming races and track of all your past races.</li>
                                </ul>
                            </p>
                            <p>
                                Go to “Races” to search for races. You can search for a race based on country or
                                whether you “liked" it previously. If you are looking for a race that isn’t
                                in the database, you are encouraged to add it for all to use.
                            </p>
                            <p>
                                Mark races you are interested in and want to find easily as liked by clicking the star icon.
                            </p>
                            <p>
                                Click the race name to go to the Race page. Here you will see more details and be able to join the conversation.
                                You can post text and images relating to the race and read what others have posted.
                                By clicking the running man icon, you mark the race as one you are going to run given that it is in the future,
                                or have already run, if it is in the past. It will the appear on the “Runs” page.
                                </p>
                            <p>
                                To add a race that is not already in the database, go to “Add Race”.
                                </p>
                            <p>
                                The "Runs” has a column for past races and a separate column for upcoming races so that you can easily stay on top of things.
                                And speaking of staying on top of you upcoming races, don’t forget to revisit this page once you have one.
                            </p>
                        </div>

                    )
                    :
                    (
                        <Container className={styles.HomePage}>
                            <Card.Body className="p-1">
                                <div class="row gx-5">
                                    <Col sm={3} xs={3} className="p-0">
                                        {Math.floor(timeLeftSeconds / (60 * 60 * 24))}
                                        <p className={styles.Label}>Days</p>
                                    </Col>
                                    <Col sm={3} xs={3} className="p-0">
                                        {Math.floor(timeLeftSeconds % (60 * 60 * 24) / (60 * 60))}
                                        <p className={styles.Label}>Hours</p>
                                    </Col>
                                    <Col sm={3} xs={3} className="p-0">
                                        {Math.floor(timeLeftSeconds % (60 * 60) / 60)}
                                        <p className={styles.Label}>Minutes</p>
                                    </Col>
                                    <Col sm={3} xs={3} className="p-0">
                                        {Math.floor(timeLeftSeconds % 60)}
                                        <p className={styles.Label}>Seconds</p>
                                    </Col>

                                </div>
                                <Row >
                                    <Col className={styles.NextRun}>Your next run is&nbsp;in:
                                    </Col>
                                </Row>

                                <div className={styles.Country}>{nextRace?.country} </div>
                            </Card.Body>
                        </Container>
                    )
            }
        </>
    );
}

export default HomePage