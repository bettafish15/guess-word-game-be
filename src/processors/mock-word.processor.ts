import { Injectable } from '@nestjs/common';
import { GuessResult } from '../dto/guess-result.dto';
import { IWordProcessor } from '../interfaces/word-processor.interface';
import { ResultKind } from '../dto/guess-result.dto';

@Injectable()
export class MockWordProcessor implements IWordProcessor {
  readonly name = 'mock';

  async processGuessDaily(guess: string, size: number = 5): Promise<GuessResult[]> {
    return this.createMockResponse(guess);
  }

  async processGuessRandom(guess: string, size: number = 5, seed?: number): Promise<GuessResult[]> {
    return this.createMockResponse(guess);
  }

  async processGuessWord(word: string, guess: string): Promise<GuessResult[]> {
    return this.createMockResponse(guess);
  }

  async processWordSegmentation(text: string): Promise<any> {
    return {
      segments: text.match(/.{1,4}/g) || []  // Simple mock: splits text into chunks of 4
    };
  }

  private createMockResponse(guess: string): GuessResult[] {
    return guess.split('').map((letter, index) => ({
      slot: index,
      guess: letter,
      result: this.getRandomResult()
    }));
  }

  private getRandomResult(): ResultKind {
    const results = [ResultKind.ABSENT, ResultKind.PRESENT, ResultKind.CORRECT];
    return results[Math.floor(Math.random() * results.length)];
  }
}
