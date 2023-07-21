import { useEffect, useState } from 'react';
import './home.css';
import './App.css';

import Data from './components/Data.js';
import TotalDisplay from './components/TotalDisplay.js';
import DataEntry from './components/DataEntry.js';
import ManagerSelected from './components/MangerSelected.js';


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
      newArr.splice(parseInt(indexDeletion), 1);
      if (newArr.length === 0) {
        localStorage.removeItem('cpds');
        setDataExport([]);
      }
      else setDataExport([...newArr]);
    }
  }
  const handleDataReset = () => {
    setDataExport([]);
    setCsvTransfer('');
    localStorage.removeItem('cpds');
  }
  const [dataClick, setDataClick] = useState(false);
  const handleDataClick = () => {
    setDataClick(!dataClick);
  }
  const [csvTransfer, setCsvTransfer] = useState('');
  const handleSubmition = (managerName, csv) => {
    const name = managerName;
    const csvFinal = csv;
    const mailtoLink = `mailto:alex.boulganine12@gmail.com?subject=${name} &body=${encodeURIComponent(csvFinal)}`;
    window.location.href = mailtoLink;
  }

  useEffect(() => {
    if (localStorage.getItem('cpds') && dataExport.length === 0 && userDetails['name'] !== '') {
      const previousData = localStorage.getItem('cpds');
      const newString = previousData.replace(/\n/g, ",");
      const arr = newString.split(',');
      arr.pop();
      const arr2 = [...arr.slice(7, arr.length)];

      let finalArr = [];
      let j = 0;
      let row = [];

      arr2.forEach((elem, i) => {

        if (j <= 7) {
          row.push(elem);

          j += 1;
        }
        if ((i + 1) % 7 === 0) {
          const newElem = {
            date: row[3],
            labId: parseInt(row[2]),
            workerId: row[1],
            supervisorId: row[0],
            timeCompleted: row[4],
            sectionVerified: row[5],
            wage: parseInt(row[6]),
          };

          finalArr.push(newElem);
          row = [];
          j = 0;
        }
      });
      setDataExport(finalArr);
    }

  }, [userDetails, dataExport])


  useEffect(() => {

    let csvFomat = 'SupervisorID,WorkerID,LabID,Date,TimeCompleted,SectionVerified,FormPay\n';
    dataExport.forEach(elem => {
      let csvstring = elem['supervisorId'] + ',' + elem['workerId'] +
        ',' + elem['labId'] + ',' + elem['date'] +
        ',' + elem['timeCompleted'] + ',' + elem['sectionVerified'] +
        ',' + elem['wage'] + '\n';
      csvFomat += csvstring;
    });
    if (dataExport.length > 0) {
      localStorage.setItem('cpds', csvFomat);
      setCsvTransfer(csvFomat);
    }

  }, [dataExport]);
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
              handleDataReset={handleDataReset}
              dataExport={dataExport} userDetails={userDetails}
              csvTransfer={csvTransfer} handleSubmition={handleSubmition}
              handleIndexDeletion={handleIndexDeletion} indexDeletion={indexDeletion}
              handleDelete={handleDelete}
            /> : <>
              <DataEntry userDetails={userDetails} handleDataExport={handleDataExport} finalData={finalData} setFinalData={setFinalData} />
              <TotalDisplay dataExport={dataExport} />
            </>
          : <ManagerSelected manager={manager}
            handleManager={handleManager}
            handleUserDetails={handleUserDetails} />

      }
    </div>
  );
}

export default App;
