import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Container,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'


// TODO: User Auth
const userToken = '';
// TODO: Config file
const apiUrl = 'http://127.0.0.1:8080/v1/';


class ConsoleSentryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          sentryList: [],
        };
      }

    componentDidMount() {
      // Get ID from URL
      const url = apiUrl + 'sentry/list?token=' + userToken;

      // Load the listing data
      axios.post(url)
        .then(res => {
          if (res.data.code===0) {
              this.setState({
                sentryList: res.data.sentries,
              });
          } else {
              console.log(res.data);
          }

        })
        .catch(err => {
          console.log(err);
        });
    }



    render() {

        const sentryCards = this.state.sentryList.map((el, index)=>{
            return (
                    <Card>
                      <Card.Content header={el.name} />
                      <Card.Content description={el.url} />
                      <Card.Content extra>
                        <Icon name='clock' />
                        Last Check: {el.lastCheckTime}
                      </Card.Content>
                    </Card>
                )
        });



        return (
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row centered>
                        <Card.Group>

                        <Card as={Link} to='/console/sentry/add'>
                          <Card.Content textAlign='center'>
                              <Icon name='add' size='big' style={{margin: '25px'}} />
                              <Card.Header>Create New Sentry</Card.Header>
                          </Card.Content>
                        </Card>

                        {sentryCards}


                        </Card.Group>



                    </Grid.Row>
                </Grid>
            </Segment>

        )
    }

}

export default ConsoleSentryList
