export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidInstructionError extends AppError {
  constructor(instruction: string) {
    super(`Invalid instruction: ${instruction}`);
  }
}

export class OutOfBoundsError extends AppError {
  constructor(position: { x: number; y: number }) {
    super(
      `The position { x: ${position.x}, y: ${position.y} } is out of bounds.`
    );
  }
}

export class FileReadError extends AppError {
  constructor(filePath: string, originalError: Error) {
    super(`Error reading file: ${filePath}. Original error: ${originalError.message}`);
  }
}
