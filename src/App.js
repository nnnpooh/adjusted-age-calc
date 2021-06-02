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

  let AdBoD = '';
  let AJ = '';
  let CADay = '';
  let PCA = '';
  let GA = '';
  if (GAWeek && GADayAdd) GA = GAWeek * 7 + GADayAdd;
  if (GAWeek && GADayAdd && birthDate && logDate) {
    AdBoD = addDays(birthDate, (40 - GAWeek) * 7 - GADayAdd);
    CADay = differenceInDays(logDate, birthDate);
    PCA = GAWeek * 7 + GADayAdd + CADay;
    if (differenceInDays(AdBoD, birthDate) > 0) {
      AJ = GAWeek * 7 + GADayAdd + CADay - 280;
    }
  }

  const onChangeBirthDayCalendar = (event, data) => setBirthDate(data.value);
  const onChangeLogDateCalendar = (event, data) => setLogDate(data.value);
  const onChangeGAWeek = (event, data) => {
    const value = parseInt(data.value);
    if (value) {
      setGAWeek(value);
    } else {
      setGAWeek(null);
    }
  };

  const onChangeGADayAdd = (event, data) => {
    const value = parseInt(data.value);
    if (value) {
      setGADayAdd(value);
    } else {
      setGADayAdd(null);
    }
  };

  function displayListItem(text, icon, header) {
    return (
      <List.Item>
        <Icon name={icon} />
        <List.Content>
          <List.Header>{header}</List.Header>
          <List.Description>{text}</List.Description>
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
  return (
    <>
      <Menu fixed='top' inverted color={'purple'} widths={1}>
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
              'Date of Birth'
            )}

            {displayListItem(
              formatTextDate(AdBoD),
              'birthday cake',
              'Adjusted Date of Birth'
            )}
            {displayListItem(
              formatTextDay(CADay),
              'clock',
              'Chronological Age, CA '
            )}
            {displayListItem(
              formatTextDay(PCA),
              'clock',
              'Post Conceptional Age, PCA '
            )}
            {displayListItem(formatTextDay(AJ), 'time', 'Adjusted Age, AJ')}
          </List>
        </Segment>
      </Container>
    </>
  );
}

export default App;
