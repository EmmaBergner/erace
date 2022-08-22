import React, { useRef, useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/RunsPage.module.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import ListRace from "../races/ListRace.js";


function RunsPage({ message, filter = "" }) {
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(5000);
    const intervalRef = useRef(); // Add a ref to store the interval id
    const [hasLoaded, setHasLoaded] = useState(false);
    const [nextRace, setNextRace] = useState(null)
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    const [races, setRaces] = useState({ results: [] });

    const [passed, setPassed] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const fetchRaces = async () => {
        try {
            const { data } = await axiosReq.get(`/races?runs__owner__profile=${profile_id}`);
            setRaces(data)
            const now = new Date()
            setUpcoming(data.results.filter(
                (r) => now < new Date(r.date)
            ))
            setPassed(data.results.filter(
                (r) => now > new Date(r.date)
            ))
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setHasLoaded(false);
        fetchRaces();
    }, []);

    return (

        <Container>
            <Row className={styles.myRaces}>
                <Col xs={6}>

                    Your passed races
                </Col>

                <Col xs={6}>
                    Your upcoming races
                </Col>
            </Row>
            {hasLoaded ? (
                <Row>
                    <Col className={styles.passedInfo} xs={6}>

                        {passed.length ?
                            passed.map((race) => (
                                <ListRace key={race.id} {...race} setRaces={setRaces} />
                            )) : (
                                <Container className={appStyles.Content}>
                                    Your passed races will appear here.
                                </Container>
                            )}


                    </Col>

                    <Col xs={6}>
                        {hasLoaded ? (
                            <>
                                {upcoming.length ?
                                    upcoming.map((race) => (
                                        <ListRace key={race.id} {...race} setRaces={setRaces} />
                                    )) : (
                                        <Container className={appStyles.Content}>
                                            Please add some races and run with it!
                                        </Container>
                                    )}

                            </>
                        ) : (

                            <Container className={appStyles.Content}>
                                <Asset spinner />
                            </Container>
                        )}
                    </Col>
                </Row>) : (

                <Container className={appStyles.Content}>
                    <Asset spinner />
                </Container>
            )}
        </Container>
    );
}

export default RunsPage