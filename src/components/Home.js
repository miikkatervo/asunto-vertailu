import React from "react";
import { Container } from "semantic-ui-react";
import HouseInfoForm from "./HouseInfoForm"

const Home = (props) => {
  return (
    <Container style={{ margin: "3em" }}>
        <HouseInfoForm />
    </Container>
  )

}

export default Home