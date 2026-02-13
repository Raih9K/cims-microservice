import cors from 'cors';
import express, { Application } from 'express';
import { config, validateConfig } from './config';
import userRoutes from './routes/userRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'OK',
        service: 'user-service',
        mode: config.dataMode,
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    this.app.use('/api', userRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        console.error('Unhandled error:', err);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
        });
      },
    );
  }

  public async listen(): Promise<void> {
    validateConfig();
    this.app.listen(config.port, () => {
      console.log(`\n✅ User Service is running`);
      console.log(`   - Port: ${config.port}`);
      console.log(`   - Mode: ${config.dataMode.toUpperCase()}`);
      console.log(`   - Health: http://localhost:${config.port}/health\n`);
    });
  }
}

const app = new App();
app.listen();
