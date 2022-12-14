import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/RaceListPage.module.css";
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Asset";
import ListRace from "./ListRace.js";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const RaceListPage = () => {

    const [races, setRaces] = useState({ results: [] });

    const [hasLoaded, setHasLoaded] = useState(false);

    const [country, setCountry] = useState("")

    const [starOnly, setStarOnly] = useState(false)

    const [upcoming, setUpcoming] = useState(false)

    const currentUser = useCurrentUser();

    const profile_id = currentUser?.profile_id || "";

    const fetchRaces = async () => {
        try {
            const filter = starOnly ? `stars__owner__profile=${profile_id}&` : ''
            const { data } = await axiosReq.get(`/races/?${filter}currentUser=${currentUser.pk}&search=${country}`);
            if (upcoming) {
                data.results = filterUpcoming(data.results)
            }
            data.results.sort((r1, r2) => r1.date.localeCompare(r2.date))
            setRaces(data)
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    const filterUpcoming = (allRaces) => {
        const now = new Date()
        const anwser = []
        for (let i = 0; i < allRaces.length; i++) {
            const race = allRaces[i];

            let optionDate = new Date(race.date);
            if (now < optionDate) {
                anwser.push(race)
            }
        }
        return anwser
    }

    useEffect(() => {
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchRaces();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [country]);


    useEffect(() => {
        setHasLoaded(false);
        fetchRaces();
        // eslint-disable-next-line
    }, [starOnly, upcoming, currentUser]);

    return (

        <>
            <Container>
                <Row className={styles.SearchInfo}> Search on country, find races you've liked, and exclude passed races. </Row>

                <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                    <Container>
                        <Row>
                            <Col md={4} xs={12}>
                                <Form.Control type="text" value={country} onChange={(event) => setCountry(event.target.value)} />
                            </Col>
                            <Col md={2} xs={6}>
                                <Form.Check type="checkbox" value={starOnly} onChange={(event) => setStarOnly(!starOnly)} label="Liked Races" className={styles.Checkbox} />
                            </Col>
                            <Col md={2} xs={6}>
                                <Form.Check type="checkbox" value={upcoming} onChange={(event) => setUpcoming(!upcoming)} label="Upcoming Races" className={styles.Checkbox} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}> <hr></hr></Col></Row>
                    </Container>
                </Form>

                <Row className="h-100">
                    <Col md={8}>
                        {hasLoaded ? (
                            <>
                                {races.results.length ?
                                    races.results.map((race) => (
                                        <ListRace key={race.id} {...race} setRaces={setRaces} showStar padd />
                                    )
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
            </Container>

        </>
    );
};

export default RaceListPage;