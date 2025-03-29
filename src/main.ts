import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',             // для разработки
      'http://194.36.179.168:3003'         // продакшен клиент (без путей!)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true,
  });

  // 👇 Слушаем на всех интерфейсах, чтобы был доступ извне
  await app.listen(3211, '0.0.0.0');
  console.log('✅ API is running on: http://0.0.0.0:3211');
}
bootstrap();