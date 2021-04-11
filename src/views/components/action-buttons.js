const ActionButtons = ({ isCounterStarted, handlePlayPause, handleReset }) => {
  return (
    <div className="action-buttons">
      <button onClick={handlePlayPause}><i className={`fa fa-${isCounterStarted ? "pause" : "play"}`} /></button>
      <button onClick={handleReset}><i className="fa fa-refresh" /></button>
    </div>
  );
};

export default ActionButtons;
