const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const ternurinesRouter = require('./routes/ternurines.js')

app.use(express.json());

app.use('/', ternurinesRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'Ternurines API',
    version: '1.0.0',
    },
    servers:[
    {url: "http://localhost:3000"}
    ],
    },
    apis: [`${path.join(__dirname,"./routes/ternurines.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
   