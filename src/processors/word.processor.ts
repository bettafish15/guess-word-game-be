import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GuessResult } from '../dto/guess-result.dto';
import { IWordProcessor } from '../interfaces/word-processor.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WordProcessor implements IWordProcessor {
  readonly name = 'default';
  private readonly baseUrl = 'https://wordle.votee.dev:8000';

  constructor(private readonly httpService: HttpService) {}

  async processGuessDaily(guess: string, size: number = 5): Promise<GuessResult[]> {
    const response = await firstValueFrom(
      this.httpService.get<GuessResult[]>(`${this.baseUrl}/daily`, {
        params: {
          guess,
          size,
        },
      })
    );
    return response.data;
  }

  async processGuessRandom(guess: string, size: number = 5, seed?: number): Promise<GuessResult[]> {
    const response = await firstValueFrom(
      this.httpService.get<GuessResult[]>(`${this.baseUrl}/random`, {
        params: {
          guess,
          size,
          ...(seed && { seed }),
        },
      })
    );
    return response.data;
  }

  async processGuessWord(word: string, guess: string): Promise<GuessResult[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GuessResult[]>(`${this.baseUrl}/word/${word}`, {
          params: {
            guess,
          },
        })
      );

      return response.data;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async processWordSegmentation(text: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/wordseg`,
        new URLSearchParams({ text }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
    );
    return response.data;
  }
}
