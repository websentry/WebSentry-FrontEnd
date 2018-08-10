import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Container,
  Card,
  Divider,
  Dimmer,
  Dropdown,
  Grid,
  Header,
  Input,
  Icon,
  Image,
  List,
  Menu,
  Tab,
  Form,
  Radio,
  Label,
  Responsive,
  Select,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';


// TODO: User Auth
const userToken = '';
// TODO: Config file
const apiUrl = 'http://127.0.0.1:8080/v1/';


class ConsoleSentryCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
          stage: 0,
          inputUrl: "",
          screenshotUrl: "https://react.semantic-ui.com/images/wireframe/image.png",
          screenshotHeight: 0,
          screenshotWidth: 0,
          crop: {
              x: 20,
              y: 10,
              width: 30,
              height: 10
          },
        notificationList: [],
        sentryName: "",
        notificationId: "",
        complete: false
        };

        this.urlClick = this.urlClick.bind(this);
        this.createClick = this.createClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
          this.setState({ [event.target.name]: event.target.value });
      }

      componentDidMount() {

        console.log('notifications');
        const url = apiUrl + 'notification/list?token=' + userToken;

        axios.post(url)
          .then(res => {
            if (res.data.code===0) {
                let arr = [];
                res.data.notifications.forEach(function(entry) {
                    let name = entry.name;
                    if (name=='--default--') {
                        name = 'Default email'
                    }
                    arr.push({value: entry._id, text: name });
                });
                this.setState({notificationList: arr});
            } else {
                console.log(res.data);
            }

          })
          .catch(err => {
            console.log(err);
          });
      }

    urlClick() {
        const url = apiUrl + 'sentry/request_full_screenshot?url='+this.state.inputUrl+'&token=' + userToken;
        console.log(url);
        axios.post(url)
          .then(res => {
            if (res.data.code===0) {
                this.longPolling(res.data.taskId);
                this.setState({stage:1});
            } else {
                console.log(res.data);
            }

          })
          .catch(err => {
            console.log(err);
          });
    }

    longPolling(tid) {
        const url = apiUrl + 'sentry/wait_full_screenshot?taskid='+tid+'&token=' + userToken;

        axios.post(url)
          .then(res => {
            if (res.data.code===0) {
                if (res.data.complete===true) {
                    this.setScreenshot(tid);
                } else {
                    // keep doing
                    this.longPolling(tid);
                }
            } else {
                console.log(res.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
    }


    setScreenshot(tid) {
        const url = apiUrl + 'sentry/get_full_screenshot?taskid='+tid+'&token=' + userToken;
        console.log(url);
        this.setState({screenshotUrl: url});
    }

    createClick() {
        console.log(this.state);
        axios.request({
            url: apiUrl + 'sentry/create',
            method: 'post',
            params: {
                url: this.state.inputUrl,
                name: this.state.sentryName,
                notification: this.state.notificationId,
                x: Math.round(this.state.crop.x * this.state.screenshotWidth/100),
                y: Math.round(this.state.crop.y * this.state.screenshotHeight/100),
                width: Math.round(this.state.crop.width * this.state.screenshotWidth/100),
                height: Math.round(this.state.crop.height * this.state.screenshotHeight/100),
                token: userToken
            }
        }).then(res => {
            if (res.data.code===0) {
                this.setState({complete: true});
            } else {
                console.log(res.data);
            }

          })
          .catch(err => {
            console.log(err);
          });

    }



    render() {
        if(this.state.complete) {
              return <Redirect to="/console"/>
         }


        const panes = [
            { menuItem: 'Select one', render: () =>
                <Tab.Pane attached={false}>
                    <Dropdown
                        placeholder='Select Notification Setting'
                        fluid selection
                        options={this.state.notificationList}
                        onChange={(evt, data) => { this.setState({notificationId: data.value})}}
                    />
                </Tab.Pane> },
            /* create new notification */
            /*{ menuItem: 'Create new', render: () =>
                <Tab.Pane attached={false}>
                    <Form.Field>
                      <Label pointing='below'>{'Notification Name'}</Label>
                      <Input
                          type='text' size='large'
                          placeholder='My Notification'
                          />
                      <Divider hidden />
                      <Form.Field>
                          <Label pointing='below'>{'Method'}</Label>
                          <Form.Field>
                          <Radio
                            label='Server Chan'
                            name='radioGroup'
                            value='serverchan'
                            checked={true}
                          />
                          </Form.Field>
                      </Form.Field>
                          <Label pointing='below'>{'SCKey'}</Label>
                          <Input
                              type='text' size='large'
                              placeholder='...'
                              />
                    </Form.Field>
                </Tab.Pane> },*/
        ]

        return (

            <Grid padded>

            <Grid.Row centered>
            <Grid.Column width={12}>
            <Segment>
             <Header as='h1'>Create Sentry</Header>
             <Divider />
            <Form>
            <Form.Field>
              <Label pointing='below'>Please enter a url</Label>
              <Input
                  onChange={(evt) => { this.setState({inputUrl: evt.target.value}) }}
                  disabled={this.state.stage!=0}
                  type='text' size='large'
                  placeholder='https://www.google.com/'
                  action={{ content: 'Start', onClick: this.urlClick }}
                  />
            </Form.Field>
            </Form>
            </Segment>

                <Dimmer.Dimmable as={Segment} blurring dimmed={this.state.stage===0}>
                <Form>
                <Form.Field>
                  <Label pointing='below'>Please enter a name</Label>
                  <Input
                      type='text' size='large'
                      placeholder='My Sentry'
                      onChange={(evt) => { this.setState({sentryName: evt.target.value}) }}
                      />
                </Form.Field>
                <ReactCrop
                    src={this.state.screenshotUrl}
                    crop={this.state.crop}
                    onChange = {(crop) => {this.setState({ crop });}}
                    onImageLoaded = {(image) => { this.setState({ screenshotHeight: image.height, screenshotWidth: image.width });}}
                />
                <Divider />
                <Header as='h3'>Notification method</Header>
                <Tab menu={{ pointing: true }} panes={panes} />
                </Form>
                </Dimmer.Dimmable>

                <Button color='green' size='huge' onClick={this.createClick}>Create</Button>



            </Grid.Column>
            </Grid.Row>
            </Grid>

        )
    }

}

export default ConsoleSentryCreate
