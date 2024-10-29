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
            chai.request(app).get('/heroes/:id').end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id', id);
                res.body.should.have.property('name', name);
                res.body.should.have.property('alias', alias);
                res.body.should.have.property('powers', powers);
                done();
            })
        })
    })

    /**
     * Test POST-metoden for en enkelt helt
     */

    describe()

})