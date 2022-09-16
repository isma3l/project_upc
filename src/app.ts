import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { connect, set, connection } from 'mongoose';

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { logger, stream } from '@utils/logger';
import { Routes } from './interfaces';
import { errorMiddleware } from '@middlewares';
import { dbConnection } from '@databases';

class AppServer {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url);

    connection.on('open', _ => {
      logger.info('Database is connnected');
    });

    connection.on('error', err => {
      logger.info(`Database is disconnnected: ${err}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT as string, { stream }));
    const credentials = CREDENTIALS === 'true';
    this.app.use(cors({ origin: ORIGIN, credentials }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }
}

export default AppServer;
