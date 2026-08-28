import React, { useState } from 'react'
import {useSelector} from 'react-redux'

export default function login() {

const [userName,setUserName] = useState("");
const [password,setPassword] = useState("");

const {loading,error} = useSelector((state)=>state.auth);

const handleSubmit = async(e) => {
    e.preventDefault();
}

return (
<div>
    <form onSubmit={handleSubmit}>
        <h1>FleetFocus Login</h1>

        <input type="text" placeholder='Enter your username'
         value={userName} onChange={(e)=>setPassword(e.target.value)} required/>

         <input type="text" placeholder='........' value={password}
          onChange={(e)=>setPassword(e.target.value)} required/>

          <button type='submit' disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

          {error && <div>{error}</div>}

    </form>
</div>
)

}
