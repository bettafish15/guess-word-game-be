import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ModuleRef } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordService } from './services/word.service';
import { WordProcessor } from './processors/word.processor';
import { MockWordProcessor } from './processors/mock-word.processor';
import { ProcessorRegistryService } from './services/processor-registry.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    WordService,
    WordProcessor,
    MockWordProcessor,
    ProcessorRegistryService
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private moduleRef: ModuleRef,
    private processorRegistry: ProcessorRegistryService
  ) {}

  onModuleInit() {
    // Register all available processors
    const defaultProcessor = this.moduleRef.get(WordProcessor);
    const mockProcessor = this.moduleRef.get(MockWordProcessor);

    this.processorRegistry.registerProcessor(defaultProcessor);
    this.processorRegistry.registerProcessor(mockProcessor);
  }
}
