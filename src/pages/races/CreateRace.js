import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container, Alert, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/UseRedirect";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/CreateRace.module.css";
import btnStyles from "../../styles/Button.module.css";


function CreateRace() {
  useRedirect('loggedOut')
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const currentUser = useCurrentUser();

  const [raceData, setRaceData] = useState({ name: "", date: "", time: "", distance: "", country: "", website: "", });

  const { name, date, time, distance, country, website, } = raceData;

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log("event >>> " + event)
    setRaceData({
      ...raceData,
      [event.target.name]: event.target.value,
    });
  };


  const creating = id == null

  useEffect(() => {
    const handleMount = async () => {
      try {
        if (creating) { return }
        const { data } = await axiosReq.get(`/races/${id}`)
        setRaceData({
          ...data,
          date: data.date.slice(0, 10),
          time: data.date.slice(11, 19)
        });
      } catch (err) {
        console.log(err)
      }
    };
    handleMount();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date + "T" + time);
      formData.append("distance", distance);
      formData.append("country", country);
      formData.append("website", website);
      formData.append("owner", currentUser.pk);
      creating
        ? await axiosReq.post('/races/', formData)
        : await axiosReq.put(`/races/${id}/`, formData);
      navigate(creating ? '/races/' : -1)
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  const textFields = (
    <Container className={styles.InputForm}>
      <div className="text-center">
        <Form.Group controlId="name">
          <Form.Label>Race name:</Form.Label>
          <Form.Control className={styles.Input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Stockholm Halfmarathon"
          />
          {errors.name?.map((message, idx) =>
            <Alert variant="warning" key={idx}>{message}</Alert>)}

          <Form.Label>Country:</Form.Label>
          <Form.Control className={styles.Input}
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            placeholder="Sweden"
          />
          {errors.country?.map((message, idx) =>
            <Alert variant="warning" key={idx}>{message}</Alert>)}

          <Form.Label>Date:</Form.Label>
          <Form.Control className={styles.Input}
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />
          {errors.date ?
            (<Alert variant="warning">This field may not be blank.</Alert>)
            : null
          }

          <Form.Label>Time:</Form.Label>
          <Form.Control className={styles.Input}
            type="time"
            name="time"
            value={time}
            onChange={handleChange}
          />
          {errors.date ?
            (<Alert variant="warning">This field may not be blank.</Alert>)
            : null
          }

          <Form.Label>Kilometers:</Form.Label>
          <Form.Control className={styles.Input}
            type="number"
            name="distance"
            value={distance}
            onChange={handleChange}
            placeholder="21"
          />
          {errors.distance?.map((message, idx) =>
            <Alert variant="warning" key={idx}>{message}</Alert>)}

          <Form.Label>Official website:</Form.Label>
          <Form.Control className={styles.Input}
            type="text"
            name="website"
            value={website}
            onChange={handleChange}
            placeholder="www.stockholmhalvmarathon.se/"
          />
          {errors.website?.map((message, idx) =>
            <Alert variant="warning" key={idx}>{message}</Alert>)}

        </Form.Group>
        <Button variant="light" className={`${btnStyles.Button} ${btnStyles.Spacer}`} onClick={() => { navigate(-1) }} >
          Cancel
        </Button>
        <Button variant="light" className={`${btnStyles.Button} ${btnStyles.Spacer}`} type="submit">
          {creating ? "Create" : "Save"}
        </Button>
      </div>
    </Container>
  );

  return (creating ? (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={4}>

          <p>
            Enter details about your upcoming race and add it to the database!
          </p>
          <p>
            But please before adding a new race, go to Races and make sure it hasn't been added already.
          </p>
          <p>
            (All fields are required)
          </p>
        </Col>
        <Col md={5} lg={4}>
          <Container>{textFields}
          </Container>
        </Col>
      </Row>
    </Form>

  ) : (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={4}>
          <p>
            You can edit this race to correct errors.
          </p>
          <p>
            But please do not change it into another race since that will upset your fellow users.
          </p>
        </Col>
        <Col md={5} lg={4}>
          <Container>
            {textFields}


          </Container>
        </Col>


      </Row>

    </Form>
  ));
}

export default CreateRace;