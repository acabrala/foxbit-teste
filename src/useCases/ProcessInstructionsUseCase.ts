import { Plateau } from '../domain/Plateau';
import { Rover } from '../domain/Rover';
import { Position, Direction } from '../domain/types';
import { ILogger } from '../domain/Logger';

type RoverData = {
  position: Position;
  direction: Direction;
  instructions: string;
};

export class ProcessInstructionsUseCase {
  constructor(private logger: ILogger) {}

  execute(
    plateauTopRight: Position,
    roversData: RoverData[]
  ): { position: Position; direction: Direction; success: boolean; error?: string }[] {
    if (!plateauTopRight || plateauTopRight.x < 0 || plateauTopRight.y < 0) {
      this.logger.error('Invalid plateau dimensions.');
      throw new Error('Invalid plateau dimensions.');
    }
    if (!roversData || roversData.length === 0) {
      this.logger.error('No rover data provided.');
      throw new Error('No rover data provided.');
    }

    const plateau = new Plateau(plateauTopRight);
    const finalRoversState: {
      position: Position;
      direction: Direction;
      success: boolean;
      error?: string;
    }[] = [];

    for (const roverData of roversData) {
      const rover = new Rover(roverData.position, roverData.direction, plateau, this.logger);
      try {
        this.logger.info(
          `Processing rover. Start position: ${roverData.position.x},${roverData.position.y},${roverData.direction}. Instructions: ${roverData.instructions}`
        );
        rover.execute(roverData.instructions);
        const finalPosition = rover.getPosition();
        const finalDirection = rover.getDirection();
        this.logger.info(
          `Finished processing rover. Final position: ${finalPosition.x},${finalPosition.y},${finalDirection}`
        );
        finalRoversState.push({
          position: finalPosition,
          direction: finalDirection,
          success: true,
        });
      } catch (error: any) {
        this.logger.error(error.message);
        finalRoversState.push({
          position: roverData.position,
          direction: roverData.direction,
          success: false,
          error: error.message,
        });
      }
    }

    return finalRoversState;
  }
}
