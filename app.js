const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('static'));

// open the database
let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

// create the users table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// create the values saved by users table
db.run(`CREATE TABLE IF NOT EXISTS numberElements (
    element_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id INTEGER NOT NULL,
    algorithm_name TEXT NOT NULL,
    elements INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES users (id)
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// index page
  
app.get('/', (req, res) => {
    let loggedIn = false;
    // check if the user has a valid cookie
    if (req.cookies.user_id) {
        loggedIn = true;
    }
    res.render('index', { username: "", loggedIn, error: ""});
})

// login

app.get('/login', (req, res) => {
    res.render("login", { error: "" });
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    // check if the credentials are valid
    db.get(`SELECT id FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        if(row) {
            // if the credentials are valid, set a cookie
            res.cookie('user_id', row.id, {maxAge: 900000, httpOnly: true});
            res.redirect('/');
        } else {
            res.render('login', {error: "Błędne dane logowania!"});
        }
    });
});

// register

app.get('/register', (req, res) => {
    res.render("register", { error: "" });
});

app.post('/register', async (req, res) => {
    const {username, email, password, passwordconfirm} = req.body;
    
    // check if the password is the same as passwordconfirm
    if (password != passwordconfirm) {
        res.render('register', {error: "Wpisane hasła różnią się!"});
    } else {
        // check if the email is already registered
        db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if(row) {
                res.render('register', {error: "Na podany email jest już zarejestrowane konto!"});
            } else {
                // insert new user into the database
                db.run(`INSERT INTO users (username, email, password) VALUES (?,?,?)`, [username, email, password], function(err) {
                    if (err) {
                        console.error(err.message);
                    }
                    // get the last inserted user
                    db.get(`SELECT id, username FROM users WHERE rowid = ?`, this.lastID, (err, row) => {
                        if (err) {
                            console.error(err.message);
                        }
                        // set a cookie
                        res.cookie('user_id', row.id, {maxAge: 900000, httpOnly: true});
                        res.redirect('/');
                    });
                });
            }
        });
    }
});

// logout

app.get('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/');
});

// profile

app.get('/profile', (req, res) => {
    if (req.cookies.user_id) {
        // user is logged in
        // get user's information from the database
        db.all(`SELECT u.username, u.email, n.algorithm_name, n.elements FROM users u
                JOIN numberElements n ON u.id = n.id
                WHERE u.id = ?`, [req.cookies.user_id], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        if (rows.length > 0) {
            res.render('index', { username: rows[0].username, email: rows[0].email, algorithms: rows, loggedIn: true, error: ""});
        } else {
            db.get(`SELECT username, email FROM users WHERE id = ?`, [req.cookies.user_id], (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if(row){
                    res.render('index', { username: row.username, email: row.email, algorithms: [], loggedIn: true, error: ""});
                }
            });
        }});
    }
});

// saving elements

app.post('/save', (req, res) => {
    if (!req.cookies.user_id) {
        res.redirect('/');
    }
    const {algorithm_name, elements} = req.body;
    db.run(`INSERT INTO numberElements (id, algorithm_name, elements) VALUES (?,?,?)`, [req.cookies.user_id, algorithm_name, elements], function(err) {
        if (err) {
            console.error(err.message);
        }
        res.redirect('/');
    });
});

// loading elements

app.get("/load", (req, res) => {
    if (req.cookies.user_id) {
        db.get(`SELECT elements FROM numberElements WHERE id = ? ORDER BY id DESC LIMIT 1`, [req.cookies.user_id], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if(row){
                res.json({elements: row.elements});
            } else {
                res.render('index', {error: "Brak zapisanych elementów!"});
            }
        });
    }
});

// listening

const PORT = process.env.PORT || 3024;

app.listen(PORT, () => {
    console.log('Authentication service started on port ${PORT}');
});

