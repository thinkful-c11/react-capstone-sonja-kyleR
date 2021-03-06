const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {TEST_DATABASE_URL, PORT} = require('./config');

const Categories = require('./models/categorySchema');
const UnhealthyFoods = require('./models/unhealthyFoodSchema');
const HealthyFoods = require('./models/healthyFoodSchema');

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('../client/src/'));

app.get('/api', (req, res) => {
    Categories
        .find()
        .exec()
        .then(tastes => {
            res.json(tastes);
        })
        .catch(err => console.error(err));
});

app.get('/api/unhealthyfoods', (req, res) => {
    UnhealthyFoods
        .find()
        .sort({name: 1})
        .exec()
        .then(allFoods => {
            res.json(allFoods);
        })
        .catch(err => console.error(err));
});

app.get('/api/healthyfoods', (req, res) => {
    HealthyFoods
        .find()
        .exec()
        .then(allFoods => {
            res.json(allFoods);
        })
        .catch(err => console.error(err));
});

app.get('/api/:category', (req, res) => {
    UnhealthyFoods
        .find({
            category: req.params.category
        })
        .exec()
        .then(unhealthyfood => {
            res.json(unhealthyfood);
        })
        .catch(err => console.error(err));
});

app.get('/api/:category/:unhealthyfood', (req, res) => {
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

app.get('/api/healthy/:unhealthyfood', (req, res) => {
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

app.post('/api/:category', (req, res) => {
    Categories
        .create({
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

app.post('/api/unhealthy/:unhealthyfood', (req, res) => {
    UnhealthyFoods
        .create({
            category: "unknown",
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

app.post('/api/healthy/:unhealthyfood/:healthyfood', (req, res) => {
    HealthyFoods
        .create({
            name: req.params.healthyfood,
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

app.delete('/api/:category/:unhealthyfood/:healthyfood', (req, res) => {
    HealthyFoods
        .remove({
            correspondingUnhealthyFood: req.params.unhealthyfood,
            name: req.params.healthyfood
        })
        .then(_res => res.status(204).json(
            {deleted: {
                name: req.params.healthyfood,
                correspondingUnhealthyFood: req.params.unhealthyfood
            }}
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Failed to delete'});
        });
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

let server;
function runServer(port=PORT, databaseUrl=TEST_DATABASE_URL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                  return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
