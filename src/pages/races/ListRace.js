import React from "react";
import { Card, } from 'react-bootstrap';
import styles from "../../styles/ListRace.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { handleActivate, handleDeactivate } from "../../utils/utils";



const ListRace = (props) => {
    const {
        id, star_id, run_id, owner, name, distance, country, date, website, created_at, updated_at, like_id, setRaces,
    } = props;

    console.log( id, star_id, run_id, owner, name, distance, country, date,)
    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const navigate = useNavigate();

    const handleStar = async () => handleActivate('/stars/', 'star_id', id, setRaces, currentUser);
    const handleUnstar = async () => handleDeactivate('/stars/', 'star_id', star_id, id, setRaces);

    
    return (
        <Card className={styles.Race}>
            <Card.Body >
                <div className="media align-items-center justify-content-between">
                </div>
                <div className="container">
                    <div className="row">
                        <div className= {styles.raceName} onClick={() => navigate(`/races/${id}`)}>
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
                                    <FontAwesomeIcon icon="fa-solid fa-star" className={styles.Icon} />
                                </span>
                            ) : (
                                <span onClick={handleStar}>
                                    <FontAwesomeIcon icon="fa-solid fa-star" className={styles.IconOutline} />
                                </span>)}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card >

    );
};
export default ListRace