import "../App.css";
import { useState, useEffect } from "react";
import Dark from "./dark";
import { useSpring, animated } from '@react-spring/web';
import { sun, arrowUp } from "./Icons";

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [time, setTime] = useState("Loading...");
  const [location, setLocation] = useState("Loading...");
  const [quoteData, setQuoteData] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState("Loading...");
  const [dayOfYear, setDayOfYear] = useState("Loading...");
  const [weekNumber, setWeekNumber] = useState("Loading...");
  const [ip, setIp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quotable.io/quotes/random?tags=technology');
        const data = await response.json();
        setQuoteData(data);
      } catch (error) {
        console.error('Error fetching quote data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const resp = await fetch("https://api.ipapi.is/?q=188.169.226.16");
        const da = await resp.json();
        setIp(da.ip);
        setLocation(da.location.timezone);
        
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${da.location.timezone}`);
        const data = await response.json();
        
        setDayOfWeek(data.day_of_week);
        setDayOfYear(data.day_of_year);
        setWeekNumber(data.week_number);

        const utcDateTimeString = data.utc_datetime;
        const utcDateTime = new Date(utcDateTimeString);

        const hours = utcDateTime.getHours().toString().padStart(2, '0');
        const minutes = utcDateTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        
        setTime(formattedTime);
        

      } catch (error) {
        console.error('Error fetching time data:', error);
      }
    };

    fetchTimeData();
  }, []);

  const author = quoteData.length > 0 ? quoteData[0].author : '';
  const quote = quoteData.length > 0 ? quoteData[0].content : '';
  
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  
  const fadeIn = useSpring({
    opacity: dropDown ? 1 : 0
  });

  const fadeOut = useSpring({
    opacity: dropDown ? 0 : 1
  });

  if (time === "Loading..." || location === "Loading..." || dayOfWeek === "Loading..." || dayOfYear === "Loading..." || weekNumber === "Loading...") {
    return <p>Loading...</p>;
  }

  return (
    <div className={darkmode ? "wrapper-dark": "wrapper"}>
      <div className="full-col">
        <div className="left-col">
          <animated.header className={dropDown ? "header-none" : "header-text"} style={fade}>
            <div>
              <p>{quote}</p>
            </div>
            <span>{author}</span>
          </animated.header>

          <animated.div className="main" style={fade}>
            <div>
              <p className="morning">
                <div className="svg">{sun}</div>
                GREETINGS
              </p>
              <h1 className="time">{time}</h1>
              <p className="location">{location}</p>
            </div>
          </animated.div>
        </div>

        <div className="right-col">
          <div id="more">
            <div className="more" onClick={() => { setDropDown(!dropDown); }}>
              <p>{dropDown ? <p>Less</p> : <p>More</p>}</p>
              {arrowUp}
            </div>
          </div>
        </div>
      </div>

      <animated.div className={dropDown ? "dropdown" : "dropdown-none" } style={dropDown ? fadeIn : fadeOut}>
        <div className="left-column">
          <div className="dropdown-card" id="first-child">
            <p>CURRENT TIMEZONE</p>
            <span>{location}</span>
          </div>
          <div className="dropdown-card">
            <p className="p-padding">DAY OF THE YEAR</p>
            <span>{dayOfYear}</span>
          </div>
        </div>
        <div className="right-column">
          <div className="dropdown-card">
            <p >DAY OF THE WEEK</p>
            <span>{dayOfWeek}</span>
          </div>
          <div className="dropdown-card">
            <p className="p-padding">WEEK NUMBER</p>
            <span>{weekNumber}</span>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default App;
