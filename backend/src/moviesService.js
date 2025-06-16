// Knex database initialization
const knex = require('knex');
const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost', 
        user: 'admin',      
        password: 'admin',  
        database: 'contentTitle'     
    }
});



const displayMovies = async () => {
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


module.exports = {
    displayMovies,
    registerMovies,
    deleteMovies,
    modifyMovies
};
