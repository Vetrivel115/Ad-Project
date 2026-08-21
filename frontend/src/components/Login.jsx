import React, { useState } from 'react'

export default function Login() {

const [userName,setUserName] = useState("");
const [password,setPassword] = useState("");

return (
<div>
    <form>
        <h1>FleetFocus Login</h1>
        <input type="text" placeholder='Enter your username' required/>
    </form>
</div>
)

}
