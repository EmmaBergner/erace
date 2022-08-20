import React from "react";
import { Card, Col, Container, Row, } from 'react-bootstrap';
import styles from "../../styles/DetailRace.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useNavigate } from "react-router-dom";



const DetailRace = (props) => {
    const {
        id, star_id, run_id, owner, name, distance, country, date, website, owner_username, created_at, updated_at, like_id, setRace,
    } = props;

    console.log(id, star_id, run_id, owner, name, distance, country, date,)
    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const navigate = useNavigate();


    const handleStar = async () => handleActivate('/stars/', 'star_id', setRace, currentUser);
    const handleUnstar = async () => handleDeactivate('/stars/', 'star_id', star_id, setRace,);

    const handleRun = async () => handleActivate('/runs/', 'run_id', setRace, currentUser);
    const handleUnrun = async () => handleDeactivate('/runs/', 'run_id', run_id, setRace);


    const handleDeactivate = async (path, idProp, idValue, setRace) => {
        try {
            await axiosRes.delete(path + idValue);
            setRace((prevRace) => {
                let update = { ...prevRace }
                update[idProp] = null
                return update
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleActivate = async (path, idProp, setRace, currentUser) => {
        try {
            const { data } = await axiosRes.post(path, { owner: currentUser.pk, race: id });
            setRace((prevRace) => {
                let update = { ...prevRace }
                update[idProp] = data.id
                return update
            })
        } catch (err) {
            console.log(err);
        }
    };

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
                                            <FontAwesomeIcon icon="star" className={styles.StarIcon} />
                                        </span>
                                    ) : (
                                        <span onClick={handleStar}>
                                            <FontAwesomeIcon icon={["far", "star"]} className={styles.StarIconOutline} />
                                        </span>)}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={4} sm={4}> Country: </Col>
                                <Col> {country} </Col>
                            </Row>
                            <Row>
                                <Col xs={4} sm={4}> Distance: </Col>
                                <Col> {distance} k </Col>
                            </Row>

                            <Row>
                                <Col xs={4} sm={4}> Date:  </Col>
                                <Col>
                                    {new Date(date).toDateString()}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={4} sm={4}> Time:  </Col>
                                <Col>
                                    {new Date(date).toLocaleTimeString()}
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={4} sm={4} > Website: </Col>
                                <Col className={styles.websiteLink}>
                                    {website ?
                                            (<a href={"//" + website} target="_blank" > {website} </a>) : ("")}
                                    
                                </Col>
                            </Row>
                            <span className={styles.creadit}> Posted by {owner_username} at {updated_at}</span>

                        </Col>
                    </Row>
                    <Row>
                        <Col> </Col>
                        <Col xs={7} className={styles.IconCol}>
                            {run_id ? (
                                <span onClick={handleUnrun}>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.Icon} />
                                 
                                </span> 
                            ) : (
                                <span onClick={handleRun}>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.Icon} />
                                    <Col xs={12} className={styles.AttendText}> You are running!! </Col>
                                </span>)}
                              
                        </Col>
                    </Row>
                </Container>
            </Card.Body >
        </Card >

    );
};
export default DetailRace