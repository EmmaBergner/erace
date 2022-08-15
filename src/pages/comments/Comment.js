
import styles from "../../styles/Comment.module.css";
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useNavigate } from "react-router-dom";
import { axiosRes } from '../../api/axiosDefault';
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";


const Comment = (props) => {

    const {
        id,
        text,
        image,
        owner_username,
        profile_id,
        profile_image,
        updated_at,
        setComments,
    } = props;

    const currentUser = useCurrentUser();

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((c) => c.id != id)
            }));
        }
        catch (err) { console.log(err) }
    };


    return (
        <div>
            <hr />

            <div className='media'>

                {/* <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={30} />
                </Link> */}

                <div className="media-body align-self-center ml-2">
                    <span className={styles.Owner}>{owner_username}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    <p>{text}</p>
                </div>
                {console.log("image", image)}
                <Card>
                    <Card.Img src={image} />
                </Card>

                <Button onClick={handleDelete}>Delete</Button>
            </div>

        </div>

    )
}

export default Comment