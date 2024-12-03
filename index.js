const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

const pollData = [
    {
        "_id": 1,
        "Question": "Which sport you like most?",
        "options": [
            {
                "sport": "Cricket",
                "vote": 7
            },
            {
                "sport": "Football",
                "vote": 8
            },
            {
                "sport": "Basketball",
                "vote": 5
            },
            {
                "sport": "Tennis",
                "vote": 6
            },
            {
                "sport": "badminton",
                "vote": 9
            }
        ]
    }
]
app.use(express.json())

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index', { title: 'Poll Widget' })
})

app.get('/get-poll-options', (req, res) => {
    res.json({ ok: true, data: pollData})
})

app.post('/update-poll-option', (req, res) => {
    const {sport} = req.body;
    console.log('sport -- ', sport)
    pollData[0].options.forEach((option) => {
        if (sport === option.sport) {
            ++option.vote
        }
    })

    return res.json({ ok: true, data: pollData});
})

app.listen(PORT, (req, res) => {
    console.log("App Started on App:" + PORT);
});