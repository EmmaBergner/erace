import React, { useState, useEffect } from 'react'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Asset";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container"
import ListRace from "../races/ListRace.js";
import appStyles from "../../App.module.css";
import styles from "../../styles/RunsPage.module.css";


function RunsPage() {
    const [hasLoaded, setHasLoaded] = useState(false);

    const currentUser = useCurrentUser();

    const profile_id = currentUser?.profile_id || "";

    const [passed, setPassed] = useState([]);

    const [upcoming, setUpcoming] = useState([]);

    const fetchRaces = async () => {
        try {
            const { data } = await axiosReq.get(`/races?runs__owner__profile=${profile_id}`);
            const now = new Date()
            const u = data.results.filter((r) => now < new Date(r.date))
            u.sort((r1, r2) => r1.date.localeCompare(r2.date))
            setUpcoming(u)
            const p = data.results.filter((r) => now > new Date(r.date))
            p.sort((r1, r2) => - r1.date.localeCompare(r2.date))
            setPassed(p)
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setHasLoaded(false);
        if (currentUser) fetchRaces();
        // eslint-disable-next-line
    }, [currentUser]);

    return (
        <Container >
            <div className={styles.userLogo}>{currentUser?.username}</div>
            {
                passed.length > 0 || upcoming.length > 0 ? null
                    :
                    (<>
                        <p className={styles.runsText}>
                            You currently haven’t selected any races to be run, or that you have run. Once you do,
                            this page will show them.</p>

                        <p className={styles.runsText}> To select a race, go to “Races” and click the name of a race to go to the Race page.
                            There, just click the running man icon. That race will then appear next time you visit this page.</p>
                    </>)
            }

            <Row className={styles.myRaces}>
                <Col xs={6} className="p-0" >
                    Passed
                </Col>

                <Col xs={6} className="p-0">
                    Upcoming
                </Col>
            </Row>

            {hasLoaded ? (
                <Row className="p-2" >
                    <Col xs={6} className={styles.passedInfo}>
                        {passed.length ?
                            passed.map((race) => (
                                <ListRace key={race.id} {...race} />
                            )) : (
                                <Container className={appStyles.Content}>
                                    Your passed races will appear here.
                                </Container>
                            )}
                    </Col>
                    <Col xs={6} >
                        {upcoming.length ?
                            upcoming.map((race) => (
                                <ListRace key={race.id} {...race} />
                            )) : (
                                <Container className={appStyles.Content}>
                                    Your upcoming races will appear here.
                                </Container>
                            )}
                    </Col>

                </Row>
            ) : (
                <Container className={appStyles.Content}>
                    <Asset spinner />
                </Container>
            )}
        </Container>
    );
}

export default RunsPage