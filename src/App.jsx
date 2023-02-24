import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal";
import BottomContainer from "./components/BottomContainer";
import FlagContainer from "./components/FlagContainer";
import TopContainer from "./components/TopContainer";
import Menu from "./components/Menu";

function App() {
  const [data, setData] = useState(null);
  const [targetArr, setTargetArr] = useState([]);
  const [target, setTarget] = useState(undefined);

  //State to set the "first render" of the game.
  //Timer states.
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // State to define if the game has started or not.
  const [isPlaying, setIsPlaying] = useState(false);

  // This states defines if the "first render" (Mount) of the App has gone through or not.
  const [isFirstRender, setIsFirstRender] = useState(false);

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
      })
      .catch(error => console.error(error));
  };

  // Function to re-fetch the data and reset all the states. Used if the player press the "retry" button.
  const refetchData = () => {
    setData(null);
    setIsPlaying(true);
    setTime(0);
    setScore(0);
    fetchData();
  };

  // This effect handles the search for a new target every time the player clicks a flag.

  const startGame = () => {
    setIsPlaying(true);
    setIsFirstRender(true);
    findTargets();
  };

  useEffect(() => {
    if (isPlaying) {
      findTargets();
    }
  }, [targetArr]);
  // This function determines if there is a new target to be found:
  // If there is, it will search for a new target.
  // If there is not a new target, this function will end the game.
  const findTargets = () => {
    let index = Math.floor(Math.random() * targetArr.length);
    setTarget(targetArr[index]);
    if (targetArr.length === 0) {
      let side = document.getElementById("bottomContainer");
      side.animate([{ transform: "translateY(500px)" }], {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(.35,-0.14,.28,1.36)",
      });
      let top = document.getElementById("topContainer");
      top.animate([{ transform: "translateY(-500px)" }], {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(.35,-0.14,.28,1.36)",
      });
      setTimeout(() => {
        setIsPlaying(false);
      }, 500);
    }
  };

  // This is a handler for when the user clicks a flag:
  // Checks if the flag clicked is the same as the target, if so changes the flag opacity and also removes it from the targets array.
  // Every time the user clicks the "findTargets" function is run to find a new target flag.
  const checkTarget = (countryName, e) => {
    if (e.target.classList != "flagContainer__flag--completed") {
      if (countryName === target) {
        e.target.classList.remove("flagContainer__flag");
        e.target.classList.add("flagContainer__flag--completed");
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
      // Animations for game start.
      setTimeout(() => {
        let side = document.getElementById("bottomContainer");
        side.animate([{ transform: "translateY(0px)" }], {
          duration: 500,
          fill: "forwards",
          easing: "cubic-bezier(.35,-0.14,.28,1.36)",
        });
        let top = document.getElementById("topContainer");
        top.animate([{ transform: "translateY(0px)" }], {
          duration: 500,
          fill: "forwards",
          easing: "cubic-bezier(.35,-0.14,.28,1.36)",
        });
        // Functions for starting the clock.
        const id = setInterval(() => {
          setTime(prevTime => prevTime + 10);
        }, 10);
        setIntervalId(id);
      }, 100);
    } else {
      clearInterval(intervalId);
    }
  }, [isPlaying]);

  return (
    <div className="App">
      {isPlaying ? (
        <>
          <TopContainer target={target} />
          {data ? <FlagContainer data={data} checkTarget={checkTarget} /> : <div key="loading">Loading...</div>}
          <BottomContainer time={time} score={score} />
        </>
      ) : (
        <>
          {isFirstRender ? (
            <Modal score={score} time={time} refetch={refetchData} isFirstRender={isFirstRender} />
          ) : (
            <Menu startGame={startGame} isFirstRender={isFirstRender} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
