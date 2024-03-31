import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.startAllMicroservices();

  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
