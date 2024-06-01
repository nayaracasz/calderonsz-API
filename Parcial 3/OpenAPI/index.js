const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const path = require('path');
const fs = require('fs');
const yaml = require('yamljs');

const ternurinesRouter = require('./routes/ternurines.js');
const theme = new SwaggerTheme();
const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
  };
const swaggerDocs = yaml.load(path.join(__dirname, 'apidocs.yaml'));

app.use(express.json());

app.use('/', ternurinesRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.get('/api-docs-json', (req, res) => {
    res.json(swaggerDocs);
})
   