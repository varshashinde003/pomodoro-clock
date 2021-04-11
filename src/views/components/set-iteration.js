const SetIterationComponent = ({
  isSetIterationCount,
  iterationCount,
  handleIterationCountChange,
}) => {
  if (!isSetIterationCount >= 1) {
    return (
      <div className="actions-wrapper">
        <p>Specify number of iterations</p>
        <button onClick={handleIterationCountChange("decrement")}>-</button>
        <span>{iterationCount || 1}</span>
        <button onClick={handleIterationCountChange("increment")}>+</button>
      </div>
    );
  } else {
    return <h1>Current iteration: {iterationCount || 1}</h1>;
  }
};

export default SetIterationComponent;
