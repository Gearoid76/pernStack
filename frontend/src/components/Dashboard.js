import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import BookData from './Data.json';

const Dashboard = ({ setAuth }) => {

    const [name,setName] = useState("")

    async function getName() {
        try {
         const response = await fetch("http://localhost:4000/dashboard/",  {
             method: "GET",
             headers: { token: localStorage.token }
         });

         const parseRes = await response.json()

         setName(parseRes.username);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        getName()
    },[]);

    
    return (
        <Fragment>
            <h4>Dashboard, Hello {name}</h4>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            <SearchBar placeholder='Enter a book name. ' data ={BookData} />
        </Fragment>

    );
};

export default Dashboard;

