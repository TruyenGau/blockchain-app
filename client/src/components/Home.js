// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring'
// import "./Home.css"

// const Home = () => {
  
//   const animationProps = useSpring({
//     from: { opacity: 0, marginTop: -50 },
//     to: { opacity: 1, marginTop: 0 },
//     config: { duration: 3000 }
//   });

//   return (
//     <>

//         <div  className="home-page">
//         <div className="home-background"></div>

//           <div className='home-div' style={animationProps}>
//           <animated.p className="pt-5 animated-text" style={animationProps} >WELCOME</animated.p>
//         <animated.h1 style={animationProps} className="animated-text">SPARE PART HUB</animated.h1>
//         <NavLink to="/login" className="btn btn-primary animated-text"  style={animationProps}>start shopping</NavLink>
//           </div>
           
//         </div>

        
//     </>
//   )
// }

// export default Home

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import "./Home.css";

const Home = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  
  const animationProps = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 3000 }
  });

  const parallaxProps = useSpring({
    from: { transform: 'translate3d(0%, 0, 0)' },
    to: { transform: 'translate3d(0%, -100%, 0)' },
     
    loop: { reverse: true }
  });

  const handleButtonClick = () => {
    setShowAnimation(false); // Hide animation when button is clicked
  };

  return (
    <>
      <div className="home-page">
        <div className="home-background" style={animationProps}></div>
        <div className="home-parallax" style={parallaxProps}></div> {/* Add the parallax background */}
        <animated.div className='home-div' style={animationProps}>
          <animated.p className="pt-5 animated-text">WELCOME</animated.p>
          <animated.h1 className="animated-text">SPARE PART HUB</animated.h1>
          <NavLink to="/login" className="btn btn-primary animated-text" onClick={handleButtonClick}>start shopping</NavLink>
        </animated.div>
      </div>
    </>
  );
}

export default Home;
