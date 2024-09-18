// storage.ts
import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

export const getAsyncStorage = () => asyncLocalStorage;
