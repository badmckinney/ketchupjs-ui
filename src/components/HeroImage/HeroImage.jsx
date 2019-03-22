import React from 'react';
import { useSpring, animated } from 'react-spring';

const HeroImage = () => {
  const props = useSpring({ marginRight: 0, from: { marginRight: -500 }, delay: 400, duration: 800 })
  return <animated.div className="right" style={props}><img src="/assets/KetchupJS.png" alt="Ketchup packet logo" /></animated.div>
};

export default HeroImage;