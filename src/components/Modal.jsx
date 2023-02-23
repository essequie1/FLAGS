const Modal = ({ time, score, refetch }) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
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
      <button className="modalBtn --restart" onClick={refetch}>
        REPLAY
      </button>
      <button className="modalBtn --leaderboard">LEADERBOARD</button>
    </dialog>
  );
};

export default Modal;
