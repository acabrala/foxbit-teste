import { Position } from './types';
import { AppError } from './errors';

export class InvalidPlateauError extends AppError {
  constructor(pos: Position) {
    super(`Invalid plateau dimensions: x=${pos.x}, y=${pos.y}. Must be >= 0.`);
  }
}

export class Plateau {
  constructor(public readonly topRight: Position) {
    if (topRight.x < 0 || topRight.y < 0) {
      throw new InvalidPlateauError(topRight);
    }
  }

  static fromDimensions(x: number, y: number): Plateau {
    return new Plateau({ x, y });
  }

  isValidPosition(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x <= this.topRight.x &&
      position.y >= 0 &&
      position.y <= this.topRight.y
    );
  }
}
