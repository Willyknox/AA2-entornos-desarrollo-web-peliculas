const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

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

                        expect(response.body[0]).to.have.property('id');
                        expect(response.body[0]).to.have.property('titleType');
                        expect(response.body[0]).to.have.property('primaryTitle');
                        expect(response.body[0]).to.have.property('year');
                        expect(response.body[0]).to.have.property('runtimeMinutes');
                        expect(response.body[0]).to.have.property('genres');
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

    describe('GET /api/movies/:id', () => {
        it('should return a movie by id (success)', (done) => {
            // First, create a movie to get its id
            chai.request(app)
                .post('/api/movies')
                .send({
                    titleType: 'movie',
                    primaryTitle: 'GetById Movie',
                    year: 2021,
                    runtimeMinutes: 100,
                    genres: 'Action'
                })
                .end((err, res) => {
                    const id = res.body.id;
                    chai.request(app)
                        .get(`/api/movies/${id}`)
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body).to.have.property('id', id);
                            expect(response.body).to.have.property('primaryTitle', 'GetById Movie');
                            done();
                        });
                });
        });
        it('should return 404 if movie does not exist (fail)', (done) => {
            chai.request(app)
                .get('/api/movies/999999')
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    describe('PUT /api/movies/:id', () => {
        it('should update a movie (success)', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    titleType: 'movie',
                    primaryTitle: 'Update Movie',
                    year: 2022,
                    runtimeMinutes: 110,
                    genres: 'Comedy'
                })
                .end((err, res) => {
                    const id = res.body.id;
                    chai.request(app)
                        .put(`/api/movies/${id}`)
                        .send({
                            titleType: 'movie',
                            primaryTitle: 'Updated Movie',
                            year: 2023,
                            runtimeMinutes: 115,
                            genres: 'Drama'
                        })
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body.message).to.equal('Movie updated');
                            done();
                        });
                });
        });
        it('should fail to update a non-existent movie (fail)', (done) => {
            chai.request(app)
                .put('/api/movies/999999')
                .send({
                    titleType: 'movie',
                    primaryTitle: 'Nonexistent',
                    year: 2023,
                    runtimeMinutes: 115,
                    genres: 'Drama'
                })
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    describe('DELETE /api/movies/:id', () => {
        it('should delete a movie (success)', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    titleType: 'movie',
                    primaryTitle: 'Delete Movie',
                    year: 2024,
                    runtimeMinutes: 120,
                    genres: 'Thriller'
                })
                .end((err, res) => {
                    const id = res.body.id;
                    chai.request(app)
                        .delete(`/api/movies/${id}`)
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body.message).to.equal('Movie deleted');
                            done();
                        });
                });
        });
        it('should fail to delete a non-existent movie (fail)', (done) => {
            chai.request(app)
                .delete('/api/movies/999999')
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
});