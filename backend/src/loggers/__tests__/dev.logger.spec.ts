// __tests__/dev.logger.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from '../dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile();

    logger = module.get<DevLogger>(DevLogger);
  });

  it('должен выводить лог в консоль', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    logger.log('Test message');

    expect(consoleLogSpy).toHaveBeenCalledWith('Test message');
    consoleLogSpy.mockRestore();
  });

  it('должен выводить ошибку в консоль', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');

    logger.error('Error message');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error message');
    consoleErrorSpy.mockRestore();
  });
});
