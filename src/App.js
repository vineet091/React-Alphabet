import { useEffect, useRef, useState } from "react";
import "./styles.css";
const AppStructure = [[1, 2, 3], [4], [5, 6, 7]];

const debounce = (func, time) => {
  let timer;
  return (...args) => {
    if (timer || !args.length) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
};
export default function App() {
  const [appState, setAppState] = useState([]);
  useEffect(() => {
    this.debounce = debounce(setTimer, 2000);
  }, []);

  useEffect(() => {
    if (appState.length) {
      this.debounce(appState);
    }
  }, [appState]);
  const setTimer = (count) => {
    console.log(count);
    let appCount = [...count];
    appCount.pop();
    setAppState(appCount);
  };

  const onColClick = (cellId) => {
    if (appState.length) {
      const apps1 = [...appState, cellId];
      setAppState(apps1);
    } else {
      setAppState([cellId]);
    }
  };

  return (
    <div className="App">
      <Table appState={appState} onColClick={onColClick} />
    </div>
  );
}

const Table = ({ appState, onColClick }) => {
  return (
    <table className="table">
      <Row appState={appState} onColClick={onColClick}></Row>
    </table>
  );
};

const Row = ({ appState, onColClick }) => {
  const rows = [];
  for (var i = 0; i < AppStructure.length; i++) {
    var colData = AppStructure[i];
    var cols = [];
    for (var j = 0; j < colData.length; j++) {
      cols.push(
        <Col
          key={colData[j]}
          colId={colData[j]}
          onColClick={onColClick}
          appState={appState}
        />
      );
    }
    rows.push(<tr key={`tr-${i}`}>{cols}</tr>);
  }
  return rows;
};

const Col = ({ colId, onColClick, appState }) => {
  return (
    <td
      className={`col ${appState.indexOf(colId) > -1 ? "selected" : ""}`}
      onClick={() => onColClick(colId)}
    ></td>
  );
};
