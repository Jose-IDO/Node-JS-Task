const http = require('http');
const hostname = `127.0.0.1`;
const port = 3000;

let movies = [`batman`, `superman-chronicles`, `Interstellar`, `the greatest showman`, ``, ``];

let songs = [`akon-put the blame on me`, `drake-hotline bling`, `forrest frank-All the time`, `housefires-build my life`];

let movieinfo = [
    ['batman', 1989],
    ['superman-chronicles', 1978],
    ['Interstellar', 2014],
    ['the greatest showman', 2017]
];

let series = [
    ['the penguin', 2023],
    ['the walking dead', 2010],
    ['smallville', 2001],
    ['black mirror', 2011]
]

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === `/movieinfo`) {
        if (req.method === `POST`) {
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `available movies`, movieinfo: movieinfo }));
        }
    }

    if (req.url === '/movies') {
        if (req.method === `GET`) {
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `Movies list`, movies: movies }));
        }

        if (req.method === `PUT`) {
            movies[4] = `Everything, Everywhere, All At Once`;
            movies[5] = `Inception`;
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `Movies updated`, movies: movies }));
        }

        if (req.method === `DELETE`) {
            movies.splice(0, 1);
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `Movie deleted`, movies: movies }));
        }
    }

    if (req.url === '/songs') {
        if (req.method === `GET`) {
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `Songs list`, songs: songs }));
        }

        if (req.method === `PUT`) {
            songs[4] = `sean kingston - beautiful girls`;
            songs[5] = `Jaden Smith - summertime in paris`;
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `Songs updated`, songs: songs }));
        }

        if (req.method === `DELETE`) {
            songs.splice(0, 1);
            res.statusCode = 200;
            res.setHeader(`content-type`, `application/json`);
            res.end(JSON.stringify({ message: `Song deleted`, songs: songs }));

        } 
    } else {
        res.statusCode = 404; 
        res.end()
}

    if (['PUT', 'DELETE', 'GET', 'POST'].includes(req.method)) {
        console.log("Request processed for movies or songs");

    }
});

server.listen(port, hostname, () => console.log("Server running..."));