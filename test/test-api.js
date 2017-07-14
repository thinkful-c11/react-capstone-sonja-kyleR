const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const Categories = require('../server/models/categorySchema');
const UnhealthyFoods = require('../server/models/unhealthyFoodSchema');
const HealthyFoods = require('../server/models/healthyFoodSchema');

const {TEST_DATABASE_URL} = require('../server/config'); 
const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Api', function() {
    before(function(){
        return runServer(undefined, TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });
    
    describe('get /api', function() {
        it('should return categories', function() {
            return chai.request(app)
                .get('/api')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('get /api/unhealthyfoods', function() {
        it('should return ALL unhealthyfoods', function() {
            return chai.request(app)
                .get('/api/unhealthyfoods')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('get /api/healthyfoods', function() {
        it('should return ALL healthyfoods', function() {
            return chai.request(app)
                .get('/api/healthyfoods')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('get /api/healthyfoods', function() {
        it('should return ALL healthyfoods', function() {
            return chai.request(app)
                .get('/api/healthyfoods')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('get /api/:category', function() {
        it('should return all unhealthyfoods in given category', function() {
            return chai.request(app)
                .get('/api/pastry')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('get /api/:category/:unhealthyfood', function() {
        it('should return healthyfoods for its corresponding unhealthy food', function() {
            return chai.request(app)
                .get('/api/candy/sweet-candy')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('get /api/healthy/:unhealthyfood', function() {
        it('should return healthyfoods for its corresponding unhealthy food', function() {
            return chai.request(app)
                .get('/api/healthy/sweet-candy')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
    
    describe('post /api/:category', function() {
        it('should add a category', function() {
            const CATEGORY = 'test-bullshit';
            return chai.request(app)
                    .post(`/api/${CATEGORY}`)
                    .then(function(res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        Object.keys(res.body).length.should.be.at.least(1);
                        return Categories.find({name: CATEGORY });
                    })
                    .then(res => {
                        res[0].name.should.equal(CATEGORY);
                    });
        });
    });
    
    describe('post /api/unhealthy/:unhealthyfood', function() {
        it('should add an unhealthyfood', function() {
            const BADFOOD = 'test-bullshit';
            return chai.request(app)
                    .post(`/api/unhealthy/${BADFOOD}`)
                    .then(function(res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        Object.keys(res.body).length.should.be.at.least(1);
                        return UnhealthyFoods.find({
                            // fix this later
                            category: 'unknown',
                            name: BADFOOD
                        });
                    })
                    .then(res => {
                        res[0].name.should.equal(BADFOOD);
                    });
        });
    });
    
    describe('post /api/:category/:unhealthyfood/:healthyfood', function() {
        it('should add a healthyfood', function() {
            const GOODFOOD = 'test-bullshit';
            return chai.request(app)
                    .post(`/api/healthy/TEST/${GOODFOOD}`)
                    .then(function(res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        Object.keys(res.body).length.should.be.at.least(1);
                        return HealthyFoods.find({
                            correspondingUnhealthyFood: 'TEST',
                            name: GOODFOOD
                        });
                    })
                    .then(res => {
                        res[0].name.should.equal(GOODFOOD);
                    });
        });
    });
    
    describe('delete /api/:category/:unhealthyfood/:healthyfood', function() {
        it('should delete a healthy food', function() {
            const GOODFOOD = 'test-bullshit';
            return chai.request(app)
                    .delete(`/api/healthy/TEST/${GOODFOOD}`)
                    .then(function(res) {
                        res.should.have.status(204);
                        Object.keys(res.body).length.should.equal(0);
                        return HealthyFoods.find({
                            correspondingUnhealthyFood: 'TEST',
                            name: GOODFOOD
                        });
                    })
                    .then(res => {
                        res.length.should.equal(0);
                    });
        });
    });
});