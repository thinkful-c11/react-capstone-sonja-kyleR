const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

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
                .get('/api/healthy/energy-drinks')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);
                });
        });
    });
})