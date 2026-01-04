// __tests__/tskv.logger.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutWriteSpy: jest.SpyInstance;
  let stderrWriteSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    logger = module.get<TskvLogger>(TskvLogger);
    stdoutWriteSpy = jest.spyOn(process.stdout, 'write');
    stderrWriteSpy = jest.spyOn(process.stderr, 'write');
  });

  afterEach(() => {
    stdoutWriteSpy.mockRestore();
    stderrWriteSpy.mockRestore();
  });

  it('должен записывать лог в stdout', () => {
    logger.log('Test message', 'Context');

    expect(stdoutWriteSpy).toHaveBeenCalled();
    const output = stdoutWriteSpy.mock.calls[0][0];
    expect(output).toContain('timestamp=');
    expect(output).toContain('level=log');
    expect(output).toContain('message=Test message');
    expect(output).toContain('context=Context');
  });

  it('должен записывать ошибку в stderr', () => {
    logger.error('Error message', 'Stack trace', 'ErrorContext');

    expect(stderrWriteSpy).toHaveBeenCalled();
    const output = stderrWriteSpy.mock.calls[0][0];
    expect(output).toContain('level=error');
    expect(output).toContain('stack=Stack trace');
    expect(output).toContain('context=ErrorContext');
  });

  it('должен экранировать спецсимволы', () => {
    logger.log('Line\nTab\tReturn\r', 'Test');

    const output = stdoutWriteSpy.mock.calls[0][0];
    expect(output).toContain('message=Line\\nTab\\tReturn\\r');
  });
});
