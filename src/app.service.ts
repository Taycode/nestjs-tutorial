import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPublic(): string {
    return 'Welcome Visitor, I am public';
  }

  getProtected(): string {
    return 'Welcome User, I am protected';
  }
}
