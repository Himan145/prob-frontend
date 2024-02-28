import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext, SolvedContext } from '../App';
import { Link ,useNavigate} from 'react-router-dom';


export const AllProblems=()=>{
    const [prob,setPro]=useState([]);
    const GetP=async()=>{
        try{
            const res=await axios.get('http://localhost:5000/get');
            if(res){
                setPro(res.data.allprobs);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        GetP();
    },[])



    const {userId,setUserId}=useContext(AuthContext);
    const {solved,setSolved}=useContext(SolvedContext);
    const navigate=useNavigate();
    const handleLogout=()=>{
        setUserId("");
        setSolved([]);
        localStorage.removeItem('solved');
        localStorage.removeItem('userId');
        navigate('/');
    }
    const handleAdd=()=>{
        navigate('/create');
    }

    var arr=[];
    solved.map((p)=>arr.push(JSON.stringify(p)));


    const handleLogin=async()=>{
        try{
            const res=await axios.get(`https://codeforces.com/api/user.status?handle=${userId}&from=1&count=1000`);
            //console.log(res.data.result);
            if(res && res.data.status){
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
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        handleLogin();
    },[])
    return(
        <div>
            <div className='row mb-3 nav'>
                <div className='col-md-11'>
                <h1 className='mx-3'>{userId}</h1>
                </div>
                <div className='col-md-1'>
                <button onClick={handleLogout} className='btn btn-outline-primary mt-2 text-uppercase'>Logout</button>
                </div>
            </div>
            <div className='border shadow mx-2'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Problem</th>
                                        <th scope='col' className='text-center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(prob)?
                                    prob?.map((u,i)=>{
                                        var var1=u.contestId;
                                        var var2=u.index;
                                        var var3=u.verdict;
                                        var obj={var1,var2,var3};
                                        var x=JSON.stringify(obj);
                                        return(
                                            <tr>
                                                <th scope='row'>{i+1}</th>
                                                <td><Link to={u.plink} className='probname'>{u?.name}</Link></td>
                                                <td className='sol text-center'>{Array.isArray(arr)?(arr.includes(x)?"Solved":"Not Solved"):null}</td>
                                            </tr>
                                        )
                                    }):null}
                                </tbody>
                            </table>
                            <div>
                                <button className='btn btn-primary w-100' onClick={handleAdd}>Add+</button>
                            </div>
            </div>
        </div>
    )
}




// table.row[i].col[j];