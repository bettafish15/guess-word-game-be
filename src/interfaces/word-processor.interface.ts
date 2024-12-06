import { GuessResult } from '../dto/guess-result.dto';

export interface IWordProcessor {
  name: string;
  processGuessDaily(guess: string, size?: number): Promise<GuessResult[]>;
  processGuessRandom(guess: string, size?: number, seed?: number): Promise<GuessResult[]>;
  processGuessWord(word: string, guess: string): Promise<GuessResult[]>;
  processWordSegmentation(text: string): Promise<any>;
}
