const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const path = require('path');

const ternurinesRouter = require('./routes/ternurines.js');
const theme = new SwaggerTheme();
const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
  };

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
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.get('/api-docs-json', (req, res) => {
    res.json(swaggerDocs);
})
   