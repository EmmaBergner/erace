import React from "react";
import { Card, Col, Container, Row, } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { handleActivate, handleDeactivate } from "../../utils/utils";
import styles from "../../styles/ListRace.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ListRace = (props) => {
    const {
        id, star_id, owner, name, distance, country, date, setRaces, showStar, padd
    } = props;

    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const navigate = useNavigate();

    const handleStar = async () => handleActivate('/stars/', 'star_id', id, setRaces, currentUser);
    const handleUnstar = async () => handleDeactivate('/stars/', 'star_id', star_id, id, setRaces);

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return (
        <Card className={styles.Race}>
            <Card.Body className={padd ? "" : "p-2"}>
                <div className="media align-items-center justify-content-between">
                </div>

                <Container>
                    <Row>
                        <Col className={padd ? "" : "p-0"} onClick={() => navigate(`/races/${id}`)}> 
                            <Row >
                                <Col md={5} sm={8} xs={12} className={styles.raceName} >
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
                                    {country}
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