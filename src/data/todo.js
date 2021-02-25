import {v4 as uuidv4} from 'uuid';

const tasks = [
    {
        id: uuidv4(),
        name: "Sleep",
        status: true,
    },
    {
        id: uuidv4(),
        name: "Do home word",
        status: false,
    },
    {
        id: uuidv4(),
        name: "Code ReactJS",
        status: true,
    }
]
export default tasks;