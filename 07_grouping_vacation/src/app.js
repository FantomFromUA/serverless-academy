import fs from 'fs';


function readData(){
    try {
        const data = fs.readFileSync('./files/data.json', 'utf-8');
        const vacations = JSON.parse(data);
        return vacations;
    } catch (err) {
        throw new Error('Problen ocure while reading the file')
    }
}

function saveData(groupedVacations){
    try {
        fs.writeFileSync('./files/groupedData.json', JSON.stringify(groupedVacations, null, 2), 'utf-8');
    } catch (err) {
        throw new Error(err)
    }
}

function groupVacations(vacations){
    const groupedVacations = [];
    for(let i in vacations){
        const id = groupedVacations.findIndex(a => a._id === vacations[i].user._id);
        if(id === -1){
            groupedVacations.push({
                _id: vacations[i].user._id,
                name: vacations[i].user.name,
                vacations: [
                    {
                        startDate: vacations[i].startDate,
                        endDate: vacations[i].endDate
                    }
                ]
            });
            continue;
        }

        groupedVacations[id].vacations.push({
            startDate: vacations[i].startDate,
            endDate: vacations[i].endDate
        });
    }

    return groupedVacations;
}

function start(){
    const vacations = readData();
    const groupedVacations = groupVacations(vacations);
    saveData(groupedVacations);
}

start();