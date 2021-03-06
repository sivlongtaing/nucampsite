import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label, Modal, FormGroup, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" />
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <FormGroup>
                         <Label>Rating</Label>
                         <div className="form-group">
                             <Control.select model=".rating" id="rating" placeholder="rating" className="form-control">
                                 <option value="1">1</option>
                                 <option value="2">2</option>
                                 <option value="3">3</option>
                                 <optoin value="4">4</optoin>
                                 <option value="5">5</option>
                             </Control.select>
                         </div>
                        </FormGroup>
                        <FormGroup>
                         <Label>Author</Label>   
                         <div className="form-group">
                          <Control.text model=".author" id="author" name="author"
                          placeholder="Author"
                                className="form-constrol"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLenght: maxLength(15)
                                }}
                          />
                         <Errors
                         className="text-danger" 
                         model=".author"
                         show="touched"
                         component="div"
                         messages={{
                             required: 'Required',
                             minLength: 'Must be at least 2 characters',
                             maxLength: 'Must be 15 characters or less'
                         }} 
                         />        
                         </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Comment</Label>
                            <div className="form-group">
                            <Control.textarea model=".text" id="text" name="text" rows={6} placeholder="Comment" className="form-control"/>    
                            </div>
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>    
                </Modal>
            </React.Fragment>
        )
    }
}
function RenderCampsite({ campsite }) {
    return (
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                        <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                {comments.map(comment => <div key={comment.id}>
                <div>--{comment.text}
                <br></br>
                {comment.author}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                <br></br>
                
                    </div>)}
          <CommentForm />          
        </div> 
        );   
        } else {
            return (
                <div>
                    
                </div>
            );
        }
}   
function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className='container'>
                    <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                
            </div>
        );
    }
    
}
export default CampsiteInfo;



