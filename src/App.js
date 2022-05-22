import React from 'react';
import Navigation from "./components/Navigation"
import { Container } from "semantic-ui-react"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <Container style={{ margin: "3em" }}>
        <Router>
          <Navigation />
        </Router>
      </Container>
  );
}

export default App;