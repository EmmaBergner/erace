import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefault";
import { useParams } from "react-router-dom";
import ListRace from "./ListRace";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import DetailRace from "./DetailRace";
import styles from "../../styles/RaceDetailPage.module.css";

function RaceDetailPage() {

    const { id } = useParams();
    const [race, setRace] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            console.log(">>> 2")
            try {
                const [{ data: r }, { data: c }] = await Promise.all([
                    axiosReq.get(`/races/${id}`),
                    axiosReq.get(`/comments/?race=${id}`)
                ])

                setRace(r);
                setComments(c);
            } catch (err) {
                console.log(err)
            }
        };
        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <DetailRace {...race} setRace={setRace}/>
                <Container>
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            race={race}
                            setRace={setRace}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "comments"
                    ) : ""}

                    {comments.results.length ? (
                        <InfiniteScroll
                            children={
                                comments.results.map(comment => (
                                    <Comment key={comment.id} {...comment} setComments={setComments} />
                                ))
                            }
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>No comments yet, be the first to comment!</span>
                    ) : (
                        <span> No comments...yet</span>
                    )}
                </Container>
            </Col>

        </Row>
    );
}

export default RaceDetailPage;