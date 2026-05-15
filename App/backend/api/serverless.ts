import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    
    // CORS: aceita requisições dos frontends hospedados no Render/Vercel
    app.enableCors({
      origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
      credentials: true,
    });
    
    app.setGlobalPrefix('api');
    
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

export default async (req: any, res: any) => {
  const server = await bootstrapServer();
  server(req, res);
};
