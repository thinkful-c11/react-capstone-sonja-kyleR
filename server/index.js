//schemas
const Tastes = require('./models/tasteSchema');
const Categories = require('./models/categorySchema');
const UnhealthyFoods = require('./models/unhealthyFoodsSchema');
const HealthyFoods = require('./models/healthyFoodsSchema');

const path = require('path');
const express = require('express');

const app = express();

// API endpoints go here!

app.get('/', (req, res) => {
    Tastes
        .find()
        .exec()
        .then(tastes => {
            res.json(tastes);
        })
        .catch(err => console.error(err));
});

app.get('/:taste', (req, res) => {
    Categories
        .find({taste: req.params.taste})
        .exec()
        .then(category => {
            res.json(category);
        })
        .catch(err => console.error(err));
});

app.get('/:taste/:category', (req, res) => {
    UnhealthyFoods
        .find({
            taste: req.params.taste,
            category: req.params.category
        })
        .exec()
        .then(unhealthyfood => {
            res.json(unhealthyfood);
        })
        .catch(err => console.error(err));
});

app.get('/:taste/:category/:unhealthyfood', (req, res) => {
    HealthyFoods
        .find({
            correspondingUnhealthyFood: req.params.unhealthyfood,
        })
        .exec()
        .then(healthyfood => {
            res.json(healthyfood);
        })
        .catch(err => console.error(err));
});

app.get('/unhealthyfoods', (req, res) => {
    UnhealthyFoods
        .find()
        .exec()
        .then(allFoods => {
            res.json(allFoods);
        })
        .catch(err => console.error(err));
});

app.post('/:taste', (req, res) => {
    Tastes
        .create({name: req.params.taste})
        .then(taste => res.status(201).json(taste))
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create taste',
                error: err
            });
        });
});

app.post('/:taste/:category', (req, res) => {
    Categories
        .create({
            taste: req.params.taste,
            name: req.params.category
        })
        .then(category => res.status(201).json(category))
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create category',
                error: err
            });
        });
});

app.post('/:taste/:category/:unhealthyfood', (req, res) => {
    UnhealthyFoods
        .create({
            taste: req.params.taste,
            category: req.params.category,
            name: req.params.unhealthyfood
        })
        .then(unhealthyfood => res.status(201).json(unhealthyfood))
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create unhealthyfood',
                error: err
            });
        });
});

app.post('/:taste/:category/:unhealthyfood/:healthyfood', (req, res) => {
    HealthyFoods
        .create({
            name: req.params.healthfood,
            correspondingUnhealthyFood: req.params.unhealthyfood
        })
        .then(healthyfood => res.status(201).json(healthyfood))
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create unhealthyfood',
                error: err
            });
        });
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
