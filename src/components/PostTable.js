import React, {Component} from 'react';
import {Table, Modal, Button, FormGroup, FormControl} from 'react-bootstrap';
import {displayInstances, removeAnInstance, updateInstance} from '../actions/postAction';
import {connect} from 'react-redux';
import CreateInstance from './CreateInstance'


class PostTable extends Component {

  constructor(props){
    super(props);

    this.state={
      showModal: false,
      instanceId: 0,
      instanceName: '',
      instanceColor: '',
      instanceComments: '',
      instances:[]
    }
  }

  componentDidMount(){
    this.props.displayInstances(this.props.navigation.state.params.key);

  }

  removeAnInstance(modelName, id){
    this.props.removeAnInstance(modelName, id)
  }

  close = ()=> {
    this.setState({ showModal: false });
  }

  edit(id){
    this.setState({instanceId:id, showModal: true });
  }

  updateInstance(modelName, id, name, color, comments){
    const newInstance = {
      id,
      name,
      color,
      comments
    };

    this.props.updateInstance(modelName, newInstance);
    this.close();
    this.setState({
      instanceId: '',
      instanceName: '',
      instanceColor: '',
      instanceComments: '',
    })

  }

  render(){
    const {instancesArray} = this.props
    const {key} = this.props.navigation.state.params

    return(
      <div>
        <Table striped bordered condensed hover>
          <caption>{`all instance of ${key}`}</caption>
          <thead>
            <th>id</th>
            <th>name</th>
            <th>color</th>
            <th>comments</th>
            <th>remove</th>
            <th>edit</th>
          </thead>
          <tbody>
            {
              instancesArray.map(instance=>{
                return(
                  <tr key={instance.id}>
                    <td>{instance.id}</td>
                    <td>{instance.name}</td>
                    <td>{instance.color}</td>
                    <td>{instance.comments}</td>
                    <td>
                      <span className='input-group-addon'>
                        <i className='glyphicon glyphicon-remove'  onClick={()=>this.removeAnInstance(key, instance.id)}></i>
                      </span>
                    </td>
                    <td>
                      <span className='input-group-addon'>
                        <i className='glyphicon glyphicon-pencil' onClick={()=>{this.edit(instance.id)}}></i>
                      </span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit an Instance<span className="glyphicon glyphicon-user"></span></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup bsSize = 'large'>
                <FormControl type = 'text' placeholder='please enter the name of the instance' onChange={event=>{this.setState({instanceName: event.target.value})}}/>
                <FormControl type = 'text' placeholder='please enter the color of the instance' onChange={event=>this.setState({instanceColor: event.target.value})}/>
                <FormControl type = 'text' placeholder='please enter the comments of the instance' onChange={event=>this.setState({instanceComments: event.target.value})}/>
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button className='btn btn-info' onClick={()=>this.updateInstance(key, this.state.instanceId, this.state.instanceName, this.state.instanceColor, this.state.instanceComments)}> Submit </Button>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <CreateInstance modelName={key}/>

        <Button bsStyle="info" bsSize="large" onClick={()=>this.props.navigation.goBack()} block>
          <span className="glyphicon glyphicon-hand-left"></span>  Go Back to Main Page
        </Button>
      </div>
    )
  }
};

function mapStateToProps(state){
  return {
    instancesArray: state.postReducer
  }
}


export default connect(mapStateToProps, {displayInstances, removeAnInstance, updateInstance})(PostTable);
