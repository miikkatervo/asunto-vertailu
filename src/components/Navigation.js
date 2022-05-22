import React from "react"
import { Link, Routes, Route } from "react-router-dom"
import Home from "./Home"
import { Menu } from "semantic-ui-react"
import styled from "styled-components"

const Navigation = (props) => {
  
  return (
    <div>
      <Title>Asuntojen vertailu</Title>
      <Menu>
        <Menu.Item as={Link} to="/" name="Home" />
      </Menu>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </div>
  )

}

const Title = styled.h2`
  font-family: 'Roboto Mono', monospace;
`

export default Navigation