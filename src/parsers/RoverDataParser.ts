import { Direction, Position } from '../domain/types';
import { ILogger } from '../domain/Logger';

type RoverData = {
  position: Position;
  direction: Direction;
  instructions: string;
};

export class RoverDataParser {
  constructor(private logger: ILogger) {}

  parse(lines: string[]): {
    plateauTopRight: Position;
    roversData: RoverData[];
  } {
    const plateauLine = lines.shift();
    if (!plateauLine) throw new Error('Arquivo sem coordenadas do plateau');

    const [xStr, yStr] = plateauLine.split(' ');
    const plateauTopRight = this.parsePosition(xStr, yStr, 'plateau');

    const roversData: RoverData[] = [];

    for (let i = 0; i < lines.length; i += 2) {
      const posLine = lines[i];
      const instrLine = lines[i + 1];
      if (!posLine || !instrLine) {
        this.logger.error(`Rover na linha ${i + 1} está incompleto`);
        continue;
      }

      const [x, y, dir] = posLine.split(' ');
      if (!this.isValidDirection(dir)) {
        this.logger.error(`Direção inválida: ${dir}`);
        continue;
      }

      const position = this.parsePosition(x, y, `rover ${i / 2}`);
      roversData.push({
        position,
        direction: dir as Direction,
        instructions: instrLine,
      });
    }

    return { plateauTopRight, roversData };
  }

  private parsePosition(x: string, y: string, context: string): Position {
    const xNum = Number(x);
    const yNum = Number(y);
    if (isNaN(xNum) || isNaN(yNum)) {
      throw new Error(`Coordenadas inválidas para ${context}: ${x}, ${y}`);
    }
    return { x: xNum, y: yNum };
  }

  private isValidDirection(value: string): value is Direction {
    return ['N', 'E', 'S', 'W'].includes(value);
  }
}
