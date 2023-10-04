import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles.css' 

const Footer = () => {
  return (
      <div className="footer">
        <div className="footer-dir"><Link to="#Testimonials"><p>About</p></Link></div>
        <div className="footer-dir"><Link to="#NewsPage"><p>News</p></Link></div>
        <div className="footer-dir"><Link to="#Testimonials"><p>Testimonials</p></Link></div>
        <div className="footer-dir"><Link to="#Testimonials"><p>Contact</p></Link></div>
    
        <div className="socials">
          <Link to="#Facebook"><i className="bi bi-facebook"></i></Link>
          <Link to="#Instagram"><i className="bi bi-instagram"></i></Link>
          <Link to="#Twitter"><i className="bi bi-twitter"></i></Link>
          <Link to="#Youtube"><i className="bi bi-youtube"></i></Link>
        </div>
    </div>
  )
}

export default Footer;