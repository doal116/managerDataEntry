import { useState, useEffect } from 'react';
import { managerData } from '../manager/mangerData';
import { labData } from '../wageData/wage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
    workerIds, addButtonColorChange
} from '../func/usefullFunc';
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
        if (sectionVerifi.length === 0) {
            sectionVerifi.push({ name: '', status: false })
        };
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

    const [addBtnColor, setAddBtnColor] = useState(false);
    useEffect(() => {
        const green = addButtonColorChange(userDetails['date'], labId,
            workerSelected, selectedclass,
            time, sectionVerified);
        if (green === false) setAddBtnColor(true);
        else setAddBtnColor(false);
    }, [userDetails, labId, workerSelected, selectedclass, time, sectionVerified]);


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
            <div
                className='addBtn'

                style={
                    !addBtnColor ?
                        { 'backgroundColor': 'green' } :
                        { 'backgroundColor': 'red' }}

                onClick={() => {

                    const buttonState = addButtonColorChange(
                        userDetails['date'], labId,
                        workerSelected, selectedclass,
                        time, sectionVerified
                    );

                    if (buttonState) handleFinalData();

                }}>ADD</div>
        </div >
    )
}

export default DataEntry;