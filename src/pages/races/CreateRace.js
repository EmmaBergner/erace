import React, { useState } from "react";
import { Form, Button, Col, Container, Alert, Card, Row } from "react-bootstrap";
import styles from "../../styles/CreateRace.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/UseRedirect";

function CreateRace() {
  useRedirect('loggedOut')
  const [errors, setErrors] = useState({});

  const [raceData, setRaceData] = useState({ name: "", date: "", time: "", distance: "", country: "", website: "", });

  const { name, date, time, distance, country, website, } = raceData;

  const navigate = useNavigate();

  const handleChange = (event) => {
    setRaceData({
      ...raceData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    console.log('---> handleSubmit name , date, distance, country, website):', name, date + "T" + time, distance, country, website)
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date + "T" + time);
      formData.append("distance", distance);
      formData.append("country", country);
      formData.append("website", website);
      formData.append("owner", 1); // EB bug hårdkod
      console.log('---> handleSubmit formData', formData)
      await axiosReq.post('/races/', formData);

      console.log('---> navigate to races')
      navigate("/races")
    } catch (err) {
      console.log('---> handleSubmit error', err)
      console.log('---> handleSubmit error', err.response)
      console.log('---> handleSubmit error', err.response?.data)
      setErrors(err.response?.data)
    }
  }

  const textFields = (

    <div className="text-center">
      <Form.Group controlId="name">
        <Form.Label>Race name:</Form.Label>
        <Form.Control className={styles.Input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        // placeholder="Stockholm Halfmarathon"
        />
        <Form.Label>Country:</Form.Label>
        <Form.Control className={styles.Input}
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
        // placeholder="Sweden"
        />
        <Form.Label>Date:</Form.Label>
        <Form.Control className={styles.Input}
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <Form.Label>Time:</Form.Label>
        <Form.Control className={styles.Input}
          type="time"
          name="time"
          value={time}
          onChange={handleChange}
        />
        <Form.Label>Distance:</Form.Label>
        <Form.Control className={styles.Input}
          type="number"
          name="distance"
          value={distance}
          onChange={handleChange}
        // placeholder="21.1 K"
        />
        <Form.Label>Official website:</Form.Label>
        <Form.Control className={styles.Input}
          type="text"
          name="website"
          value={website}
          onChange={handleChange}
        // placeholder="www.stockholmhalvmarathon.se/"

        />
      </Form.Group>
      {errors.name?.map((message, idx) =>
        <Alert variant="warning" key={idx}>{message}</Alert>)}

      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} onClick={() => { }} >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </div>

  );

  return (

    <Form onSubmit={handleSubmit}>
      <Row>
      <Col  md={4}>
          Please enter details about your race!

          Before adding your race, go to Races and to see if it's not added already.All feilds are requierd...
        </Col>
        <Col md={5} lg={4}>
          <Container>{textFields}

          </Container>
        </Col>

       
      </Row>
    </Form>
  );
}

export default CreateRace;