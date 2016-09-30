global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    it('should POST to an ID that exists', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name' : 'Kale'})
            .end(function(err, res) {
                console.log(storage.items);
                /*should.equal(err, "[Error: Not Found]");  */
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    it('should POST without body data', function() {
        chai.request(app)
            .post('/items')
            .send({})
            .end(function(err, res) {
                /*console.log(err, "A");*/
                
                should.equal(err, "Bad Request");
                
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                
                
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                /*storage.items[3].name.should.be.a('string');*/
                storage.items[3].name.should.equal('');
                done();
            });
    });
    it('should POST with something other than valid JSON');
    it('should PUT without an ID in the endpoint');
    it('should PUT with different ID in the endpoint than the body');
    it('should PUT to an ID that doesnt exist');
    it('should PUT without body data');
    it('should PUT with something other than valid JSON');
    it('should DELETE an ID that doesnt exist');
    it('should DELETE without an ID in the endpoint');
})