import React, { useEffect, useState } from 'react'
import './Research.css';
import Table  from 'react-bootstrap/Table';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function Research({id}) {
    const [research,setResearch] = useState([]);
    const [conductName,setConductName] = useState("");
    const [conductEmail,setConductEmail] = useState("");
    const [approve,setApprove] = useState(true);
    const dataset = [];

    useEffect(() =>{
        const getResarch = async (id) => {
            try{
                await axios
                .get(`http://localhost:6500/grid/api/guest/getResearch/${id}`)
                .then((res) =>{
                    console.log(res.data.researchpaper);
                    setResearch(res.data.researchpaper.researchData);
                    setConductName(res.data.researchpaper.username)
                    setConductEmail(res.data.researchpaper.email)
                })
            }catch (err) {
                alert("error :" + err);
            }
        };
        getResarch(id);
        checkAprroved();
    },[id])

    useEffect(() =>{
        checkAprroved();
    },[dataset])

    const checkAprroved = () =>{
        {research.map(element2 =>{
            if(element2.status === 'approvedbyreviewer' && element2.payment === 'payementsuccessfull' ){
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
      
        <div className="lkresearch">
            <Table striped bordered hover responsive className="lkprimary">
                <thead style={{backgroundColor:'#2F52A4',color:'white',textAlign:'center'}} >
                    <tr>
                        <th>Research Topic</th>
                        <th>Research Subject</th>
                        <th>Researcher Name</th>
                        <th>Researcher Email</th>
                        <th>Abstract</th>
                    </tr>
                </thead>
                {approve ? (
                    <tbody>
                        {research.map(element => (
                            element.status === 'approvedbyreviewer' && element.payment === 'payementsuccessfull'?
                                <tr>
                                    <td>{element.researchTopic}</td>
                                    <td>{element.researchSubject}</td>
                                    <td>{conductName}</td>
                                    <td>{conductEmail}</td>
                                    <td>{element.paperAbstract}</td>
                                </tr>
                            : ''
                        ))}
                    </tbody>

                ) : <tr><td colSpan={5} align="center" ><h6><Alert variant="primary">No Research Data Avalable</Alert></h6></td></tr>}
            </Table>
        </div>
    )
}

export default Research
