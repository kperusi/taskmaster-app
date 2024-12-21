import React, { useContext, useEffect } from "react";
import "../styles/styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Hambuger(props) {



    const style = {
        display: "block",
        width: " 30px",
        height: " 4px",
        margin: "4px",
        transition: " all 0.3s ease-in-out",
        backgroundColor: "blueviolet",
      };
      const [classname, setClassname] = useState("");
      const navigate = useNavigate();
     
   
    
    
      const toggle = () => {
        if (classname === "active") {
          setClassname("");
          
        } else {
          setClassname("active");
    
        //   navigate("menu-nav");
        }
        props.handleShowMobiMenu()
      
      };
  return (
   
       <div className={`hambuger ${classname}`} onClick={() => toggle()}>
      <span className="line" style={style}></span>
      <span className="line" style={style}></span>
      <span className="line" style={style}></span>
 
    </div>
  )
}





