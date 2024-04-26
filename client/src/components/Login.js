import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./Login.css"

const Login = () => {
  const history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });
    const data = res.json();

    if(data.status === 400 || !data){
      window.alert("Invalid Email or Password");
      console.log("Invalid Email or Password")
    }else{
      window.alert("Login succesfull")
      history("/products");
    }
  }

  return (
    <>
       <section className="sign-in">
         <div className="container mt-5">
          <div className="signin-content">
          

            <div className="signin-form">
              <h2 class="form-title">Sign-in</h2>
               <form method = "POST" className="register-form" id="register-form">
                
                <div className="form-group">
                  <label htmlfor="email">
                  <i class="zmdi zmdi-email"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off' 
                  value = {email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"/>
                </div>



                <div className="form-group">
                  <label htmlfor="password">
                  <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="password" id="password"  autoComplete='off' 
                  value = {password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"/>
                </div>

                

                <div className='form-group form-button'>
                  <input type='submit' name="signup" id="signin"  className="form-submit" value="Log in"
                  onClick={loginUser}/>
                </div>
               </form>

               <div className="signin-image">
                  
                  <NavLink to="/signup" className="signup-image-link">create a account</NavLink>
               </div>
               </div>
               
            

          </div>

         </div>

      </section> 
    </>
  )
}

export default Login