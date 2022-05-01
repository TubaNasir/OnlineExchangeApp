import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='footer-col'>
                        <h4>Contact US</h4>
                        <ul>
                            <li><Link to="/" style={linkStyle}>Email</Link></li>
                            <li><Link to="/" style={linkStyle}>Helpline</Link></li>

                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Categories</h4>
                        <ul>
                            <li><Link to="/" style={linkStyle}>Mobile Phones</Link></li>
                            <li><Link to="/" style={linkStyle}>Plots</Link></li>
                            <li><Link to="/" style={linkStyle}>Cars</Link></li>

                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Most Searched</h4>
                        <ul>
                            <li><Link to="/" style={linkStyle}>Resource</Link></li>
                            <li><Link to="/" style={linkStyle}>Resource</Link></li>
                            <li><Link to="/" style={linkStyle}>Resource</Link></li>

                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Follow US</h4>
                        <div className='social-links'>

                            <Link to="/" style={socialLinks}><FaFacebookF /></Link>
                            <Link to="/" style={socialLinks}><FaTwitter /></Link>
                            <Link to="/" style={socialLinks}><FaInstagram /></Link>

                        </div>
                    </div>

                </div>

            </div>

        </footer>
    )
}

const linkStyle = {
    textTransform: 'uppercase',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '300',
    color: '#bbbbbb',
    display: 'block',
    transition: 'all 0.3s ease'



}

const socialLinks = {
    display: 'inline-block',
    height: '40px',
    width: '40px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: '0 10px 10px 0',
    textAlign: 'center',
    lineHeight: '40px',
    borderRadius: '50%',
    color: '#ffffff',
    transition: 'all 0.5s ease'
}


export default Footer