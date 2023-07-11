import { useEffect, useState } from 'react';
import './home.css';
import './App.css';
import { managerData } from './manager/mangerData';
import { labData } from './wageData/wage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const ManagerSelected = ({ manager, handleManager, handleUserDetails }) => {
  const [nameClick, setNameClick] = useState(false);
  const handleNameClick = () => setNameClick(!nameClick);
  const [date, setDate] = useState('');
  const handleDate = (e) => {
    setDate(e.target.value)
  }
  return (
    <div className='ManagerSelected'>
      <h3>Select your name:</h3>
      <div className='listOfManager' onClick={handleNameClick}>
        <span>{manager ? manager.toUpperCase() : 'Name'}</span>
        <div className='transparencyM' style={
          nameClick ? { 'display': 'block' } :
            { 'display': 'none' }} >
          {
            managerData.map((manager, i) =>
              <div
                key={i.toString() + manager['name']}
                className='mangerName'
                onClick={() => handleManager(manager['name'])}
              >
                {manager['name'].toUpperCase()}
              </div>
            )
          }
        </div>

      </div>
      <h3>Select the date:</h3>
      <input
        type='date'
        value={date}
        onChange={handleDate}
      >
      </input>
      <button onClick={() => handleUserDetails(date)}>Continue</button>
    </div>
  );
}
const workerIds = (managerData, name) => {
  let data;
  managerData.forEach((elem) => {
    if (elem['name'] === name) {
      data = elem['workersId']
    }
  })
  return data;
}
const DataEntry = ({ userDetails }) => {
  const [wage, setWage] = useState('');
  const handleWage = (num) => {
    labData.forEach((elem) => {
      if (elem['number'] === num) {
        setWage(elem['type']);
      }
    })
  }
  const [labId, setLabId] = useState('');
  const handleLabId = (e) => {
    if (e.target.value !== '') {
      handleWage(parseInt(e.target.value));
      setLabId(parseInt(e.target.value));
    }
    else setLabId(e.target.value);
  }
  const [workers, setWokers] = useState(workerIds(managerData, userDetails['name']));
  useEffect(() => {
    managerData.forEach((elem) => {
      if (elem['name'] === userDetails['name']) {
        if (!workers) { setWokers({ ...['workersId'] }); }
      }
    });

  }, [workers, userDetails]);
  const [classClick, setClassClick] = useState({
    class1: false,
    class2: false
  });
  const handleClassClick = (class12) => {
    if (class12 === 0) {
      setClassClick({
        class1: !classClick['class1'],
        class2: false
      })
    } else {
      setClassClick({
        class1: false,
        class2: !classClick['class2']
      })
    }
  }
  const [workerSelected, setWorkerSelected] = useState({
    class1: '',
    class2: ''
  });
  const handleWorkerSelected = (class12, workerId) => {
    if (class12 === 0) {
      setWorkerSelected({
        class1: workerId,
        class2: workers[1]['class']
      })
    } else {
      setWorkerSelected({
        class1: workers[0]['class'],
        class2: workerId
      })
    }
  }

  const [sectionVerified, setSectionVerified] = useState([
    { name: 'Biography', status: false },
    { name: 'Antecedant', status: false },
    { name: 'Medical', status: false },
    { name: 'Analyse Sanguine', status: false }
  ]);

  const handleSectionVerif = (sec) => {
    const newArr = [...sectionVerified];
    newArr.forEach((elem) => {
      if (elem['name'] === sec) {
        elem['status'] = !elem['status'];
      }
    });
    setSectionVerified(newArr);
  }
  return (
    <div className='DataEntry'>
      <div className='date'>Date: {userDetails['date']}</div>
      <div className='workers'>
        <div className='class1' onClick={() => handleClassClick(0)}>
          {workers ? workerSelected['class1'] ? workerSelected['class1'] : workers[0]['class'] : ''}
          <div className='listWorker'
            style={classClick['class1'] ? { 'display': 'block' } : { 'display': 'none' }}>
            {
              workers[0]['worker'].map((elem, i) =>
                <div
                  className='workerId'
                  key={i.toString()}
                  onClick={() => handleWorkerSelected(0, elem['id'])}
                >{elem['id']}</div>
              )
            }
          </div>
        </div>

        <div className='class2' onClick={() => handleClassClick(1)}>
          {workers ? workerSelected['class2'] ? workerSelected['class2'] : workers[1]['class'] : ''}
          <div className='listWorker' style={classClick['class2'] ? { 'display': 'block' } : { 'display': 'none' }}>
            {
              workers[1]['worker'].map((elem, i) =>
                <div
                  className='workerId'
                  key={i.toString()}
                  onClick={() => handleWorkerSelected(1, elem['id'])}
                >{elem['id']}</div>
              )
            }
          </div>
        </div>
      </div>
      <label><span>LAB ID:</span>
        <input
          type='number'
          value={labId}
          onChange={handleLabId}
        >
        </input>
      </label>
      <label><span>Time Completed:</span>
        <input
          type='time'
        >
        </input>
      </label>
      <span className='Verifi'>Section Verified</span>
      <div className='sectionVerified'>

        {[
          'Biography', 'Antecedant',
          'Medical', 'Analyse Sanguine'].map(
            (sec, i) =>
              <div
                key={i.toString()}
                className='sec'
                onClick={() => handleSectionVerif(sec)}
              >
                {
                  sectionVerified[i]['status'] ?
                    <i><FontAwesomeIcon icon={faCheckSquare} /></i> :
                    <div className='square'></div>

                }
                {sec}</div>
          )
        }
      </div>
      <div className='wage'>{wage.toUpperCase()}</div>
    </div>
  )
}
function App() {
  const [manager, setManager] = useState('');
  const handleManager = (manager) => {
    setManager(manager)
  };
  const [userDetails, setUserDetails] = useState({
    name: '',
    date: ''
  });
  const handleUserDetails = (date) => {
    setUserDetails({ date: date, name: manager });
  }
  return (
    <div className="home">
      <div className='header'>
        <span className='main'>Productivity Studies</span>
        <span className='sub'>Manager Section</span>
        {
          userDetails['name'] ?
            <div className='user'>
              <span
                className='userName'
              >{
                  userDetails['name'] ?
                    userDetails['name'].toUpperCase()
                    : ''}</span>
              <div
                className='exit'
                onClick={() => {
                  setUserDetails({
                    name: '',
                    date: ''
                  }); handleManager('')
                }}
              ><span>Exit</span>
              </div>
            </div> : <></>
        }
      </div>
      {
        userDetails['name'] ? <DataEntry userDetails={userDetails} />
          : <ManagerSelected manager={manager}
            handleManager={handleManager}
            handleUserDetails={handleUserDetails} />

      }
    </div>
  );
}

export default App;
