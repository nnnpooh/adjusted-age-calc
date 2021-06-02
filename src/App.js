//import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import { addDays, differenceInDays } from 'date-fns';
import { Input, Button } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

function App() {
  const [birthDate, setBirthDate] = useState(new Date('02/14/2021'));
  const [GAWeek, setGAWeek] = useState(25);
  const [GADayAdd, setGADayAdd] = useState(0);
  const [logDate, setLogDate] = useState(new Date('05/14/2021'));
  function splitWeekDay(numDay) {
    let week = 0;
    let dayAdd = 0;
    if (numDay >= 0) {
      dayAdd = numDay % 7;
      week = Math.floor(numDay / 7);
    } else {
      const n = Math.abs(numDay);
      dayAdd = -(Math.ceil(n / 7) * 7 - n);
      week = -Math.floor(n / 7);
    }
    return [week, dayAdd];
  }

  const AdBoD = addDays(birthDate, (40 - GAWeek) * 7 - GADayAdd);
  const CADay = differenceInDays(logDate, birthDate);
  const [CAWeek, CADayAdd] = splitWeekDay(CADay);
  const PCA = GAWeek * 7 + GADayAdd + CADay;
  let AJ = '';
  let AJWeek = '';
  let AJDayAdd = '';
  if (differenceInDays(AdBoD, birthDate) > 0) {
    AJ = GAWeek * 7 + GADayAdd + CADay - 280;
    [AJWeek, AJDayAdd] = splitWeekDay(AJ);
  }

  const onChangeBirthDayCalendar = (event, data) => setBirthDate(data.value);
  const onChangeLogDateCalendar = (event, data) => setLogDate(data.value);
  const onChangeGAWeek = (event, data) => {
    const value = parseInt(data.value);
    if (value) {
      setGAWeek(value);
    } else {
      setGAWeek(0);
    }
  };

  const onChangeGADayAdd = (event, data) => {
    const value = parseInt(data.value);
    if (value) {
      setGADayAdd(value);
    } else {
      setGADayAdd(0);
    }
  };

  return (
    <>
      <h1>Hello</h1>

      <SemanticDatepicker onChange={onChangeBirthDayCalendar} />
      <Input placeholder='อายุครรภ์ (สัปดาห์) ' onChange={onChangeGAWeek} />
      <Input placeholder='อายุครรภ์ (วัน) ' onChange={onChangeGADayAdd} />
      <SemanticDatepicker onChange={onChangeLogDateCalendar} />

      <p>{birthDate.toDateString()}</p>
      <p>{AdBoD.toDateString()}</p>
      <p>{CADay}</p>
      <p>{CAWeek}</p>
      <p>{CADayAdd}</p>
      <p>{PCA}</p>
      <p>{AJ}</p>
      <p>{AJWeek}</p>
      <p>{AJDayAdd}</p>
    </>
  );
}

export default App;
