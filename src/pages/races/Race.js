import React from "react";
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from "../../styles/Race.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from "../../contexts/CurrentUserContext";



const Race = (props) => {
    const {
        id,  star_id, owner, name, distance, country, date, website, created_at, updated_at, like_id, setRaces,
    } = props;

    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const handleStar = async () => {
        console.log(currentUser)
        console.log({ owner: currentUser.id, race: id })
        try {
            const { data } = await axiosRes.post('/stars/', { owner: currentUser.pk, race: id });
            setRaces((prevRaces) => ({
                ...prevRaces,
                results: prevRaces.results.map((race) => {
                    return race.id === id
                        ? { ...race, star_id: data.id }
                        : race;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnstar = async () => {
        try {
            await axiosRes.delete(`/stars/${star_id}/`);
            setRaces((prevRaces) => ({
                ...prevRaces,
                results: prevRaces.results.map((race) => {
                    return race.id === id
                        ? { ...race, star_id: null }
                        : race;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Card className={styles.Race}>
            <Card.Body>
                <div className="media align-items-center justify-content-between">


                </div>
                <div className="container">
                    <div className="row">
                        <div className="NameCol col" >
                            {name}
                        </div>
                        <div className="DateCol col">
                            {new Date(date).toDateString()}
                        </div>
                        <div className="DistanceCol col">
                            {distance} k
                        </div>
                    </div>
                    <div className="row">
                        <div className="CountryCol col">
                            {country}
                        </div>

                        <div className="IconCol col">
                            {star_id ? (
                                <span onClick={handleUnstar}>
                                         <FontAwesomeIcon icon="fa-solid fa-star" className={styles.Heart}/>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.Heart}/>

                                </span>
                            ) : (
                                <span onClick={handleStar}>
                                    <FontAwesomeIcon icon="fa-solid fa-star" className={styles.HeartOutline}/>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.HeartOutline}/>
                                </span>)}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card >

    );
};
export default Race