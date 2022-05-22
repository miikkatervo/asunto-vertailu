import React from "react";
import { Container, Grid } from "semantic-ui-react";

const Result = (props) => {

    let size = 20 / props.resultLen + 3
    console.log(size, props.resultLen)
    return (
        <Grid.Column>
            <Container style={{ marginTop: "1em" }}>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <span style={{fontSize: size}}>Osoite</span>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <span style={{fontSize: size}}>{props.result.osoite}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <span style={{fontSize: size}}>Velaton hinta</span>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <span style={{fontSize: size}}>{props.result.velaton_hinta}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <span style={{fontSize: size}}>Vertailuhinta</span>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <span style={{fontSize: size}}>{props.result.vertailuhinta}</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <span style={{fontSize: size}}>Vertailuneliöhinta</span>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <span style={{fontSize: size}}>{props.result.vertailu_neliohinta}</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Grid.Column>
    )

}

export default Result