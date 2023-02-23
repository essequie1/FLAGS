import { useState, useEffect } from "react";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await query(collection(db, "leaderboard"));
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
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="leaderboard">
          {leaders.map((leader, index) => (
            <p key={index}>{leader.name}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Leaderboard;
