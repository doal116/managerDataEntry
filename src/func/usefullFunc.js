export const classesfinder = (data) => {
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

export const payementdisplay = (price) => {
    const data = price.toString();
    let newData = [];
    let j = 0;

    for (let i = data.length - 1; i >= 0; i--) {
        j++;
        newData.unshift(data[i]);
        if (j === 3 && i !== 0) {
            newData.unshift(',');
        }
    }
    const res = newData.join('');
    return res;
}

export const findingWorkers = (data) => {
    const newArr = [];
    const newArrWithObj = [];
    data.forEach((elem, i) => {
        if (!newArr.includes(elem['workerId'])) {
            newArr.push(elem['workerId']);
            newArrWithObj.push({ name: elem['workerId'], sum: 0 });
        }
    });
    return newArrWithObj;
}

export const workerIds = (managerData, name) => {
    let data;
    managerData.forEach((elem) => {
        if (elem['name'] === name) {
            data = elem['workersId']
        }
    })
    return data;
}

export const addButtonColorChange = (
    date, labId,
    workerSelected, selectedclass,
    time, sectionVerified
) => {

    const stringSection = date !== '' && workerSelected !== '' && selectedclass !== '' && time !== '';
    const arraySection = sectionVerified.filter(elem => elem['status']).length > 0;
    const labSection = typeof labId === 'number';
    const labRange = labId >= 101 && labId <= 196;
    if (stringSection && arraySection && labSection && labRange) return true;
    else return false;
}