// Knex database initialization
const knex = require('knex');
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: "movies.db"
    },
    useNullAsDefault: true
});

// Service Layer Functions

const displayMovies = async () => {
    //console.log('Hola que tal');
    return await db('contentTitle').select('*');
};

const registerMovies = async (titleType, primaryTitle,year, runtimeMinutes, genres) => {
    const [id] = await db('contentTitle').insert({
        titleType,
        primaryTitle,
        year,
        runtimeMinutes,
        genres
    });
    return await db('contentTitle').where({ id }).first();
};

const deleteMovies = async (id) => {
    return await db('contentTitle').where({ id }).del();
};

const modifyMovies = async (id, titleType, primaryTitle, year, runtimeMinutes, genres) => {
    return await db('contentTitle')
        .where({ id })
        .update({
            titleType,
            primaryTitle,
            year,
            runtimeMinutes,
            genres
        });
};

const displayMovieById = async (id) => {
    return await db('contentTitle').where({ id }).first();
};

// Module Exports
module.exports = {
    displayMovies,
    registerMovies,
    deleteMovies,
    modifyMovies,
    displayMovieById
};
