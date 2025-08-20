function JavaScript(){

  function handleClick(){
    document.body.style.background="Black"
    document.body.style.color="white"
  }
  function handleLogin(se){
    se.preventDefault()
  }

  return(
    <div>
      <h1>Java Script</h1>
      <form>
        <input type="text" placeholder="Enter Your Email" />
        <button onClick={handleLogin}>Login</button>
      </form>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
export default JavaScript