import React, { useContext, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext, SolvedContext } from '../App';

export const Login=()=>{
    const [name,setName]=useState("");
    const [user_id,setUser_id]=useState("");
    const navigate=useNavigate();
    const {setUserId}=useContext(AuthContext);
    const {setSolved}=useContext(SolvedContext);
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.get(`https://codeforces.com/api/user.status?handle=${user_id}&from=1&count=1000`);
            //console.log(res.data.result);
            if(res && res.data.status){
                setUserId(user_id);
                localStorage.setItem("userId",JSON.stringify(user_id));
                let solved=[];
                res.data.result.map((p)=>{
                    var var1=p.problem.contestId;
                    var var2=p.problem.index;
                    var var3=p.verdict;
                    var obj={var1,var2,var3};
                    solved.push(obj);
                });
                localStorage.setItem("solved",JSON.stringify(solved));
                setSolved(solved);
                window.alert("login successfully");
                navigate('/pro');
            }
            else{
                window.alert("user not exist");
            }
        }
        catch(err){
            window.alert("user not exist");
            console.log(err);
        }
    }
    return(
        <div className='mt-5'>
            <div className='login'>
                <div className='container register-page'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6 border shadow'>
                        <form>
                        <h1 className='text-uppercase text-center mt-3'>Login Here</h1>
                        <div className='m-3'>
                           <input type='text'placeholder='Name' value={name} className='form-control' id='L-emailId' onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text' placeholder='User Id' value={user_id} className='form-control' id='L-passwordId' onChange={(e)=>setUser_id(e.target.value)} required/>
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary reg-btn btn-lg mb-3' onClick={handleLogin}>LogIn</button>
                        </div>
                        </form>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}