const ClockCounter = ({ currentTimerName, clockCounter, convertToTime }) => {
  return (
    <div className="clock-counter">
      <h1 className="heading">{currentTimerName}</h1>
      <div className="countdown">{convertToTime(clockCounter)}</div>
    </div>
  );
};

export default ClockCounter;
