import NavbarComponent from "./NavbarComponent";
import { useState,useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"
import { authenticate, getUser } from "../service/authorize";

const LoginComponent =()=>{

    const [state,setState] = useState({
        username:"",
        password:""
    })

    const {username,password} = state

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }

    const submitForm =(e)=>{
        e.preventDefault();
        // console.table({username,password})
        axios
        .post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            authenticate(response)
            // console.log(response.data)
        })
        .catch(err=>{
            // console.log(err.response.data.error)
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
    }

    useEffect(()=>{
        getUser() && redirect()
    },[])

    const redirect =()=>{
        window.location.href = '/'
    }

    return(
        <div className="container p-5">
            <NavbarComponent/>
            {/* {JSON.stringify(state)} */}
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form group">
                    <label>Username</label>
                    <input type="text" className="form-control" 
                      value={username}
                      onChange={inputValue("username")}/>
                </div>
                <div className="form group">
                    <label>Password</label>
                    <input type="password" className="form-control" 
                      value={password}
                      onChange={inputValue("password")}/>
                </div>
                <br/>
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
              </form>
          </div>
    )
}

export default LoginComponent