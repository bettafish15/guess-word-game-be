import { Injectable } from '@nestjs/common';
import { GuessResult } from '../dto/guess-result.dto';
import { IWordService } from '../interfaces/word.interface';
import { ProcessorRegistryService } from './processor-registry.service';

@Injectable()
export class WordService implements IWordService {
  constructor(private readonly processorRegistry: ProcessorRegistryService) {}

  async guessDaily(guess: string, size: number = 5): Promise<GuessResult[]> {
    const processor = this.processorRegistry.getActiveProcessor();
    return processor.processGuessDaily(guess, size);
  }

  async guessRandom(guess: string, size: number = 5, seed?: number): Promise<GuessResult[]> {
    const processor = this.processorRegistry.getActiveProcessor();
    return processor.processGuessRandom(guess, size, seed);
  }

  async guessWord(word: string, guess: string): Promise<GuessResult[]> {
    const processor = this.processorRegistry.getActiveProcessor();
    return processor.processGuessWord(word, guess);
  }

  async wordSegmentation(text: string): Promise<any> {
    const processor = this.processorRegistry.getActiveProcessor();
    return processor.processWordSegmentation(text);
  }

  setProcessor(name: string): void {
    this.processorRegistry.setActiveProcessor(name);
  }

  getAvailableProcessors(): string[] {
    return this.processorRegistry.getAvailableProcessors();
  }
}
