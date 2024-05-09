import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./routes";
import cors from 'cors';

export class App {
  app = express();
  port = 3000;

  constructor() {
    this.app.use(cors({
      credentials: true,
      origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:80', 'http://localhost:8080'] // Whitelist the domains you want to allow
  }));
    this.app.use(
      urlencoded({
        extended: true,
      })
    );
    this.app.use(json());
    // this.initializeSwagger();
    RegisterRoutes(this.app);
  }

  listen() {
    const server = this.app
      .listen(this.port, () => {
        console.log('=================================');
        console.log(`🚀 App listening on the port ${this.port}`);
        console.log('=================================');
      })
      .on('error', err => console.log(err));

    server.keepAliveTimeout = 600_000;
  }
}

