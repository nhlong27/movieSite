import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { server } from './mockServer';
import { jest } from '@jest/globals';

global.jest = jest;
expect.extend(matchers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
