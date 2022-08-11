import React from "react";
import { Card, } from 'react-bootstrap';
import styles from "../../styles/Race.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosRes } from '../../api/axiosDefault';
import { useCurrentUser } from "../../contexts/CurrentUserContext";



const Race = (props) => {
    const {
        id, star_id, run_id, owner, name, distance, country, date, website, created_at, updated_at, like_id, setRaces,
    } = props;

    const currentUser = useCurrentUser();

    const is_owner = currentUser?.username === owner

    const handleStar = async () => handleActivate('/stars/', 'star_id');
    const handleUnstar = async () => handleDeactivate('/stars/', 'star_id', star_id);

    const handleRun = async () => handleActivate('/runs/', 'run_id');
    const handleUnrun = async () => handleDeactivate('/runs/', 'run_id', run_id);


    const handleDeactivate = async (path, idProp, idValue) => {
        try {
            await axiosRes.delete(path + idValue);
            setRaces((prevRaces) => ({
                ...prevRaces,
                results: prevRaces.results.map((race) => {
                    let update = { ...race }
                    update[idProp] = null
                    return race.id === id
                        ? update
                        : race;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleActivate = async (path, idProp) => {
        try {
            const { data } = await axiosRes.post(path, { owner: currentUser.pk, race: id });
            setRaces((prevRaces) => ({
                ...prevRaces,
                results: prevRaces.results.map((race) => {
                    let update = { ...race }
                    update[idProp] = data.id
                    return race.id === id
                        ? update
                        : race;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };
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
                                    <FontAwesomeIcon icon="fa-solid fa-star" className={styles.Icon} />
                                </span>
                            ) : (
                                <span onClick={handleStar}>
                                    <FontAwesomeIcon icon="fa-solid fa-star" className={styles.IconOutline} />
                                </span>)}

                            {run_id ? (
                                <span onClick={handleUnrun}>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.Icon} />
                                </span>
                            ) : (
                                <span onClick={handleRun}>
                                    <FontAwesomeIcon icon="fa-solid fa-person-running" className={styles.IconOutline} />
                                </span>)}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card >

    );
};
export default Race