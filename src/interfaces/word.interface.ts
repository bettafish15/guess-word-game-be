import { GuessResult } from '../dto/guess-result.dto';

export interface IWordService {
  guessDaily(guess: string, size?: number): Promise<GuessResult[]>;
  guessRandom(guess: string, size?: number, seed?: number): Promise<GuessResult[]>;
  guessWord(word: string, guess: string): Promise<GuessResult[]>;
  wordSegmentation(text: string): Promise<any>;
}
