import { useState } from 'react';
import { managerData } from '../manager/mangerData';
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

export default ManagerSelected;