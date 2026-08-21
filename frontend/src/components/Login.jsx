import React, { useState } from 'react'

export default function Login() {

const [userName,setUserName] = useState("");
const [password,setPassword] = useState("");


return (
<div>
    <form onSubmit={handleSubmit}>
        <h1>FleetFocus Login</h1>

        <input type="text" placeholder='Enter your username'
         value={userName} onChange={(e)=>setPassword(e.target.value)} required/>

         <input type="text" placeholder='........' value={password}
          onChange={(e)=>setPassword(e.target.value)} required/>

          <button type='submit' disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

    </form>
</div>
)

}
