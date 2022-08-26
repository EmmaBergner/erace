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
        if (currentUser) fetchRaces();
    }, [currentUser]);

    return (

        <Container >
            <h1 className='text-center'>{currentUser.username}</h1>
            <Row className={styles.myRaces}>
                <Col xs={6} className="p-0" >

                    Your passed races
                </Col>

                <Col xs={6} className="p-0">
                    Your upcoming races
                </Col>
            </Row>
            {hasLoaded ? (
                <Row className="p-2" >
                    <Col  xs={6} className={styles.passedInfo}>

                        {passed.length ?
                            passed.map((race) => (
                                <ListRace key={race.id} {...race}  />
                            )) : (
                                <Container className={appStyles.Content}>
                                    Your passed races will appear here.
                                </Container>
                            )}
                    </Col>
               
                    <Col xs={6} >

                        {upcoming.length ?
                            upcoming.map((race) => (
                                <ListRace key={race.id} {...race}  />
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