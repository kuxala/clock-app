import "../App.css"
import {useState} from "react";
import App from "./App";

function Dark(quote, author) {
  const [darkmode, setDarkmode] = useState(false);

  console.log(quote)
  const handleClick = () =>{
    setDarkmode(!darkmode)
  }
    return ( 
        <div className="wrapper" id="wrapper">
          <header>
            <div className="header-text">
              <p>
              {/* {quote} */}
              </p>
            </div>
            <span>
              {/* {author} */}
            </span>
          </header>
    
          <div className="main">
            <div>
              <p id="morning">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                <path d="M22.1568 17.3664C21.9424 17.1024 21.5824 17.0048 21.2656 17.1184C20.3776 17.4368 19.4144 17.6 18.4 17.6C13.5472 17.6 9.6 13.6512 9.6 8.8C9.6 5.88 11.0416 3.1616 13.456 1.5264C13.7296 1.3408 13.8608 1.0064 13.7872 0.6848C13.7136 0.3632 13.4496 0.12 13.1216 0.072C12.7472 0.0176 12.3744 0 12 0C5.3824 0 0 5.3824 0 12C0 18.6176 5.3824 24 12 24C16.2 24 20.0208 21.8656 22.2176 18.2912C22.3952 18.0016 22.3696 17.632 22.1568 17.3664Z" fill="white"/>
            </svg>
                GOOD EVENING
                </p>
              <h1 id="time">00:00</h1>
              <p id="location">London, UK</p>
            </div>
    
            <div id="more" >
                <p >More</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#303030"/>
                  <path d="M11.2 18.3999L16 13.5999L20.8 18.3999" stroke="white" stroke-width="2"/>
                </svg>
              
            </div>
          </div>
    
        </div>
      );

      
}

export default Dark;