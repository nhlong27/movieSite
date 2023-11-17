import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { server } from './mockServer';
import "@testing-library/react" 
import '@testing-library/jest-dom/extend-expect'
import "@testing-library/user-event"

expect.extend(matchers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
