import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSBANK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RMQ_QUEUE,
        },
      }
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
