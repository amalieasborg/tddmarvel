const { expect } = require('chai');
const request = require('supertest')
const app=require('../../server');
const {description} = require("mocha/lib/cli/init");


describe('Marvel helte API', ()=>{

    /**
     * Test GET-metoden for alle helte
     */
    describe('GET /heroes', ()=>{
        it('should get all the heroes', (done)=>{
            chai.request(app).get('/heroes').end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                done();
            });
        });
    });

    /**
     * Test GET-metoden for en enkelt helt ved brug af et givent id
     */
    describe('GET /heroes/:id', ()=>{
        it('should get a single hero by id', (done)=>{
            const id = 1;
            chai.request(app)
                .get(`/heroes/${id}`)
                .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id', id);
                res.body.should.have.property('name', name);
                res.body.should.have.property('alias', alias);
                res.body.should.have.property('powers', powers);
                done();
            });
        });
        it('should return 404 if the hero is not found', (done)=>{
            const id = 55;
            chai.request(app)
                .get(`/heroes/${id}`)
                .end((err,res) => {
                res.should.have.status(404);
                res.body.should.have.property('message').should.be.eql('Hero not found');
                done();
            });
        });
    });

    /**
     * Test POST-metoden for en enkelt helt
     */
    describe('POST /heroes', ()=>{
        it('should create a new hero', (done)=>{
            const newHero = {
                id: 6,
                name: 'Peter Quill',
                alias: 'Star-Lord',
                powers: ['Flying boots','Dual-wield blasters','Space mask']
            };
            chai.request(app)
                .post('/heroes')
                .send(newHero)
                .end((err,res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id', newHero.id);
                res.body.should.have.property('name', newHero.name);
                res.body.should.have.property('alias', newHero.alias);
                res.body.should.have.property('powers', newHero.powers);
                done();
            });
        });
        it('should not create a new hero without required fields', (done)=>{
            const newHero = {
                id: 7,
                alias: 'unknown hero',
            };
            chai.request(app)
            .post('/heroes')
            .send(newHero)
            .end((err,res) => {
                res.should.have.status(400);
                res.body.should.have.property('message', "All fields are required");
                done();
            });
        });
    });

    /**
     * Test PUT-metoden for at update en helt på et givent id
     */
    describe('PUT /heroes/:id', ()=>{
        it('should update an existing hero', (done)=>{
            const updatedHero = {
                name:'Steve Rogers',
                alias: 'Captain America',
                powers: ['Super strength','Enhanced agility','Enhanced reflexes','Peak human physique']
            };
            chai.request(app)
            .put(`/heroes/1`)
            .send(updatedHero)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name', updatedHero.name);
                res.body.should.have.property('alias', updatedHero.alias);
                res.body.should.have.property('powers', updatedHero.powers).include('Rizz');
                done();
            });
        });
        it('should return 404 if the hero to update is not found', (done)=>{
            const updatedHero = {
                name: 'FAKE!!!',
                alias:'FAKER!',
                powers: ['Super strength','Enhanced agility']
            };
            chai.request(app)
            .put(`/heroes/55`)
            .send(updatedHero)
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.have.property('message').should.be.eql('Hero not found');
                done();
            });
        });
    });
    /**
     * Test DELETE-metoden for at delete en helt på et givent id
     */
    describe('DELETE /heroes/:id', ()=>{
        it('should delete an existing hero', (done)=>{
            chai.request(app)
            .delete(`/heroes/1`)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').should.eql('Hero deleted');
                done();
            });
        });
        it('should return 404 if the hero to delete is not found', (done)=>{
            chai.request(app)
            .delete(`/heroes/47`)
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.have.property('message').should.eql('Hero not found');
                done();
            });
        });
    });
});