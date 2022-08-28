import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useNavigate } from "react-router-dom";
import { axiosRes } from '../../api/axiosDefault';
import React from "react";
import { Card, Col, Container, Row, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
    const {
        id,
        text,
        image,
        owner_username: ownerUsername,
        updated_at,
        setComments,
    } = props;

    const currentUser = useCurrentUser();

    const isOwner = currentUser?.username === ownerUsername

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
        <Card className={styles.Comment}>
            <Card.Body className='p-3'>
                <Container>
                    <Row>
                        <Col>
                            <Card.Img src={image} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.Text}>
                            {text}
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.Credit}>
                            Posted by {ownerUsername} at {updated_at}
                        </Col>

                        <Col xs={2} onClick={handleDelete} className={styles.Trash}>
                            {isOwner ? (
                                <FontAwesomeIcon icon="fa-regular fa-trash-can" size="1x" />
                            )
                                :
                                null}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>


    )
}

export default Comment