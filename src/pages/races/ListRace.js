import React from "react";
import { Card, Col, Container, Row, } from 'react-bootstrap';
import styles from "../../styles/ListRace.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { handleActivate, handleDeactivate } from "../../utils/utils";



const ListRace = (props) => {
    const {
        id, star_id, run_id, owner, name, distance, country, date, website, created_at, updated_at, like_id, setRaces, showStar
    } = props;

    console.log(id, star_id, run_id, owner, name, distance, country, date,)
    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const navigate = useNavigate();

    const handleStar = async () => handleActivate('/stars/', 'star_id', id, setRaces, currentUser);
    const handleUnstar = async () => handleDeactivate('/stars/', 'star_id', star_id, id, setRaces);

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return (
        <Card className={styles.Race}>
            <Card.Body >
                <div className="media align-items-center justify-content-between">
                </div>

                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={5} sm={8} xs={12} className={styles.raceName} onClick={() => navigate(`/races/${id}`)}>
                                    {name}
                                </Col>

                                <Col md={3} sm={4} xs={12} className={styles.raceDistance}>
                                    {distance} k
                                </Col>

                                <Col md={4} sm={12} xs={12} className={styles.raceDate}>
                                    {new Date(date).toDateString().slice(4)}
                                </Col>
                            </Row>

                            <Row>
                                <Col className={styles.raceCountry}>
                                    {country ? regionNames.of(country.toUpperCase()) : ""}
                                </Col>
                            </Row>
                        </Col>

                        {showStar ?
                            (<Col xs={1} className={styles.raceStar}>
                                {star_id ? (
                                    <span onClick={handleUnstar}>
                                        <FontAwesomeIcon icon="star" className={styles.Icon} />
                                    </span>
                                ) : (
                                    <span onClick={handleStar}>
                                        <FontAwesomeIcon icon={["far", "star"]} className={styles.IconOutline} />
                                    </span>)}
                            </Col>)
                            :
                            null}
                    </Row>
                </Container>
            </Card.Body>
        </Card >

    );
};
export default ListRace