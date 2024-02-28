import './App.css';
import {Routes,Route} from 'react-router-dom';
import { Login } from './Pages/Login';
import { createContext ,useState,useEffect} from 'react';
import { AllProblems } from './Pages/AllProblems';
import { CreateProblem } from './Pages/CreateProblem';


export const AuthContext=createContext();
export const SolvedContext=createContext();

function App() {
  const [userId,setUserId]=useState("");
  const [solved,setSolved]=useState([]);
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('userId'))
    if(data){
      //const parseData=JSON.parse(data)
      setUserId(data);
    }
    //eslint-disable-next-line
  },[]);
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('solved'));
    if(data){
      setSolved(data);
    }
    //eslint-disable-next-line
  },[])
  return (
    <>
    <AuthContext.Provider value={{userId,setUserId}}>
    <SolvedContext.Provider value={{solved,setSolved}}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/pro' element={<AllProblems/>}/>
        <Route path='/create' element={<CreateProblem/>}/>
      </Routes>
      </SolvedContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
