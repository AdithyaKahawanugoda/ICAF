import React, { useEffect, useState } from 'react'
import './Research.css';
import Table  from 'react-bootstrap/Table';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { Container } from "react-bootstrap";
import { Card  } from "antd";

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

<Container>
{research
 .filter((pay) => pay.payment === 'payementsuccessfull')
.map((item,researchpp) => {
            return <div key={researchpp}>   
            {/* {item.payment === 'payementsuccessfull'&& (           */}
              <Card className="lkcardreserch" hoverable style={{ marginBottom: 16 }} >
              
                    <div >
                    <h5>Conducted by {conductName}</h5>
                      <h2>Research Topic: {item.researchTopic}</h2>
                      <h5>Authors: {item.paperAuthors}</h5>
                      <h5>Research Subject: {item.researchSubject}</h5>
                      <h4>Abstract:</h4><p> {item.paperAbstract}</p> 
                    
                    </div>
                    
                    </Card>
                    {/* )} */}
                </div>;
          })
        }   

</Container>



        
        </div>
    )
}

export default Research
