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
    
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                /*console.log(res.body);*/
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
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
            .send({'name' : 'Kale', 'id' : '2'})
            .end(function(err, res) {
                
                done();
            });
    });
    it('should POST without body data', function(done) {
        chai.request(app)
            .post('/items')
            .send({})
            .end(function(err, res) {
                
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                
                done();
            });
    });
    it('should POST with something other than valid JSON', function(done) {
        chai.request(app)
            .post('/items')
            .send("Kale")
            .end(function(err, res) {
                res.should.have.status(400);
                done();
            });
    });
    it('should PUT without an ID in the endpoint');
    it('should PUT with different ID in the endpoint than the body');
    it('should PUT to an ID that doesnt exist');
    it('should PUT without body data', function(done) {
        chai.expect(chai.request(app)
            .put('/items/2')
            .send({})
            .end(function(err, res) {
                res.should.have.status(400);
                done();
            }));
    });
    it('should PUT with something other than valid JSON');
    it('should DELETE an ID that doesnt exist');
    it('should DELETE without an ID in the endpoint');
});


    
