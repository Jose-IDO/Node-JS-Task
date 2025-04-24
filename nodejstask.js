const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());

function initializeDataFile() {
    if (!fs.existsSync(dataFilePath)) {
        const initialData = {
            movies: ['batman', 'superman-chronicles', 'Interstellar', 'the greatest showman'],
            songs: ['akon-put the blame on me', 'drake-hotline bling', 'forrest frank-All the time', 'housefires-build my life'],
            series: [
                ['the penguin', 2023],
                ['the walking dead', 2010],
                ['smallville', 2001],
                ['black mirror', 2011]
            ],
            movieinfo: [
                ['batman', 1989],
                ['superman-chronicles', 1978],
                ['Interstellar', 2014],
                ['the greatest showman', 2017]
            ]
        };
        fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
    }
}

initializeDataFile();

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
    <title>API Documentation</title>
</head>
<body>
    <h1>Welcome to the API</h1>
    <p>endpoints:</p>
    <ul>
        <li><strong>GET /movies</strong>: Retrieve the list of movies</li>
        <li><strong>GET /songs</strong>: Retrieve the list of songs</li>
        <li><strong>GET /series</strong>: Retrieve the list of series</li>
        <li><strong>PUT /movies</strong>: Update the movies list</li>
        <li><strong>PUT /songs</strong>: Update the songs list</li>
        <li><strong>PUT /series</strong>: Update the series list</li>
        <li><strong>DELETE /movies</strong>: Delete a movie</li>
        <li><strong>DELETE /songs</strong>: Delete a song</li>
        <li><strong>DELETE /series</strong>: Delete a series</li>
    </ul>
</body>
</html>`);
});

app.route('/movies')
    .get((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        res.json({ message: 'Movies list', movies: data.movies });
    })
    .put((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        data.movies[0] = 'Everything, Everywhere, All At Once';
        data.movies[1] = 'Inception';
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ message: 'Movies updated', movies: data.movies });
    })
    .delete((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        data.movies.splice(0, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ message: 'Movie deleted', movies: data.movies });
    });

app.route('/songs')
    .get((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        res.json({ message: 'Songs list', songs: data.songs });
    })
    .put((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        data.songs[0] = 'sean kingston - beautiful girls';
        data.songs[1] = 'Jaden Smith - summertime in paris';
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ message: 'Songs updated', songs: data.songs });
    })
    .delete((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        data.songs.splice(0, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ message: 'Song deleted', songs: data.songs });
    });

// Series endpoint
app.route('/series')
    .get((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        res.json({ message: 'Series list', series: data.series });
    })
    .put((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        data.series[0] = ['Breaking Bad', 2008];
        data.series[1] = ['Stranger Things', 2016];
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ message: 'Series updated', series: data.series });
    })
    .delete((req, res) => {
        const data = JSON.parse(fs.readFileSync(dataFilePath));
        data.series.splice(0, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ message: 'Series deleted', series: data.series });
    });

// Handle non-existent paths
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});