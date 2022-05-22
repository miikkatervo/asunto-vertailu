import React, {useState} from 'react'
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react'
import Result from './Result'


const HouseInfoForm = () => {

  const inputs = [["Osoite","osoite"], ["Neliömäärä","m2"], ["Velaton hinta", "velaton_hinta"], 
  ["Hoitovastike", "hoitovastike"], ["Aiempi keittiön remonttivuosi", "aiempi_keittio_remontti"],
  ["Aiempi kylpyhuoneen remonttivuosi", "aiempi_kylpyhuone_remontti"], 
  ["Aiempi pintojen remonttivuosi", "aiempi_pinta_remontti"], ["Aiempi putkien remonttivuosi", "aiempi_putki_remontti"],
  ["Keittiöremontin hinta", "keittio_remontti_hinta"], ["Kylpyhuoneremontin hinta", "kylpyhuone_remontti_hinta"],
  ["Pintaremontin hinta","pinta_remontti_hinta"],
  ["Putkiremontin hinta", "putki_remontti_hinta"], ["Keittiön käyttöaika", "keittion_kayttoika"], 
  ["Kylpyhuoneen käyttöaika","kylpyhuoneen_kayttoika"], ["Pintojen käyttöaika", "pinta_kayttoika"],
  ["Putkien käyttöaika","putki_kayttoika"]]

  const [formData, setFormData] = useState({
    osoite: "",
    m2: 0, 
    velaton_hinta: 0, 
    hoitovastike: 0, 
    aiempi_keittio_remontti: 0,
    aiempi_kylpyhuone_remontti: 0, 
    aiempi_pinta_remontti: 0, 
    aiempi_putki_remontti: 0,
    keittio_remontti_hinta: 0, 
    kylpyhuone_remontti_hinta: 0, 
    pinta_remontti_hinta: 0,
    putki_remontti_hinta: 0, 
    keittion_kayttoika: 0, 
    kylpyhuoneen_kayttoika: 0, 
    pinta_kayttoika: 0,
    putki_kayttoika: 0
  })

  const [results, setResults] = useState([])

  const calculateResults = (values) => {
    const keittio_korjausvelka = (2022-values.aiempi_keittio_remontti)/values.keittion_kayttoika * values.keittio_remontti_hinta
    const kylpyhuone_korjausvelka = (2022-values.aiempi_kylpyhuone_remontti)/values.kylpyhuoneen_kayttoika * values.kylpyhuone_remontti_hinta
    const pinta_korjausvelka = (2022-values.aiempi_pinta_remontti)/values.pinta_kayttoika * values.pinta_remontti_hinta
    const putki_korjausvelka = (2022-values.aiempi_putki_remontti)/values.putki_kayttoika * values.putki_remontti_hinta

    const koko_korjausvelka = keittio_korjausvelka + kylpyhuone_korjausvelka + pinta_korjausvelka + putki_korjausvelka
    const vastike = values.hoitovastike / 100 * 30
    const vertailuhinta_exact = 1 * values.velaton_hinta + koko_korjausvelka + vastike
    const vertailuhinta = Math.round(vertailuhinta_exact * 100) / 100

    const vertailu_neliohinta_exact = vertailuhinta/values.m2
    const vertailu_neliohinta = Math.round(vertailu_neliohinta_exact * 100) / 100


    const res = {
      osoite: values.osoite,
      velaton_hinta: values.velaton_hinta,
      vertailuhinta: vertailuhinta,
      vertailu_neliohinta: vertailu_neliohinta
    }

    if (values.osoite !== "" && !isNaN(values.velaton_hinta) && !isNaN(vertailuhinta) && !isNaN(vertailu_neliohinta) &&
       results.length < 4) setResults(results.concat(res)) 
  }


  const onSubmit = (event) => {
    event.preventDefault();
    const {target} = event;
    const values = Object.fromEntries(new FormData(target))
    setFormData(values)

    calculateResults(values)
  }
  let formInputs = inputs.map((item, index)=>{
      return(
        <Form.Input
              label={item[0]}
              name={item[1]}
              value={inputs.item}
            />
      )
    })

  return (
  <Container style={{ marginTop: "3em" }}>
    <Header as="h3" content="Lisää kiinteistön tiedot" />
    <Form onSubmit={onSubmit} style={{ marginTop: "2em" }}>
      {formInputs}
      <Button type='submit' style={{ marginTop: "1em" }} >Laske kiinteistön arvo</Button>
    </Form>
  
    <Container style={{ marginTop: "3em" }}>
      <Header as="h5" content="Tulokset" />
      <Grid>
        <Grid.Row columns={results.length === 0 ? 1 : results.length}>
          {results.map(res => 
            <Result key={res.id} result={res} resultLen={results.length} />
          )}
        </Grid.Row>
      </Grid>
    </Container>
  </Container>
  )
}

export default HouseInfoForm
