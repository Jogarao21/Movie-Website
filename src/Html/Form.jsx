import React from "react";


function Form(){
  return(
    <form>
      <h1>Contact Us</h1>
      <label>Enter Your Email Id :
        <input type="text" required />
      </label><br />
      <label>Enter Your Password :
        <input type="text" required/>
      </label><br />
      <button>Login</button>
    </form>
  )
}
export default Form
