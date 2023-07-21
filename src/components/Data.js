import { CSVLink } from 'react-csv';
import { classesfinder } from '../func/usefullFunc';

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
    handleDelete, handleDataReset }) => {
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
                <CSVLink
                    data={csvTransfer}
                    filename={`${userDetails['name']}_managerData.csv`}
                    className='sendData'
                    onClick={() => {
                        handleSubmition(userDetails['name'], csvTransfer);
                    }}
                >
                    Send Data ({dataExport.length})
                </CSVLink>

                <input
                    placeholder='Index number'
                    type='number'
                    value={indexDeletion}
                    onChange={handleIndexDeletion}
                >
                </input>
                <div className='deletion' onClick={() => handleDelete()}>Delete</div>
            </div>
            <div className='DataReset'
                onClick={() => handleDataReset()}
            >
                Data Reset
            </div>
        </div>
    )
}

export default Data;