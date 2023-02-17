import React, { useState } from "react";
import axios from "axios";
import "../style/css/calculator.css";

const Calculator = () => {
  const [calc, setCalc] = useState(" ");
  const [operCheck, setOperCheck] = useState(true);

  const number_buttons = [
    "AC",
    " ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  const operator = ["+", "-", "*", "/", "="];

  const getNum = (e) => {
    if (!isNaN(e.target.value)) {
      setCalc((prev) =>
        prev === "0" ? e.target.value : prev + e.target.value.toString()
      );
      setOperCheck(true);
    }
    console.log(e.target.value);
  };

  const getOper = (e) => {
    console.log(e.target.outerText);
    if (operCheck) {
      setCalc((prev) => prev + e.target.outerText);
      setOperCheck(false);
    }
  };

  const getResult = (e) => {
    let replace_str = calc.replace(/×/gi, "*").replace(/÷/gi, "/");

    if (isNaN(eval(replace_str))) {
      setCalc("0");
    } else if (eval(replace_str) == Infinity) {
      alert("0으로 나눌수 없습니다.");
      setCalc("0");
      return false;
    } else {
      setCalc((prev) => eval(replace_str));
      const result = parseInt(eval(replace_str))
      console.log(result)
      axios.post(`http://localhost:8080/api/${result}/`);
    }
  };

  const buttons = number_buttons.map((number, index) => (
    <li
      key={index}
      value={number}
      onClick={number === "AC" ? () => setCalc(" ") : getNum}
    >
      {number}
    </li>
  ));

  const operators = operator.map((opr, index) => (
    <li key={index} onClick={opr !== "=" ? getOper : getResult}>
      {opr}
    </li>
  ));

  return (
    <div className="container">
      <div className="calcu_container">
        <div className="calcu_title">
          <p>Calculator</p>
        </div>
        <div className="calcu_result">
          <p>{calc}</p>
        </div>
        <div className="numbers_input">
          <ul id="buttons">{buttons}</ul>
          <ul id="operators">{operators}</ul>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
