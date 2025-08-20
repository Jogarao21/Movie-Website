
import "./HtmlScss/Login.scss";

function Login (){
  return(
    <div className="login">
      <div className='login-container'>
        <h1>Login Here</h1>
        <input type="text" placeholder='Enter your Email'/><br />
        <input type="text" placeholder='Enter yur Password'/><br />
        <button>Login</button>
      </div>
      
    </div>
  )
}
export default Login