import express, { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { EnvConfig } from '../config';

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3001, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  public async start() {
    this.app.use(helmet());

    //   middleware
    this.app.use(express.json());

    //   cors
    const whitelist = [EnvConfig().FRONTEND_URL];

    const corsOptions = {
      origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed origin by cors'));
        }
      },
    };

    this.app.use(cors(corsOptions));

    //   routes
    this.app.use(this.routes);

    //   port listening
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
