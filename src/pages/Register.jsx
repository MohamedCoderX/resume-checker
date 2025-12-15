import React, { useState } from 'react'

const Register = () => {
   

  return (
    <div>
        Register

        <div>
        <form onSubmit={submit}>
           
            <input type="email" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button type="submit">Register</button>
        </form>
        </div>
    </div>
  )
}

export default Register