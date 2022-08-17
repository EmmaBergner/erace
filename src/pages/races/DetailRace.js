import React from "react";
import { Card, Col, Container, Row, } from 'react-bootstrap';
import styles from "../../styles/DetailRace.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { handleActivate, handleDeactivate } from "../../utils/utils";



const DetailRace = (props) => {
    const {
        id, star_id, run_id, owner, name, distance, country, date, website, created_at, updated_at, like_id, setRaces,
    } = props;

    console.log(id, star_id, run_id, owner, name, distance, country, date,)
    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const navigate = useNavigate();


    const handleStar = async () => handleActivate('/stars/', 'star_id', id, setRaces, currentUser);
    const handleUnstar = async () => handleDeactivate('/stars/', 'star_id', star_id, id, setRaces,);

    const handleRun = async () => handleActivate('/runs/', 'run_id', id, setRaces, currentUser);
    const handleUnrun = async () => handleDeactivate('/runs/', 'run_id', run_id, id, setRaces);


    return (
        <Card className={styles.Race}>
            <Card.Body >
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <span className={styles.raceName} onClick={() => navigate(`/races/${id}`)}>
                                        {name}
                                    </span>
                                    {star_id ? (
                                        <span onClick={handleUnstar}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" className={styles.heartIcon} />
                                        </span>
                                    ) : (
                                        <span onClick={handleStar}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" className={styles.heartIconOutline} />
                                        </span>)}
                                </Col>
                            </Row>

                            <Row>
                                <Col>Country:
                                    {country}
                                </Col>
                            </Row>
                            <Row>
                                <Col> Distance:
                                    {distance} k
                                </Col>
                            </Row>
                            <Col>
                                <Row> Date:
                                    {new Date(date).toDateString()}
                                    {new Date(date).toLocaleTimeString()}
                                </Row>
                            </Col>
                            <Row>
                                <Col className= {styles.websiteLink}> Official website:
                                    {website}
                                </Col>
                            </Row>
                            <span className={styles.createdDate}> Created: {updated_at}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col> </Col>
                        <Col xs={1} className={styles.IconCol}>
                            {run_id ? (
                                <span onClick={handleUnrun}>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.Icon} />
                                </span>
                            ) : (
                                <span onClick={handleRun}>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.IconOutline} />
                                </span>)}

                        </Col>
                    </Row>

                </Container>
            </Card.Body >
        </Card >

    );
};
export default DetailRace