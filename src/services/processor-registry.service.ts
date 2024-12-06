import { Injectable } from '@nestjs/common';
import { IWordProcessor } from '../interfaces/word-processor.interface';

@Injectable()
export class ProcessorRegistryService {
  private processors: Map<string, IWordProcessor> = new Map();
  private activeProcessor: string | null = null;

  registerProcessor(processor: IWordProcessor): void {
    this.processors.set(processor.name, processor);
    // Set as active if it's the first processor
    if (!this.activeProcessor) {
      this.activeProcessor = processor.name;
    }
  }

  setActiveProcessor(name: string): void {
    if (!this.processors.has(name)) {
      throw new Error(`Processor ${name} not found`);
    }
    this.activeProcessor = name;
  }

  getActiveProcessor(): IWordProcessor {
    if (!this.activeProcessor || !this.processors.has(this.activeProcessor)) {
      throw new Error('No active processor set');
    }
    return this.processors.get(this.activeProcessor)!;
  }

  getAvailableProcessors(): string[] {
    return Array.from(this.processors.keys());
  }
}
