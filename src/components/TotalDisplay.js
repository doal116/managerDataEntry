import { useState, useEffect } from "react";
import {
    payementdisplay, findingWorkers
} from '../func/usefullFunc';

import { CSVLink } from 'react-csv';
const TotalDisplay = ({ dataExport }) => {
    const [workerPay, setWorkerPay] = useState(findingWorkers(dataExport));
    const [csvTotal, setCsvTotal] = useState('');
    useEffect(() => {
        const data = [...findingWorkers(dataExport)];
        dataExport.forEach((elem, i) => {
            data.forEach((worker, i) => {
                if (elem['workerId'] === worker['name']) {
                    worker['sum'] = worker['sum'] + elem['wage'];
                }
            })
        })
        setWorkerPay(data);

    }, [dataExport]);
    const handleExport = (data) => {
        let csvFormat = 'workerId,totalPay\n';
        data.forEach((elem, i) => {
            const line = elem['name'] + ',' + elem['sum'] + '\n';
            csvFormat += line;
        });
        setCsvTotal(csvFormat);
    }
    const styling = {
        bottomL: { 'borderBottomLeftRadius': '10px' },
        bottomR: { 'borderBottomRightRadius': '10px' },
        topL: { 'borderTopLeftRadius': '10px' },
        topR: { 'borderTopRightRadius': '10px' }
    };
    return (
        <div className='TotalDisplay'>
            <div className='title'>
                <div style={styling['topL']}>WokerId</div>
                <div style={styling['topR']}>Total Pay</div>
            </div>
            {
                workerPay.map((elem, i) =>
                    <div key={i.toString()} className='worker'

                    >
                        <div
                            className='workerIds'>{elem['name']}</div>
                        <div
                            className='totalpay'>{payementdisplay(elem['sum'])} BIF</div>
                    </div>
                )
            }
            <CSVLink
                className='exportTotal'
                onClick={() => handleExport(workerPay)}
                data={csvTotal}
                filename={`totalPerWorkerID`}
            >Export</CSVLink>
        </div>
    )
}

export default TotalDisplay;