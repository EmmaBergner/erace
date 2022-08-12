import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/RacesPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Race from "./Race.js";
import { useNavigate } from "react-router-dom";


function RacesPage({ message, filter = "" }) {

    const [races, setRaces] = useState({ results: [] });

    const [hasLoaded, setHasLoaded] = useState(false);

    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    const [country, setCountry] = useState("")

    const [starOnly, setStarOnly] = useState(false)

    const [upcoming, setUpcoming] = useState(false)

    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/races/create`)
    }


    const fetchRaces = async () => {
        try {
            const filter = starOnly ? 'stars__owner__profile=3&' : ''
            const { data } = await axiosReq.get(`/races/?${filter}search=${country}`);
            if (upcoming) {
                data.results = filterUpcoming(data.results)
            }
            setRaces(data)
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    const filterUpcoming = (allRaces) => {
        
        const anwser = []
        for (let i = 0; i < allRaces.length; i++) {
            const race = allRaces[i];

            anwser.push(race)
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
    }, [filter, query, pathname]);


    useEffect(() => {
        setHasLoaded(false);
        fetchRaces();
    }, [country, starOnly, upcoming]);

    // EM Ta bort Row och Col om dom inte behövs.
    return (
        <> <button
            className={styles.Button}
            onClick={() => handleCreate()}
            type="button"
        >
            Add race
        </button>

            <Row className="h-100">
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <i className={`fas fa-search ${styles.SearchIcon}`} />

                    <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                        <Form.Control type="text" value={country} onChange={(event) => setCountry(event.target.value)} className="mr-sm-2" placeholder="Search country" />
                        <Form.Check type="checkbox" value={starOnly} onChange={(event) => setStarOnly(!starOnly)} className="mr-sm-2" label="Liked" />
                        <Form.Check type="checkbox" value={upcoming} onChange={(event) => setUpcoming(!upcoming)} className="mr-sm-2" label="Upcoming" />
                    </Form>


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
        </>);
}

export default RacesPage;