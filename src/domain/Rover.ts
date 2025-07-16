import { Position, Direction } from './types';
import { Plateau } from './Plateau';
import { ILogger } from './Logger';
import { InvalidInstructionError, OutOfBoundsError } from './errors';

const LEFT_ROTATION: Record<Direction, Direction> = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N',
};

const RIGHT_ROTATION: Record<Direction, Direction> = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};

export class Rover {
  constructor(
    private position: Position,
    private direction: Direction,
    private plateau: Plateau,
    private logger: ILogger
  ) {
    if (!this.plateau.isValidPosition(this.position)) {
      throw new OutOfBoundsError(this.position);
    }
  }

  /**
   * Reposiciona o rover em uma nova posição e direção,
   * validando se a posição está dentro dos limites do plateau.
   */
  reinitialize(position: Position, direction: Direction): void {
    if (!this.plateau.isValidPosition(position)) {
      this.logger.error(`Reinitialize failed: position out of bounds (${position.x}, ${position.y})`);
      throw new OutOfBoundsError(position);
    }
    this.position = position;
    this.direction = direction;
    this.logger.info(`Rover reinitialized to (${position.x}, ${position.y}) facing ${direction}`);
  }

  /**
   * Retorna uma cópia da posição atual do rover.
   */
  getPosition(): Position {
    return { ...this.position };
  }

  /**
   * Retorna a direção atual do rover.
   */
  getDirection(): Direction {
    return this.direction;
  }

  /**
   * Gira o rover 90 graus para a esquerda.
   */
  turnLeft(): void {
    this.direction = LEFT_ROTATION[this.direction];
    this.logger.debug(`Turned left. Now facing ${this.direction}`);
  }

  /**
   * Gira o rover 90 graus para a direita.
   */
  turnRight(): void {
    this.direction = RIGHT_ROTATION[this.direction];
    this.logger.debug(`Turned right. Now facing ${this.direction}`);
  }

  /**
   * Calcula a próxima posição do rover baseado na direção atual.
   */
  private calculateNextPosition(): Position {
    const { x, y } = this.position;
    switch (this.direction) {
      case 'N': return { x, y: y + 1 };
      case 'E': return { x: x + 1, y };
      case 'S': return { x, y: y - 1 };
      case 'W': return { x: x - 1, y };
    }
  }

  /**
   * Move o rover para a próxima posição, se dentro dos limites do plateau.
   * Caso contrário, lança um erro.
   */
  public move(): void {
    const newPosition = this.calculateNextPosition();
    if (this.plateau.isValidPosition(newPosition)) {
      this.logger.debug(`Moving from (${this.position.x}, ${this.position.y}) to (${newPosition.x}, ${newPosition.y})`);
      this.position = newPosition;
    } else {
      this.logger.error(`Move blocked: (${newPosition.x}, ${newPosition.y}) is out of bounds`);
      throw new OutOfBoundsError(newPosition);
    }
  }

  /**
   * Executa uma sequência de instruções para o rover.
   * Instruções válidas são: 'L', 'R' e 'M'.
   */
  public execute(instructions: string): void {
    for (const instruction of instructions) {
      switch (instruction) {
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        case 'M':
          this.move();
          break;
        default:
          this.logger.error(`Invalid instruction encountered: ${instruction}`);
          throw new InvalidInstructionError(instruction);
      }
    }
  }
}
