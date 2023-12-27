import React,{ useEffect } from 'react';
import Landing from './Landing';
import { useNavigate } from "react-router-dom";
import Main from './Main';

const Index = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
          console.log("Hello world")
        }else{
            navigate('/login')
        }
        // eslint-disable-next-line
      }, []);
    return (
        <div>
            <Landing />
            <hr />
            <Main />

        </div>
    )
}

export default Index
