import express, { Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flourimus B2C Core APIs',
      version: '1.0.0',
      description: 'API documentation for Flourimus B2C Core',
    },
  },
  apis: ['./src/controller/*.ts', './src/core/types.d.ts','./src/controller/*.js', './src/core/types.d.js'],
};

const specs = swaggerJsdoc(options);

/**
 * Configures the API documentation endpoint for the given Express application.
 *
 * This function sets up a route at `/doc.json` that serves the API documentation
 * in JSON format. The response will have the `Content-Type` header set to `application/json`.
 *
 * @param app - The Express application instance to configure.
 */
const apiDocConfig = (app: express.Express) => {
  app.get('/doc.json', (_: unknown, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(specs);
  });
};

export default apiDocConfig;
