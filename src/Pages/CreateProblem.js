import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const CreateProblem=()=>{
    const [name,setName]=useState("");
    const [contestId,setContestId]=useState();
    const [index,setIndex]=useState("");
    const [verdict,setVerdict]=useState("");
    const [plink,setPlink]=useState("");
    const [isSolved,setIsSolved]=useState();
    const navigate=useNavigate();

    const handleSubmit=async()=>{
        //e.preventDefault();
        try{
            setVerdict("OK");
            setIsSolved(false);
            const data=await axios.post('http://localhost:5000/create',{name,contestId,index,verdict,plink,isSolved});
            if(data){
                navigate('/pro');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className='mt-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8 border shadow'>
                        <h1 className='text-uppercase text-center mt-3'>Add new problem</h1>
                        <div className='m-3'>
                           <input type='text'placeholder='Name' value={name} className='form-control' id='L-emailId' onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='number'placeholder='Contest Id' value={contestId} className='form-control' id='L-emailId' onChange={(e)=>setContestId(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text'placeholder='Index' value={index} className='form-control' id='L-emailId' onChange={(e)=>setIndex(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text'placeholder='Problem Link' value={plink} className='form-control' id='L-emailId' onChange={(e)=>setPlink(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                            <button className='btn btn-primary w-100' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}