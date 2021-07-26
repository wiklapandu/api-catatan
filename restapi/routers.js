// * pathing
const pathing = '/catatan';

// ? Handler
const {
    getAllCatatan, addCatatan,
    getCatatanById, putCatatanById,
    deleteCatatanById,
} = require('./handler');

// * Routers
const routers = [
    {
        // to Post Data
        path: `${pathing}`,
        method: 'POST',
        handler: addCatatan,
    },
    {
        // to Get Data
        path: `${pathing}`,
        method: 'GET',
        handler: getAllCatatan,
    },
    {
        // to Get Data
        path: '/',
        method: 'GET',
        handler: getAllCatatan,
    },
    {
        // to Get Data by Id
        path: `${pathing}/{id}`,
        method: 'GET',
        handler: getCatatanById,
    },
    {
        // to Put (update) Data by Id
        path: `${pathing}/{id}`,
        method: 'PUT',
        handler: putCatatanById,
    },
    {
        // to DELETE Data by Id
        path: `${pathing}/{id}`,
        method: 'DELETE',
        handler: deleteCatatanById,
    },
];

module.exports = routers;
