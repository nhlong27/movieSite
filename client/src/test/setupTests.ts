import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { server } from './mockServer';

expect.extend(matchers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
