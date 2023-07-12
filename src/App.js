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
const DataEntry = ({ userDetails, handleDataExport, finalData, setFinalData }) => {
  const [wage, setWage] = useState('');
  const handleWage = (num) => {
    if (num) {
      labData.forEach((elem) => {
        if (elem['number'] === num) {
          setWage(elem['type']);
        }
      })
    }
  }

  const [time, setTime] = useState('');
  const handleTime = (e) => {
    if (e !== '') setTime(e.target.value);
    else setTime('')
  }

  const [labId, setLabId] = useState('');
  const handleLabId = (e) => {
    if (e !== '') {
      handleWage(parseInt(e.target.value));
      setLabId(parseInt(e.target.value));
    }
    else setLabId('');
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



  const [sectionVerified, setSectionVerified] = useState([
    { name: 'Biography', status: false },
    { name: 'Antecedant', status: false },
    { name: 'Medical', status: false },
    { name: 'Analyse Sanguine', status: false }
  ]);
  const handleSectionVerif = (sec) => {
    const newArr = [...sectionVerified];
    if (sec !== '') {
      newArr.forEach((elem) => {
        if (elem['name'] === sec) {
          elem['status'] = !elem['status'];
        } else elem['status'] = false;
      });
      setSectionVerified(newArr);
    } else {
      newArr.forEach((elem) => {
        elem['status'] = false;
      });
      setSectionVerified(newArr);
    }

  }


  const handleFinalData = () => {
    const sectionVerifi = sectionVerified.filter(elem => elem['status']);
    const data = {
      date: userDetails['date'],
      labId: labId,
      workerId: workerSelected,
      supervisorId: selectedclass,
      timeCompleted: time,
      sectionVerified: sectionVerifi[0]['name'],
      wage: wage === 'High wage' ? 350 : 250
    };
    setFinalData(data);
    handleDataExport(data);
    handleLabId('');
    handleWorkerSelected('');
    handleTime('');
    handleSectionVerif('');
    handleSelClass('');
  }

  const [class12, setClass12] = useState(false);
  const handleClass12 = () => setClass12(!class12);

  const [selectedclass, setClass] = useState('');
  const handleSelClass = (elem) => {
    setClass(elem);
    setWorkerSelected('')
  }
  const [workerSelected, setWorkerSelected] = useState('');
  const handleWorkerSelected = (class12) => {
    setWorkerSelected(class12);
  }
  return (
    <div className='DataEntry'>
      <div className='date'>Date: {userDetails['date']}</div>
      <div className='workers'>
        <div className='selectClass' onClick={() => handleClass12()}>
          {selectedclass ? selectedclass : <span style={{ 'fontSize': '16px', 'padding': '0px 6px 0px 6px' }}>Select your class</span>}
          <div
            className='class12'
            style={class12 ? { 'display': 'block' } : { 'display': 'none' }}
          >
            {
              [workers[0]['class'], workers[1]['class']].map(
                (elem, i) =>
                  <div
                    className='class'
                    key={i.toString()}
                    onClick={() => handleSelClass(elem)}
                  >{elem}</div>
              )
            }
          </div>
        </div>
        <div className='class1' onClick={() => handleClassClick(0)}>
          {workerSelected ? workerSelected : <span style={{ 'fontSize': '16px', 'padding': '0px 6px 0px 6px' }}>WorkerID</span>}
          <div className='listWorker'
            style={classClick['class1'] ? { 'display': 'block' } : { 'display': 'none' }}>
            {
              workers[selectedclass === workers[0]['class'] ? 0 : 1]['worker'].map((elem, i) =>
                <div
                  className='workerId'
                  key={i.toString()}
                  onClick={() => handleWorkerSelected(elem['id'])}
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
          value={time}
          onChange={handleTime}
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
      <div className='addBtn' onClick={handleFinalData}>ADD</div>
    </div >
  )
}
const classesfinder = (data) => {
  const classes = {
    class1: '',
    class2: ''
  }

  data.forEach((elem) => {
    if (classes['class1'] === '') classes['class1'] = elem['supervisorId'];
    if (classes['class1'] !== '') {
      if (classes['class2'] === '' && elem['supervisorId'] !== classes['class1']) {
        classes['class2'] = elem['supervisorId'];
      }
    }
  })
  return classes;
}
const RowName = ({ row }) => {
  return (
    <div className='row'>
      {
        row.map(
          (elem, i) => <div key={i.toString()} className='r main'>{elem}</div>)
      }

    </div>
  )
}
const Data = ({
  dataExport, userDetails, csvTransfer,
  handleSubmition, handleIndexDeletion, indexDeletion,
  handleDelete }) => {
  const classes = classesfinder(dataExport);
  const row = [
    'Date', 'Lab Id', 'Section Verified', 'Time Completed', 'Wage', 'Worker Id', 'index'
  ];

  return (
    <div className='Data'>
      <div className='class1'>
        <span>{classes['class1']}</span>
        <div className='datadisplay'>
          <RowName row={row} />
          {
            dataExport.map((elem, i) => {
              if (elem['supervisorId'] === classes['class1'])
                return <div className='row' key={i.toString()}>
                  <div className='r'>{elem['date']}</div>
                  <div className='r'>{elem['labId']}</div>
                  <div className='r'>{elem['sectionVerified']}</div>
                  <div className='r'>{elem['timeCompleted']}</div>
                  <div className='r'>{elem['wage']}</div>
                  <div className='r'>{elem['workerId']}</div>
                  <div className='r'>{i}</div>
                </div>
              return ''
            })
          }
        </div>

      </div>
      <div className='class2'>
        <span>{classes['class2']}</span>
        <div className='datadisplay'>
          <RowName row={row} />
          {
            dataExport.map((elem, i) => {
              if (elem['supervisorId'] === classes['class2'])
                return <div className='row' key={i.toString()}>
                  <div className='r'>{elem['date']}</div>
                  <div className='r'>{elem['labId']}</div>
                  <div className='r'>{elem['sectionVerified']}</div>
                  <div className='r'>{elem['timeCompleted']}</div>
                  <div className='r'>{elem['wage']}</div>
                  <div className='r'>{elem['workerId']}</div>
                  <div className='r'>{i}</div>
                </div>
              return ''
            })
          }
        </div>
      </div>
      <div className='bottomSelection'>
        <div
          className='sendData'
          onClick={() => handleSubmition(userDetails['name'], csvTransfer)}

        >Send Data ({dataExport.length})
        </div>
        <input
          placeholder='Index number'
          type='number'
          value={indexDeletion}
          onChange={handleIndexDeletion}
        >
        </input>
        <div className='deletion' onClick={() => handleDelete()}>Delete</div>
      </div>


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
  const [dataExport, setDataExport] = useState([]);
  const handleDataExport = (finalData) => {
    const newArr = [...dataExport];
    newArr.push(finalData);
    setDataExport(newArr);
  }
  const [finalData, setFinalData] = useState('');
  const [indexDeletion, setIndex] = useState('')
  const handleIndexDeletion = (e) => {
    if (e !== '') setIndex(parseInt(e.target.value))
    setIndex(e.target.value);
  }
  const handleDelete = () => {
    if (indexDeletion) {
      const newArr = [...dataExport];
      newArr.splice(indexDeletion, 1);
      setDataExport(newArr);
    }
  }
  const [dataClick, setDataClick] = useState(false);
  const handleDataClick = () => {
    setDataClick(!dataClick);
  }
  const [csvTransfer, setCsvTransfer] = useState('');
  const handleSubmition = (managerName, csv) => {
    console.log('clicked');
    const name = managerName;
    const csvFinal = csv;
    setCsvTransfer('');
    setDataExport([]);
    const mailtoLink = `mailto:alex.boulganine12@gmail.com?subject=${name} &body=${encodeURIComponent(csvFinal)}`;
    window.location.href = mailtoLink;
    localStorage.removeItem('cpds');
  }

  useEffect(() => {

    let csvFomat = 'SupervisorID,WorkerID,LabID,Date,TimeCompleted,SectionVerified,FormPay\n';
    dataExport.forEach(elem => {
      let csvstring = elem['supervisorId'] + ',' + elem['workerId'] +
        ',' + elem['labId'] + ',' + elem['date'] +
        ',' + elem['timeCompleted'] + ',' + elem['sectionVerified'] +
        ',' + elem['wage'] + '\n';
      csvFomat += csvstring;
    });
    localStorage.setItem('cpds', csvFomat);
    setCsvTransfer(csvFomat);
  }, [dataExport])
  return (
    <div className="home">
      <div className='header'>
        <span className='main'>Productivity Studies</span>
        <span className='sub'>Manager Section</span>
        {
          userDetails['name'] ?
            <div className='user'>
              <div
                className='exit'
                onClick={() => {
                  setUserDetails({
                    name: '',
                    date: ''
                  }); handleManager('')
                }}
              >
                <span>Exit</span>
              </div>
              <span
                className='userName'
              >
                {
                  userDetails['name'] ?
                    userDetails['name'].toUpperCase()
                    : ''
                }
              </span>

              <div
                className='checkList'
                onClick={() => handleDataClick()}
              >{dataClick ? `Back (${(dataExport.length).toString()})` : `Data (${(dataExport.length).toString()})`}</div>
            </div> : <></>
        }
      </div>
      {
        userDetails['name'] ?
          dataClick ?
            <Data
              dataExport={dataExport} userDetails={userDetails}
              csvTransfer={csvTransfer} handleSubmition={handleSubmition}
              handleIndexDeletion={handleIndexDeletion} indexDeletion={indexDeletion}
              handleDelete={handleDelete}
            /> : <DataEntry userDetails={userDetails} handleDataExport={handleDataExport} finalData={finalData} setFinalData={setFinalData} />
          : <ManagerSelected manager={manager}
            handleManager={handleManager}
            handleUserDetails={handleUserDetails} />

      }
    </div>
  );
}

export default App;
