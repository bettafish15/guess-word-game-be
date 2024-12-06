import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { WordService } from './services/word.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly wordService: WordService,
  ) {}

  @Post('segment')
  async segmentText(@Body('text') text: string) {
    return await this.wordService.wordSegmentation(text);
  }

  @Get('processors')
  getAvailableProcessors() {
    return this.wordService.getAvailableProcessors();
  }

  @Post('processor')
  setProcessor(@Body('name') name: string) {
    this.wordService.setProcessor(name);
    return { message: `Switched to processor: ${name}` };
  }

  @Get('guess/daily')
  async guessDaily(@Query('guess') guess: string, @Query('size') size?: number) {
    return await this.wordService.guessDaily(guess, size);
  }

  @Get('guess/random')
  async guessRandom(
    @Query('guess') guess: string,
    @Query('size') size?: number,
    @Query('seed') seed?: number
  ) {
    return await this.wordService.guessRandom(guess, size, seed);
  }

  @Get('guess/word/:word')
  async guessWord(@Param('word') word: string, @Query('guess') guess: string) {
    return await this.wordService.guessWord(word, guess);
  }
}
