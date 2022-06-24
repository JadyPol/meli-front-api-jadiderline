import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meli FrontEnd API Jadiderline',
      description: 'All documentation about API.',
      version: '1.0.0',
    },
  },
  apis: ['./api/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default swaggerDocs;