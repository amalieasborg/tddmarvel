const chai=require('chai');
const chaiHttp=require('chai-http');
const server=require('../../server');
const should=chai.should();

chai.use(chaiHttp);

describe('Marvel helte API', ()=>{
    /**
     * Test GET-metoden for alle helte
     */
    describe('GET /heroes', ()=>{
        it('should get all the heroes', (done)=>{
            chai.request(server).get('/heroes').end((err,res) => {
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

        })
    })


    /**
     * Test POST-metoden for en enkelt helt
     */
    describe()

})