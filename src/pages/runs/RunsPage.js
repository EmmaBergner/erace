import React, { useRef, useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/HomePage.module.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Race from "../races/Race.js";


function RunsPage({ message, filter = "" }) {
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(5000);
    const intervalRef = useRef(); // Add a ref to store the interval id
    const [hasLoaded, setHasLoaded] = useState(false);
    const [nextRace, setNextRace] = useState(null)
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    const [races, setRaces] = useState({ results: [] });

    const fetchRaces = async () => {
        try {
            const { data } = await axiosReq.get(`/races?runs__owner__profile=${profile_id}`);
            setRaces(data)

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

        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>

                {hasLoaded ? (
                    <>
                        {races.results.length ? (
                            <InfiniteScroll
                                children={
                                    races.results.map((race) => (
                                        <Race key={race.id} {...race} setRaces={setRaces} />
                                    ))
                                }
                                dataLength={races.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!races.next}
                                next={() => fetchMoreData(races, setRaces)}
                            />
                        ) : (
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
        </Row>
    );
}

export default RunsPage