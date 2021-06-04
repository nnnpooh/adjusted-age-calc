//import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import { addDays, differenceInDays, format } from 'date-fns';
import {
  Input,
  List,
  Icon,
  Header,
  Grid,
  Container,
  Segment,
  Menu,
} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [GAWeek, setGAWeek] = useState(null);
  const [GADayAdd, setGADayAdd] = useState(null);
  const [logDate, setLogDate] = useState('');
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

  let AdDoB = '';
  let AJ = '';
  let CADay = '';
  let PCA = '';
  let GA = '';
  let textWarningCA = false;
  let textWarningAJ = false;
  let textWarningAdDoB = false;
  if (GAWeek === parseInt(GAWeek) && GADayAdd === parseInt(GADayAdd)) {
    GA = GAWeek * 7 + GADayAdd;
    if (birthDate && logDate) {
      AdDoB = addDays(birthDate, (40 - GAWeek) * 7 - GADayAdd);
      CADay = differenceInDays(logDate, birthDate);
      PCA = GAWeek * 7 + GADayAdd + CADay;
      if (differenceInDays(AdDoB, birthDate) > 0) {
        AJ = GAWeek * 7 + GADayAdd + CADay - 280;
      } else {
        AJ = '';
        textWarningAJ = true;
        textWarningAdDoB = true;
      }
      if (CADay < 0) textWarningCA = true;
      if (AJ < 0) textWarningAJ = true;
    }
  }

  const onChangeBirthDayCalendar = (event, data) => setBirthDate(data.value);
  const onChangeLogDateCalendar = (event, data) => setLogDate(data.value);
  const onChangeGAWeek = (event, data) => {
    const value = parseInt(data.value);
    if (value || value === 0) {
      setGAWeek(value);
    } else {
      setGAWeek(null);
    }
  };

  const onChangeGADayAdd = (event, data) => {
    const value = parseInt(data.value);
    if (value || value === 0) {
      setGADayAdd(value);
    } else {
      setGADayAdd(null);
    }
  };

  function displayListItem(text, icon, header, color) {
    return (
      <List.Item>
        <Icon name={icon} />
        <List.Content>
          <List.Header>{header}</List.Header>
          <List.Description style={{ color: color }}>{text}</List.Description>
        </List.Content>
      </List.Item>
    );
  }

  function formatTextDay(day) {
    if (day) {
      const [week, dayAdd] = splitWeekDay(day);
      return `${day} วัน (${week} สัปดาห์ ${dayAdd} วัน)`;
    } else {
      return '';
    }
  }

  function formatTextDate(d) {
    if (Object.prototype.toString.call(d) === '[object Date]') {
      // it is a date
      if (isNaN(d.getTime())) {
        // d.valueOf() could also work
        // date is not valid
        return '';
      } else {
        // date is valid
        return format(d, 'EEEE dd/MM/yyyy');
      }
    } else {
      // not a date
      return '';
    }
  }

  /*   console.log({
    birthDate,
    GAWeek,
    GADayAdd,
    logDate,
    AdDoB,
    AJ,
    CADay,
    PCA,
    GA,
  }); */
  return (
    <>
      <Menu fixed='top' inverted widths={1} className="tw-bg-purple-700">
        <Container>
          <Menu.Item>Adjusted Age Calculation</Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: '4em' }}>
        <Segment>
          <Grid stackable columns={3}>
            <Grid.Column style={{ margin: '0em' }}>
              <Header as='h4'>Date of Birth</Header>
              <SemanticDatepicker
                onChange={onChangeBirthDayCalendar}
                format={'DD/MM/YYYY'}
              />
            </Grid.Column>
            <Grid.Column style={{ margin: '0em' }}>
              <Header as='h4'>Gestational Age, GA </Header>
              <Input
                label={{ basic: true, content: 'Week' }}
                labelPosition='right'
                placeholder='Week'
                onChange={onChangeGAWeek}
              />
              <Input
                label={{ basic: true, content: 'Day' }}
                labelPosition='right'
                placeholder='Day'
                onChange={onChangeGADayAdd}
                style={{ marginTop: '8px' }}
              />
            </Grid.Column>
            <Grid.Column style={{ margin: '0em' }}>
              <Header as='h4'>Today</Header>
              <SemanticDatepicker
                onChange={onChangeLogDateCalendar}
                format={'DD/MM/YYYY'}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <List relaxed>
            {displayListItem(formatTextDay(GA), 'clock', 'Gestational Age, GA')}

            {displayListItem(
              formatTextDate(birthDate),
              'birthday cake',
              'Date of Birth',
              'black'
            )}

            {displayListItem(
              formatTextDate(AdDoB),
              'birthday cake',
              'Adjusted Date of Birth',
              textWarningAdDoB ? 'red' : 'black'
            )}
            {displayListItem(
              formatTextDay(CADay),
              'clock',
              'Chronological Age, CA ',
              textWarningCA ? 'red' : 'black'
            )}
            {displayListItem(
              formatTextDay(PCA),
              'clock',
              'Post Conceptional Age, PCA ',
              'black'
            )}
            {displayListItem(
              formatTextDay(AJ),
              'time',
              'Adjusted Age, AJ',
              textWarningAJ ? 'red' : 'black'
            )}
          </List>
        </Segment>
        <p style={{ textAlign: 'right', fontSize: '12px', color: 'gray' }}>
          {' '}
          V1.1
        </p>
      </Container>
    </>
  );
}

export default App;
