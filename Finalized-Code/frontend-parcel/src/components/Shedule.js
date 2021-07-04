import React from 'react'
import './Shedule.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup  from 'react-bootstrap/ListGroup';

function Shedule({conference}) {
    return (
        <div className="lkshedule">
            <div className="lkshedule-title" >
                <div className="lkshedule_title_up">
                    <h6>{conference.about}</h6>
                </div>
                <div className="lkshedule_title_down">
                    <ListGroup  as="ul">
                        <ListGroup.Item active><h5>Time Shedule & Venue</h5></ListGroup.Item>
                        <ListGroup.Item >{conference.period}</ListGroup.Item>
                        <ListGroup.Item>{conference.startingTime}</ListGroup.Item>
                        <ListGroup.Item>{conference.venue}</ListGroup.Item>
                    </ListGroup>
                </div>
               
            </div>
           
        </div>
    )
}

export default Shedule
