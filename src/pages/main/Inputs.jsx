import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Input() {
  const [ageText, setAgeText] = useState({
    day: "--",
    month: "--",
    year: "--",
  });

  const [err, setError] = useState({ day: "", month: "", year: "" });

  const calculateAge = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const birthDay = parseInt(document.querySelector("#day").value) || 0;
    const birthMonth = parseInt(document.querySelector("#month").value) || 0;
    const birthYear = parseInt(document.querySelector("#year").value) || 0;

    if (err.day !== "" || err.month !== "" || err.year !== "") {
      return;
    }

    if (birthDay === 0 && birthMonth === 0 && birthYear === 0) {
      setError((prevState) => ({
        ...prevState,
        day: "required",
        month: "required",
        year: "required",
      }));

      return;
    }

    if (err.day != "" || err.month != "") {
      return;
    }
    if (birthDay == 0 && birthMonth == 0 && birthYear == 0) {
      return;
    }

    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    if (days < 0) {
      months -= 1;
      const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const daysInPreviousMonth = new Date(
        currentYear,
        previousMonth,
        0
      ).getDate();
      days += daysInPreviousMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setError((prevState) => ({
      ...prevState,
      day: "",
      month: "",
      year: "",
    }));

    setAgeText({ day: days, month: months, year: years });
  };

  const handleChange = (e) => {
    const input = e.target.value;

    if (e.target.matches("#day") || e.target.matches("#month")) {
      if (input.length > 2) {
        e.target.value = e.target.value.slice(0, 2);

        return;
      }
    }

    if (e.target.matches("#day")) {
      if (input.length >= 3) {
        setError((prevState) => ({
          ...prevState,
          day: "1-31 only",
        }));

        return;
      }

      if (parseInt(input) > 31) {
        setError((prevState) => ({
          ...prevState,
          day: "invalid date",
        }));

        return;
      }

      setError((prevState) => ({
        ...prevState,
        day: "",
      }));
    } else if (e.target.matches("#month")) {
      if (input.length >= 3) {
        setError((prevState) => ({
          ...prevState,
          month: "invalid month",
        }));

        return;
      }

      if (parseInt(input) > 12) {
        setError((prevState) => ({
          ...prevState,
          month: "1-12 only",
        }));

        return;
      }

      setError((prevState) => ({
        ...prevState,
        month: "",
      }));
    }

    if (e.target.matches("#year")) {
      if (input.length > 4) {
        e.target.value = e.target.value.slice(0, 4);
        return;
      }

      if (input.length <= 3) {
        setError((prevState) => ({
          ...prevState,
          year: "required 4 numbers",
        }));

        return;
      }

      setError((prevState) => ({
        ...prevState,
        year: "",
      }));
    }
  };

  return (
    <>
      <div className="input-wrapper">
        <ul>
          <li>
            <label>DAY</label>
            <div>
              <input
                type="number"
                placeholder="DD"
                id="day"
                onChange={handleChange}
                className={err.day != "" ? "error" : ""}
              />
              <span>{err.day}</span>
            </div>
          </li>
          <li>
            <label>MONTH</label>
            <div>
              <input
                type="number"
                inputMode="numeric"
                placeholder="MM"
                id="month"
                onChange={handleChange}
                className={err.month != "" ? "error" : ""}
              />
              <span>{err.month}</span>
            </div>
          </li>
          <li>
            <label>YEAR</label>
            <div>
              <input
                type="number"
                placeholder="YYYY"
                id="year"
                onChange={handleChange}
                className={err.year != "" ? "error" : ""}
              />
              <span>{err.year}</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="btn-wrapper">
        <div></div>
        <button onClick={calculateAge}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <ul className="days-wrapper">
        <li>
          <span>{ageText.year}</span> years
        </li>
        <li>
          <span>{ageText.month}</span> months
        </li>
        <li>
          <span>{ageText.day}</span> days
        </li>
      </ul>
    </>
  );
}

export default Input;
