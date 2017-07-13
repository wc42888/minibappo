import React, {Component} from 'react';
import {connect} from 'react-redux';
import {displayObjects, removeAnObject, updateObject} from '../actions/action';
import {Table, Modal, Button, FormGroup, FormControl} from 'react-bootstrap';
import CreateBtn from './CreateBtn';

import '../css/ObjectsTable.css';

class ObjectsTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      id: 0,
      objectName: '',
      objectColor: '',
      objectComments: '',
      objects: []
    }
  }


  close = ()=> {
    this.setState({ showModal: false });
  }

  edit = (id)=> {
    this.setState({id, showModal: true });
  }

  displayObjects(){
    this.props.displayObjects();
  }

  componentDidMount(){
    this.displayObjects();
  }

  removeAnObject(id){
    this.props.removeAnObject(id);
  }

  updateObject(id, newName, newColor, newComments){
    this.props.updateObject(id, newName, newColor, newComments);
    this.close();
    this.setState({objectName: '',
          objectColor: '',
          objectComments: '',})
  }

  renderTable(){
    const {objectArray} = this.props;

    if(objectArray.length === 0){
      return (<div></div>)
    }else{
      const {navigation} = this.props;
      return (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>color</th>
              <th>comments</th>
              <th>Remove</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              objectArray.map(object=>{
                return (
                  <tr key={object._id}>
                    <td> {object._id} </td>
                    <td> <button className='link' onClick={()=>{navigation.navigate('PostTablePage', {key: object.key})}}> {object.name} </button></td>
                    <td> {object.color}</td>
                    <td> {object.comments}</td>
                    <td>
                      <span className='input-group-addon'>
                        <i className='glyphicon glyphicon-remove'  onClick={()=>this.removeAnObject(object._id)}></i>
                      </span>
                    </td>
                    <td>
                      <span className='input-group-addon'>
                        <i className='glyphicon glyphicon-pencil' onClick={()=>this.edit(object._id)}></i>
                      </span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      )
    }

  }

  renderModal(){
    return (
    <Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit an object<span className="glyphicon glyphicon-user"></span></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <FormGroup bsSize = 'large'>
            <FormControl type = 'text' placeholder='please enter the name of the object' onChange={event=>{this.setState({objectName: event.target.value})}}/>
            <FormControl type = 'text' placeholder='please enter the color of the object' onChange={event=>this.setState({objectColor: event.target.value})}/>
            <FormControl type = 'text' placeholder='please enter the comments of the object' onChange={event=>this.setState({objectComments: event.target.value})}/>
          </FormGroup>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button className='btn btn-info' onClick={()=>this.updateObject(this.state.id, this.state.objectName, this.state.objectColor, this.state.objectComments)}> Submit </Button>
        <Button onClick={()=>this.close()}>Close</Button>
      </Modal.Footer>
    </Modal>)
  }

  render(){
    return (
      <div>
        {this.renderTable()}
        {this.renderModal()}
        <CreateBtn />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    objectArray: state.mongoReducer
  }
}


export default connect(mapStateToProps, {displayObjects, removeAnObject, updateObject}) (ObjectsTable);
