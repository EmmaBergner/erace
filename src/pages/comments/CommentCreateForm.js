import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefault";
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";

function CommentCreateForm(props) {
  const { race, setRace, setComments, profileImage, profile_id } = props;
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const currentUser = useCurrentUser();

  const imageInput = useRef(null);

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }


  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("owner", currentUser.pk)
      formData.append("race", race.id)
      formData.append("text", text)
      if (image != "") {
        formData.append("image", imageInput.current.files[0])
      }

      console.log(formData)
      const { data } = await axiosRes.post("/comments/", formData);
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setText("")
      setImage("")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Container>
        <Form.Group>
          <Row className={styles.addInsp}>  inspire others to run this race! </Row>
          <Row>

            <Col xs={3}>
              <Form.Label htmlFor="image-upload">
                <FontAwesomeIcon icon="fa-regular fa-image" />
              </Form.Label>
              <Form.Control type="file" id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
              <Row className={styles.addImage}> Add your image </Row>
            </Col>
            <Col></Col>
          </Row>

          <Row >
            <Col xs={2} />
            <InputGroup>
              <Form.Control
                className={styles.Form}
                placeholder="My comment..."
                as="textarea"
                value={text}
                onChange={handleChange}
                rows={1}
              />
            </InputGroup>

          </Row>


          <button
            className={`${btnStyles.Button}  ${btnStyles.Bright} btn d-block ml-auto`}
            disabled={!text.trim() && !image.trim()}
            type="submit"
          >
            Post
          </button>

        </Form.Group>
      </Container>
    </Form >
  );
}
export default CommentCreateForm;