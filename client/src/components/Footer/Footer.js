import React from "react";
import "./Footer.css";

const Footer = props => ( 
   <footer> 
      <div className="footer">
         <p className="footer-appName">{props.appName}</p>
         <p className="footer-link"><a href={props.gitHubLink} target="_blank">{props.gitHub}</a></p>
      </div>
   </footer>
);

export default Footer;
