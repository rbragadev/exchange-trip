import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class AppValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      ...options,
    });
  }
}
