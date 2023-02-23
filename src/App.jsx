import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [targetArr, setTargetArr] = useState([]);
  const [target, setTarget] = useState(undefined);

  //State to set the "first render" of the game.
  const [firstRender, setFirstRender] = useState(false);

  //Timer states.
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // State to define if the game has started or not
  const [isPlaying, setIsPlaying] = useState(false);

  //Score states.
  const [score, setScore] = useState(0);

  // API Call, setting up data from countries and the target flags array.
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the Countries API
  const fetchData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        data.sort(() => Math.random() - 0.5);
        const newData = data.slice(0, 20);
        setData(newData);
        setTargetArr(newData.map(country => country.name.official));
        setFirstRender(true);
      })
      .catch(error => console.error(error));
  };

  // Function to re-fetch the data and reset all the states. Used if the player press the "retry" button.
  const refetchData = () => {
    setData(null);
    setFirstRender(false);
    setTime(0);
    setScore(0);
    fetchData();
  };

  // This effect changes "first render" state so that the clock starts and the first target is found.
  useEffect(() => {
    setIsPlaying(true);
    findTargets();
  }, [firstRender]);

  // This effect handles the search for a new target every time the player clicks a flag.
  useEffect(() => {
    findTargets();
  }, [targetArr]);

  // This function determines if there is a new target to be found:
  // If there is, it will search for a new target.
  // If there is not a new target, this function will end the game.
  const findTargets = () => {
    let index = Math.floor(Math.random() * targetArr.length);
    document.getElementById("sideContainer").style.visibility = "visible";
    setTarget(targetArr[index]);
    if (targetArr.length === 0) {
      setIsPlaying(false);
      document.getElementById("sideContainer").style.visibility = "hidden";
    }
  };

  // This is a handler for when the user clicks a flag:
  // Checks if the flag clicked is the same as the target, if so changes the flag opacity and also removes it from the targets array.
  // Every time the user clicks the "findTargets" function is run to find a new target flag.
  const checkTarget = (countryName, e) => {
    if (e.target.classList != "flag completed") {
      if (countryName === target) {
        e.target.classList.add("completed");
        setTargetArr(prevTargets => prevTargets.filter(t => t !== target));
        setScore(prev => prev + 10);

        const elm = document.createElement("div");
        elm.className = "hint correct";
        elm.textContent = "CORRECT!";
        document.body.appendChild(elm);

        setTimeout(() => {
          elm.remove();
        }, 1500);
      } else {
        findTargets();

        const hint = document.createElement("div");
        hint.className = "hint countryHint";
        hint.textContent = "That flag is from " + countryName;
        document.body.appendChild(hint);

        const elm = document.createElement("div");
        elm.className = "hint incorrect";
        elm.textContent = "INCORRECT!";
        document.body.appendChild(elm);

        setTimeout(() => {
          elm.remove();
        }, 1500);
        setTimeout(() => {
          hint.remove();
        }, 2000);

        if (score > 0) {
          setScore(prev => prev - 5);
        }
      }
    }
  };

  // This is a handler for the timer.
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    console.log(seconds);
  }, [isPlaying]);

  useEffect(() => {
    if (data) {
      let elements = Array.from(document.querySelectorAll(".flag"));
      console.log(elements);
      elements.map((elm, i) => {
        setTimeout(() => {
          elm.style.height = "120px";
        }, 100 * i);
      });
    }
  }, [data]);

  // Constant for the timer
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div className="App">
      <div className="topContainer">
        {target ? (
          <div className="targetContainer">
            <h3 className="targetText">Find the flag of: </h3>
            <h2 className="target">{target}</h2>
          </div>
        ) : (
          ""
        )}
      </div>
      {data ? (
        <div className="flagContainer">
          {data.map((country, i) => (
            <img
              className="flag"
              src={country.flags.png}
              alt={"The flag of " + country.name.official}
              onClick={e => {
                checkTarget(country.name.official, e);
              }}
              key={country.cioc}
            />
          ))}
        </div>
      ) : (
        <div key="loading">Loading...</div>
      )}
      <div id="sideContainer" className="sideContainer">
        <h4 className="timerTitle">TIMER</h4>
        {time ? (
          <p className="timer">
            {hours !== 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ""}
            {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
            {seconds < 10 ? `0${seconds}` : `${seconds}`}
          </p>
        ) : (
          ""
        )}
        <p className="scoreTitle">SCORE</p>
        <p className="score">{score}</p>
      </div>
      {isPlaying ? (
        ""
      ) : (
        <dialog className="modal">
          <h2 className="modalTitle">COMPLETED</h2>
          <p className="modalScoreText">SCORE</p>
          <span className="modalScore">{score}</span>
          <p className="modalTimeText">TIME</p>
          <p className="modalTime">
            {hours !== 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ""}
            {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
            {seconds < 10 ? `0${seconds}` : `${seconds}`}
          </p>
          <p className="modalFinalScoreText">FINAL SCORE</p>
          <span className="modalFinalScore">{score - Math.ceil(time / 6000)}</span>
          <button className="modalBtn --restart" onClick={refetchData}>
            REPLAY
          </button>
          <button className="modalBtn --leaderboard">LEADERBOARD</button>
        </dialog>
      )}
    </div>
  );
}

export default App;
