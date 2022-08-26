import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefault";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/CommentCreateEditForm.module.css";

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
    <Form className="mt-2" >
      <Container className={styles.formBox}>
        <Form.Group>
          <Row>
            <Col className={styles.addInsp}>Add your image, more informaton, thoughts and inspire others to run this race!
            </Col>
          </Row>
          <Row >
            <Col></Col>
          </Row>
          <Row  >
            <Col xs={8} sm={9} >
              <Form.Control
                className={styles.Form}
                placeholder=""
                as="textarea"
                value={text}
                onChange={handleChange}
                rows={1}
              />
            </Col>
            <Col xs={1} className="p-0">
              <Form.Label htmlFor="image-upload">
                <FontAwesomeIcon icon="fa-regular fa-image" className={styles.IconOutline} />
              </Form.Label>
              <Form.Control type="file" id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
              <Row className={styles.addImage}> </Row>
            </Col>
            <Col xs={3} sm={2} className="p-0">
              {
                !text.trim() && !image.trim() ? (
                  <FontAwesomeIcon icon={["far", "paper-plane"]} className={styles.IconOutline} />
                ) : (
                  <FontAwesomeIcon icon="paper-plane" className={styles.IconOutline} onClick={handleSubmit} />
                )
              }
            </Col>
          </Row>
    

        </Form.Group>

      </Container>
    </Form >
  );
}
export default CommentCreateForm;