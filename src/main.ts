import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: RabbitMQ.TRANSACTIONQueue,
      },
    });
  await app.listen();
  console.log(`Microservice Payments is listening`);

}
bootstrap();
