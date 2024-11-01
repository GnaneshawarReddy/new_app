import React from "react"
import Cookies from "js-cookie"
import { useNavigate,useMatch } from "react-router"
import { useEffect } from "react"

const Welcome = ()=>{
    const jwtToken=Cookies.get("jwt_token")
    const navigate=useNavigate()
    
    useEffect(()=>{
        if(!jwtToken){
            navigate("/login")
        }
    },[jwtToken])
    
    return (
        <>
        <h1> hello Welcome</h1>
        </>
    )
}

export default Welcome