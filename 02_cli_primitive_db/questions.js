export const userNameQuestion = {
    type: 'input',
    name: 'name',
    message: "Enter the user's name. To cancel press ENTER:"
};

export const userDataQuestion = [
    {
        type: 'list',
        name: 'gender',
        message: 'Choose your Gender.',
        choices: ['male', 'female']

    },
    {
        type: 'number',
        name: 'age',
        message: 'Enter your age:'
    }
];

export const showDataQuestion = {
    type: 'confirm',
    name: 'confirm',
    message: 'Whould you like to search values in DB?'
};

export const findUserByNameQuestion = {
    type: 'input',
    name: 'userName',
    message: "Enter user's name you wanna find in DB:"
}

