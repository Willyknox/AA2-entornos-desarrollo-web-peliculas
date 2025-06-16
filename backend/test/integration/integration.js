const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../src/app');

chai.use(chaiHttp);
chai.should();

describe('movies', () => {
    describe('GET /api/movies', () => {
        it('should get all movies', (done) => {
            chai.request(app)
                .get('/api/movies')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    if (response.body.length > 0) {
                        expect(response.body[0]).to.have.property('id');
                        expect(response.body[0]).to.have.property('titleType');
                        expect(response.body[0]).to.have.property('primaryTitle');
                        expect(response.body[0]).to.have.property('year');
                        expect(response.body[0]).to.have.property('runtimeMinutes');
                        expect(response.body[0]).to.have.property('genres');
                    }
                    done();
                });
        });
    });

    describe('POST /api/movies', () => {
        it('should register a new movie', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    titleType: 'movie',
                    primaryTitle: 'Test Movie',
                    year: 2020,
                    runtimeMinutes: 120,
                    genres: 'Drama'
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('titleType');
                    expect(response.body).to.have.property('primaryTitle');
                    expect(response.body).to.have.property('year');
                    expect(response.body).to.have.property('runtimeMinutes');
                    expect(response.body).to.have.property('genres');
                    expect(response.body.primaryTitle).to.equal('Test Movie');
                    done();
                });
        });

        it('validation should fail because primaryTitle is mandatory', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    titleType: 'movie',
                    year: 2020,
                    runtimeMinutes: 120,
                    genres: 'Drama'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('primaryTitle field is mandatory');
                    done();
                });
        });

        it('validation should fail because year must be a number', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    titleType: 'movie',
                    primaryTitle: 'Test Movie',
                    year: 'not-a-year',
                    runtimeMinutes: 120,
                    genres: 'Drama'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('year must be a number');
                    done();
                });
        });
    });
});