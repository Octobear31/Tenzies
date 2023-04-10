import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [lost, setLost] = useState(false);
  const [rolls, setRolls] = useState(10);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
    if (rolls === 0) {
      setLost(true);
    }
  }, [dice, rolls]);

  // useEffect(() => {
  //   if (rolls === 0) {
  //     setLost(true);
  //   }
  // }, [rolls]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      result: false,
      tenzies: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies && !lost) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRolls((oldroll) => oldroll - 1);
    } else if (lost) {
      setDice(allNewDice());
      setRolls(10);
      setLost(false);
      setTenzies(false);
    } else {
      setTenzies(false);
      setLost(false);
      setDice(allNewDice());
      setRolls(10);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      result={lost}
      tenzies={tenzies}
    />
  ));

  return (
    <div className="container-for-main">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        {rolls <= 0 && !tenzies ? (
          <p>Unfortunately, you have no rolls left!</p>
        ) : (
          <p>Rolls left: {rolls}</p>
        )}
        {tenzies && <p>Congrats! You've won!</p>}
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies || lost
            ? "New Game"
            : rolls === 0
            ? "Accept defeat"
            : "Roll"}
        </button>
        {/* <p>lost = {lost.toString()}</p>
        <p>tenzies = {tenzies.toString()}</p> */}
      </main>
    </div>
  );
}

export default App;
