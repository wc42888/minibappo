import React, {Component} from 'react';
import {Modal, Button, FormGroup, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {createNewInstance} from '../actions/postAction';
import '../css/createBtn.css';

class CreateInstance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      instanceName: '',
      instanceColor: '',
      instanceComments: ''
    }
  }

  close = ()=> {
    this.setState({ showModal: false });
  }

  open = ()=> {
    this.setState({ showModal: true });
  }

  submit = ()=>{
    const newInstance = {
      name: this.state.instanceName,
      color: this.state.instanceColor,
      comments: this.state.instanceComments
    }
    this.props.createNewInstance(this.props.modelName, newInstance);

    this.setState({
      instanceName:'',
      instanceColor: '',
      instanceComments: ''
    })
    this.close();
  }

  render(){
    return(
      <div className='CreateBtn'>

        <Button bsStyle="primary" bsSize="large" onClick={this.open} block>
          Create an Instance
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create an Instance<span className="glyphicon glyphicon-user"></span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup bsSize = 'large'>
                <FormControl type = 'text' placeholder='please enter the name of the instance' onChange={event=>this.setState({instanceName: event.target.value})}/>
                <FormControl type = 'text' placeholder='please enter the color of the instance' onChange={event=>this.setState({instanceColor: event.target.value})}/>
                <FormControl type = 'text' placeholder='please enter the comments of the instance' onChange={event=>this.setState({instanceComments: event.target.value})}/>
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button className='btn btn-info' onClick={this.submit}> Submit </Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>


      </div>
    )
  }
}

export default connect(null, {createNewInstance}) (CreateInstance);
