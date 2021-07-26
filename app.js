require('dotenv').config();

const Hapi = require('@hapi/hapi');

// ! routing
const routerAPI = require('./restapi/routers');

// ! ENV
const {APP_HOST,APP_PORT}= process.env;

const init = async () => {
    const server = Hapi.server({
        host: APP_HOST||'localhost',
        port: APP_PORT||5000,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // * Connect Databases
    require('./restapi/db/connect');

    // * Routers REST API
    server.route(routerAPI);

    await server.start();
    console.log(`Running on ${server.info.uri}`);
};

init();
