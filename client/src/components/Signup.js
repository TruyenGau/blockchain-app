import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./signup.css"

const Signup = () => {
  const  history = useNavigate();
  const[user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    cpassword:""

  });
 let name, value;
  const handleInputs = (e) => {
    //console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value})
  }

  const PostData = async(e) => {
    e.preventDefault();

    const {name, email, phone, password, cpassword} = user;

    const res = await fetch("/signup", {
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name, email, phone, password, cpassword
      })
    });

     const data = await res.json();

    if(data.status === 422 || !data){
      window.alert("Invalid registration");
      console.log("Invalid data");
    }else{
      window.alert("Regsitration successful");
      console.log("Valid data");

      history("/login");
    }

  }
  return (
   
    <div>
      <section className="signup">
         <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 class="form-title">Sign-up</h2>
               <form method = "POST" className="register-form" id="register-form">
                
                <div className="form-group">
                  <label htmlfor="name">
                  <i class="zmdi zmdi-account-circle"></i>
                  </label>
                  <input type="text" name="name" id="name" autoComplete='off'
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Your Name"  />
                </div>


                <div className="form-group">
                  <label htmlfor="email">
                  <i class="zmdi zmdi-email"></i>
                  </label>
                  <input type="email" name="email" id="email"  autoComplete='off'
                   value={user.email}
                  onChange={handleInputs} 
                  placeholder="Your email"/>
                </div>

                <div className="form-group">
                  <label htmlfor="phone">
                  <i class="zmdi zmdi-phone"></i>
                  </label>
                  <input type="number" name="phone" id="phone"  autoComplete='off'
                   value={user.phone}
                   onChange={handleInputs}
                   placeholder="Your phone No" />
                </div>

                <div className="form-group">
                  <label htmlfor="password">
                  <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="password" id="password"  autoComplete='off' 
                   value={user.password}
                   onChange={handleInputs}
                   placeholder="Your password"/>
                </div>

                <div className="form-group">
                  <label htmlfor="cpassword">
                  <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="cpassword" id="cpassword"  autoComplete='off' 
                   value={user.cpassword}
                   onChange={handleInputs}
                   placeholder="Confirm Your password"/>
                </div>
                

                <div className='form-group form-button'>
                  <input type='submit' name="signup" id="signup"  className="form-submit" value="Register" onClick={PostData}/>
                </div>
               </form>
               </div>
               <div className="signup-image">
                  <figure>
                    <img src= " " alt="" srcset=""></img>
                  </figure>
                  <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
               </div>
            

          </div>

         </div>

      </section>
    </div>
  )
}

export default Signup