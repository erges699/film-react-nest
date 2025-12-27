// __tests__/json.logger.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from '../json.logger';

// Мокируем модуль util целиком
jest.mock('util', () => ({
  inspect: jest.fn(), // Теперь inspect — это jest-мок
}));

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let inspectMock: jest.Mock; // Явно указываем тип

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    logger = module.get<JsonLogger>(JsonLogger);

    // Получаем мок-версию inspect
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    inspectMock = require('util').inspect;
  });

  it('должен формировать JSON‑лог', () => {
    inspectMock.mockReturnValue('{"mocked": "json"}'); // Используем мок

    logger.log('Test message', 'ExtraContext');

    expect(inspectMock).toHaveBeenCalledWith(
      {
        timestamp: expect.any(String),
        level: 'log',
        message: 'Test message',
        context: 'ExtraContext',
        params: undefined,
        pid: expect.any(Number),
      },
      { depth: null, colors: false, compact: false },
    );
  });
});
