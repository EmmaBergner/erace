import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { useParams } from "react-router-dom";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Stack } from "react-bootstrap";
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
            try {
                const [{ data: r }, { data: c }] = await Promise.all([
                    axiosReq.get(`/races/${id}/?currentUser=${currentUser.pk}`),
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
        <Stack gap={2} className="col-md-8 mx-auto">
            <DetailRace  {...race} setRace={setRace} />
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
                <span className={styles.CommentText}>No comments yet, be the first to comment!</span>
            ) : (
                <span> No comments...yet</span>
            )}
        </Stack>
    );
}

export default RaceDetailPage;