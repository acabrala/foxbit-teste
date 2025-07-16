import * as fs from 'fs';
import { ILogger } from '../domain/Logger';
import { FileReadError } from '../domain/errors';

export class FileAdapter {
  constructor(private logger: ILogger) {}

  readLines(filePath: string): string[] {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return fileContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
    } catch (error: any) {
      this.logger.error(`Erro ao ler o arquivo ${filePath}: ${error.message}`);
      throw new FileReadError(filePath, error);
    }
  }
}
