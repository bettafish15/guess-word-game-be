import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async makeHttpRequest() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://jsonplaceholder.typicode.com/posts/1'),
    );
    return data;
  }
}
