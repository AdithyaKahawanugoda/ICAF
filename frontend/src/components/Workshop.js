import React, { useEffect, useState } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Workshop.css';
import Table  from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';


function Workshop({id}) {
    const [workshop,setWorkshop] = useState([]);
    const [conductName,setConductName] = useState("");
    const [approve,setApprove] = useState(true);
    const dataset = [];

    useEffect(() =>{
        const getWorkshops = async (id) => {
            try{
                await axios
                .get(`http://localhost:6500/grid/api/guest/getWorkshop/${id}`)
                .then((res) =>{
                    console.log(res.data.workshop.workshopData);
                    setWorkshop(res.data.workshop.workshopData);
                    setConductName(res.data.workshop.username)
                })
            }catch (err) {
                alert("error :" + err);
            }
        };
        getWorkshops(id);
        checkAprroved();
    },[id])

    useEffect(() =>{
        checkAprroved();
    },[dataset])

    const checkAprroved = () =>{
        {workshop.map(element2 =>{
            if(element2.status === 'approvedbyreviewer'   ){
                dataset.push('true');
            }else{
                dataset.push('false');
            }
        } )}

        if(dataset.includes('true')){
            setApprove(true)
        }else{
            setApprove(false);
        }
    }
    
    return (
        <div className="lkworkshop">
                <Table striped bordered hover  responsive >
                    <thead style={{backgroundColor:'#2F52A4',color:'white',textAlign:'center'}}>
                        <tr>
                            <th>Workshop Topic</th>
                            <th>Descrption</th>
                            <th>Conduct Name</th>
                        </tr>
                    </thead>
                    {approve ? (
                    <tbody>
                        {workshop.map(element => (
                             element.status === 'approvedbyreviewer'?
                                <tr>
                                    <td>{element.workshopTopic}</td>
                                    <td>{element.workshopDescription}</td>
                                    <td>{conductName}</td>
                                </tr>
                            : ''
                        ))}
                    </tbody>
                    ) : <tr><td colSpan={5} align="center" ><h6><Alert variant="primary">No Worshop Data Avalable</Alert></h6></td></tr>}
                </Table>

            
        </div>
    )
}

export default Workshop
