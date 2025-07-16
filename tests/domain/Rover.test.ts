import { Rover } from '../../src/domain/Rover';
import { Plateau } from '../../src/domain/Plateau';
import { ILogger } from '../../src/domain/Logger';
import { InvalidInstructionError, OutOfBoundsError } from '../../src/domain/errors';

class MockLogger implements ILogger {
  log = jest.fn();
  info = jest.fn();
  error = jest.fn();
  debug = jest.fn();
}

describe('Rover', () => {
  let plateau: Plateau;
  let logger: MockLogger;

  beforeEach(() => {
    plateau = new Plateau({ x: 5, y: 5 });
    logger = new MockLogger();
  });

  it('should turn left correctly', () => {
    const rover = new Rover({ x: 1, y: 2 }, 'N', plateau, logger);
    rover.turnLeft();
    expect(rover.getDirection()).toBe('W');
  });

  it('should turn right correctly', () => {
    const rover = new Rover({ x: 1, y: 2 }, 'N', plateau, logger);
    rover.turnRight();
    expect(rover.getDirection()).toBe('E');
  });

  it('should move forward correctly', () => {
    const rover = new Rover({ x: 1, y: 2 }, 'N', plateau, logger);
    rover.move();
    expect(rover.getPosition()).toEqual({ x: 1, y: 3 });
  });

  it('should throw an OutOfBoundsError when moving outside the plateau', () => {
    const rover = new Rover({ x: 5, y: 5 }, 'N', plateau, logger);
    expect(() => rover.move()).toThrow(OutOfBoundsError);
  });

  it('should execute a sequence of instructions', () => {
    const rover = new Rover({ x: 1, y: 2 }, 'N', plateau, logger);
    rover.execute('LMLMLMLMM');
    expect(rover.getPosition()).toEqual({ x: 1, y: 3 });
    expect(rover.getDirection()).toBe('N');
  });

  it('should throw an InvalidInstructionError for an invalid instruction', () => {
    const rover = new Rover({ x: 1, y: 2 }, 'N', plateau, logger);
    expect(() => rover.execute('LMX')).toThrow(InvalidInstructionError);
  });
});
