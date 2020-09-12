const db = require('../config/database');
const Event = require('../models/Event');

let newEvent = [
    new Event({
        title: 'Hello 1',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 2',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 3',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 4',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 5',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 6',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 7',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 8',
        description: 'Hello from Taha',
        date: Date.now()
    }),
    new Event({
        title: 'Hello 9',
        description: 'Hello from Taha',
        date: Date.now()
    })
]

for (let i = 0; i < newEvent.length; i++) {
    newEvent[i].save((err) => {
        if (!err) {
            console.log("Created new document !");
        } else {
            console.log("Failed !");
        }
    })
}

