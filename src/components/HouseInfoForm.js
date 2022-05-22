import React, {useState} from 'react'
import { Button, Checkbox, Container, Form, Header } from 'semantic-ui-react'


const HouseInfoForm = () => {

  const inputs = ["osoite", "m2", "velaton_hinta", "hoitovastike", "aiempi_keittio_remontti",
  "aiempi_kylpyhuone_remontti", "aiempi_pinta_remontti", "aiempi_putki_remontti",
  "keittio_remontti_hinta", "kylpyhuone_remontti_hinta", "pinta_remontti_hinta",
  "putki_remontti_hinta", "keittion_kayttoika", "kylpyhuoneen_kayttoika", "pinta_kayttoika",
  "putki_kayttoika"]

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

  const [result, setResult] = useState({})

  const calculateResults = (values) => {
    const keittio_korjausvelka = (2022-values.aiempi_keittio_remontti)/values.keittion_kayttoika * values.keittio_remontti_hinta
    const kylpyhuone_korjausvelka = (2022-values.aiempi_kylpyhuone_remontti)/values.kylpyhuoneen_kayttoika * values.kylpyhuone_remontti_hinta
    const pinta_korjausvelka = (2022-values.aiempi_pinta_remontti)/values.pinta_kayttoika * values.pinta_remontti_hinta
    const putki_korjausvelka = (2022-values.aiempi_putki_remontti)/values.putki_kayttoika * values.putki_remontti_hinta

    const koko_korjausvelka = keittio_korjausvelka + kylpyhuone_korjausvelka + pinta_korjausvelka + putki_korjausvelka

    console.log('koko korjausvelka', koko_korjausvelka)

    const vastike = values.hoitovastike / 100 * 30

    console.log('vastike', vastike)

    const vertailuhinta = 1 * values.velaton_hinta + koko_korjausvelka + vastike
    
    console.log('vertailuhinta', vertailuhinta)

    const vertailu_neliohinta = vertailuhinta/values.m2

    console.log('vertailu_neliohinta', vertailu_neliohinta)

    const res = {
      osoite: values.osoite,
      velaton_hinta: values.velaton_hinta,
      vertailuhinta: vertailuhinta,
      vertailu_neliohinta: vertailu_neliohinta
    }
    setResult(res)
  }


  const onSubmit = (event) => {
    event.preventDefault();
    const {target} = event;
    const values = Object.fromEntries(new FormData(target))
    setFormData(values)

    calculateResults(values) //shortcut
  }
  let formInputs = inputs.map((item, index)=>{
      return(
        <Form.Input
              label={item}
              name={item}
              value={inputs.item}
            />
      )
    })

  return (
  <Container>
    <Header as="h4" content="Lisää kiinteistön tiedot" />
    <Form onSubmit={onSubmit}>
      {formInputs}
      <Button type='submit'>Laske kiinteistön arvo</Button>
    </Form>
    <Container style={{ marginTop: "3em" }}>
      <Header as="h5" content="tulokset" />
      {<pre>{JSON.stringify(result, null, 2)}</pre>}
    </Container>
  </Container>
  )
}

export default HouseInfoForm
