import { expect, test } from '@jest/globals';
import { rootReducer } from '../reducers/root-reducer';
import { store } from '../store';

describe('проверим правильность настройки и работы root-reducer', () => {
  const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  test('проверим, что возвращает состояние по умолчанию', () => {
    expect(testState).toEqual(store.getState());
  });
});
