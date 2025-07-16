import { FileAdapter } from '../adapters/FileAdapter';
import { RoverDataParser } from '../parsers/RoverDataParser';
import { ProcessInstructionsUseCase } from '../useCases/ProcessInstructionsUseCase';
import { ConsoleLogger } from '../domain/Logger';

const logger = new ConsoleLogger();
const fileAdapter = new FileAdapter(logger);
const parser = new RoverDataParser(logger);
const processInstructionsUseCase = new ProcessInstructionsUseCase(logger);

try {
  const lines = fileAdapter.readLines('input.txt');
  const { plateauTopRight, roversData } = parser.parse(lines);

  const finalRoversState = processInstructionsUseCase.execute(
    plateauTopRight,
    roversData
  );

  finalRoversState.forEach(roverState => {
    console.log(
      `${roverState.position.x} ${roverState.position.y} ${roverState.direction}`
    );
  });
} catch (error: any) {
  logger.error(error.message);
}
