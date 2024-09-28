import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  app.setGlobalPrefix('api/v1')

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,POST'
  })

  const config = new DocumentBuilder()
  .setTitle('Área Privada')
  .setDescription('API privada con acceso a la base de datos de ePayco.')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
