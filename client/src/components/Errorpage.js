import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
  return (
    <>
       <div id="not found">
          <div className='notfound'>
            <div className='notfound-404'>
             <h1>404</h1>
             </div>
             <h2>We are sorry page not found</h2>
             <p className ="mb-5" >
                The page that you are looking for is not available 
             </p>
             <NavLink to = "/"> Back to Home page </NavLink>
          </div>

       </div>
    </>
  )
}

export default Errorpage