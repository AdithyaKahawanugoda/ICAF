import React  from 'react';
import { Container,Row,Col,Card } from "react-bootstrap";
import "./userguide.css";

const userguide = (props) => {

    


    return (
        
        <div className="pagecontent">
                    <h1 className="font-weight-bold">GRID ICAF User Guide </h1>
                    <h3 className="font-italic">The system manage by seven different users</h3>

            <Container className="usertypelk">
  <Row>
    <Col> 
    <Card border="dark" style={{ height: '15rem' }}>
    <Card.Header as="h3">Admin Side Users</Card.Header>
    <Card.Body>
    <Card.Text as="h5">
    Admin 
    </Card.Text>
    <Card.Text as="h5">
    Editor
    </Card.Text>
    <Card.Text as="h5">
    Reviewer
    </Card.Text>
    </Card.Body>
    </Card>
       
    </Col>
    <Col>
    <Card border="dark" style={{ height : '15rem' }}>
    <Card.Header as="h3">Customer Side Users</Card.Header>
    <Card.Body>
    <Card.Text as="h5">
    Researcher</Card.Text> 
    <Card.Text as="h5">  Workshop Conductor </Card.Text> 
    <Card.Text as="h5"> Attendee </Card.Text> 
    <Card.Text as="h5">
    Guest user(Unregistered)
    </Card.Text>
    </Card.Body>
    </Card>
    </Col>
  </Row>
</Container>
<Container  className="usertypelk"> 
    <p>Customer side users are able to create new accounts and get services via this system.        Unregistered users can use the sign-up option in header to navigate and create account using Registration form.        Registration processes divide into 3 different types according to user type.     </p>   
    
    <div className="shadow p-3 mb-5 bg-white rounded">
    <h4 className="font-weight-bold">Researcher – </h4>
    <h4 className="font-italic">must upload pdf research paper in the registration </h4>
    <h4 className="font-weight-bold">Workshop conductor –</h4>
    <h4 className="font-italic">must upload pptx workshop proposal in the registration </h4> 
    <h4 className="font-weight-bold">Attendee – </h4>
    <h4 className="font-italic">must pay upfront for the conference ticket</h4>
    <h4 className="font-weight-bold">Guest user(Unregistered) - </h4>
    <h4 className="font-italic">Unregistered users  can view conference details (as Guest) </h4>
    </div> 

    <img
             src="https://i.ibb.co/4SscXrm/registraion.jpg" alt="registraion" border="1"   width="60%"
          height="60%"
        />
    </Container> 
    <Container className="usertypelk">
   <p>	Only the Registered  users (Researchers, Workshop conductors and Attendees) can submit Research papers, conduct workshops, or manage other services. Reviewers can see research papers and workshop details in separate pages. 	Reviewers can approve/decline research papers or workshop proposals, result should notify to the author/workshop conductor.Researchers must pay a fee if their paper get approved for the conference.After successfully completing registration, users will redirect into their profile pages.Registered users are able to use Login button on top-right corner of header to open-up Login model and log into profiles by providing login credentials. 	Each different type of user will get different interfaces and accessible functions in their profiles. 	Attendee profile will display purchased ticket for the conference and, payment history in addition to personal details.Personal details such as username and email are always free to get modified by attendee. </p>
   
    <img
         img src="https://i.ibb.co/x1kmchs/atendee.jpg" alt="atendee" border="0"   width="60%"
        height="60%"
        />
    </Container>
    <Row>
     <Container className="lkcardtyple">
     <Card  >
    <Card.Body>
    <Card.Title as="h3">Researcher</Card.Title>
    <Card.Text as="p">
    Researchers are able to upload their research papers and check reviewer’s decision about previously submitted papers. Furthermore, there will be a notification section which informs users with latest updates regarding their submitted work.         Approved research papers will get into conference after researcher complete the payment for publishing paper.
    </Card.Text>
    <Card.Img
          src="https://i.ibb.co/GnS2NJD/resercher-p.jpg" alt="resercher-p" 
          width="70%"
          height="65%"
        />

    </Card.Body>

    </Card>
     </Container>
    </Row>

    <Row>
     <Container className="lkcardtyple">
     <Card >
    <Card.Body>
    <Card.Title as="h3">Workshop conductor</Card.Title>
    <Card.Text as="p">
    Workshop conductors will aslo have to wait until their work get approved by reviewer, but the approved proposals doesn’t have to pay any amount of money.   Meanwhile they can upload new workshop proposals as well 
    </Card.Text>
    <Card.Img
   src="https://i.ibb.co/vwPVPjt/workshop-add.jpg" alt="workshop-add"  
          width="70%"
          height="75%"
        />
    </Card.Body>
    </Card>
     </Container>
    </Row>

    <Row>
     <Container className="lkcardtyple">
     <Card >
    <Card.Body>
    <Card.Title as="h3">Reviewer</Card.Title>
    <Card.Text as="p">
    Reviewers can see research papers and workshop details in separate pages. Reviewers can approve/decline research papers or workshop proposals, result should notify to the author/workshop conductor. Furthermore, reviewers can download each submitted paper or workshop proposal via the system itself.  Notification section in reviewer will display updates and it has a notification filters built in. 
    </Card.Text>
    <Card.Img
   src="https://i.ibb.co/56CGhc9/Reviever.jpg" alt="Reviever"
          width="90%"
          height="90%"
        />
    </Card.Body>
    </Card>
     </Container>
    </Row>

    <Row>
     <Container className="lkcardtyple">
     <Card >
    <Card.Body>
    <Card.Title as="h3">Editor</Card.Title>
    <Card.Text as="p">
    Editors -add/edit conference, news timeline, notices and speaker details Admin -must approve the editor's content before displaying it on website, until admin approves those content will save under “pending” state in database. Admin can monitor all these activities in a dashboard including total revenue and notifications.  
    </Card.Text>
    <Card.Img
     src="https://i.ibb.co/zXGDFq7/manage-conference.png" alt="manage-conference" border="0"
          width="90%"
          height="90%"
        />
    </Card.Body>
    </Card>
     </Container>
    </Row>

    <Row>
     <Container className="lkcardtyple">
     <Card >
    <Card.Body>
    <Card.Text as="p">
     Furthermore there’s a template page with pdf and pptx template files for research papers and workshop proposals. Users can download and include their content into the provided structure. 

    <Card.Img
      src="https://i.ibb.co/xfjj1fR/add-template.jpg" alt="add-template" border="0"
          width="40%"
          height="80%"
        />
    
    Conference details and other resources are accessible through footer sitemap and home page. 
    </Card.Text>
    <Card.Img
        src="https://i.ibb.co/NCHx48Q/home.jpg" alt="home" border="0"
          width="80%"
          height="50%"
        />
        <Card.Img
           src="https://i.ibb.co/RzGLqrK/home-gallery.jpg" alt="home-gallery" border="0"
          width="80%"
          height="50%"
        />
    </Card.Body>
    </Card>
     </Container>
    </Row>
        </div>
    )
}

export default userguide
