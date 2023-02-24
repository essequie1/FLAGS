import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Leaderboard.scss";

const Leaderboard = ({ close, isFirstRender, time, score }) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [btnStatus, setBtnStatus] = useState(true);
  const [submitted, setSubmitted] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await query(collection(db, "leaderboard"), orderBy("score", "desc"));
      onSnapshot(data, querySnapshot => {
        const databaseInfo = [];
        querySnapshot.forEach(doc => {
          databaseInfo.push(doc.data());
        });
        setLeaders(databaseInfo);
        setLoading(false);
      });
    };
    getData();
    if (isFirstRender) {
      setSubmitted(false);
    }
  }, []);

  const sendScore = () => {
    let finalTime = new Date(time).toISOString().slice(11, 19);
    console.log(finalTime);
    let final = score - Math.floor(time / 6000);
    addDoc(collection(db, "leaderboard"), {
      name: playerName,
      points: score,
      time: finalTime,
      score: final,
    }).then(console.log("Document Added"));
    setSubmitted(true);
  };

  const checkInput = e => {
    let input = document.getElementById("nameInput");
    let btn = document.getElementById("submitBtn");
    if (e.target.value.length > 2) {
      if (input.checkValidity() === true) {
        setBtnStatus(false);
        setPlayerName(e.target.value);
      }
    } else {
      setBtnStatus(true);
    }
  };

  return (
    <div id="leaderboard" className="leaderboard">
      <button className="leaderboard__btn--close" onClick={close}></button>
      {loading ? (
        <p className="leaderboard__loading">Loading...</p>
      ) : (
        <>
          <div className="leaderboard__titles">
            <p>Name</p>
            <p>Points</p>
            <p>Time</p>
            <p>Score</p>
          </div>
          <div className="leaderboard__content">
            {leaders.map((leader, index) => (
              <div className="leaderboard__content__leader" key={index}>
                <p>{leader.name}</p>
                <p>{leader.points}</p>
                <p>{leader.time}</p>
                <p>{leader.score}</p>
              </div>
            ))}
          </div>
          {submitted ? (
            <></>
          ) : (
            <div className="leaderboard__submit">
              <input
                className="leaderboard__submit__input"
                onChange={e => checkInput(e)}
                id="nameInput"
                maxLength={15}
                minLength={3}
                placeholder="YOUR NAME"
                type="text"
              />
              <button className="leaderboard__submit__btn" onClick={sendScore} id="submitBtn" disabled={btnStatus}>
                SEND SCORE
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
