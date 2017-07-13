import React, {Component} from 'react';
import {Modal, Button, FormGroup, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {createNewObject, displayObjects} from '../actions/action';
import '../css/createBtn.css';

class CreateBtn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      objectName: ''
    }
  }

  close = ()=> {
    this.setState({ showModal: false });
  }

  open = ()=> {
    this.setState({ showModal: true });
  }

  submit = ()=>{
    this.props.createNewObject(this.state.objectName);

    this.close();
  }

  render(){
    return(
      <div className='CreateBtn'>

        <Button bsStyle="primary" bsSize="large" onClick={this.open} block>
          Create an Object
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create an object<span className="glyphicon glyphicon-user"></span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup bsSize = 'large'>
                <FormControl type = 'text' placeholder='please enter the name of the object' onChange={event=>this.setState({objectName: event.target.value})}/>
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

export default connect(null, {createNewObject,displayObjects}) (CreateBtn);
