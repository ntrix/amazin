import { userDetailsActions, userDetailsReducer, userAddressMapActions, userAddressMapReducer } from '../../slice/UserSlice';

describe('userDetailsReducer - _RESET', () => {
  test('resets back to a loading state instead of an empty object', () => {
    const result = userDetailsReducer({ user: { name: 'Ada' } } as never, userDetailsActions._RESET(''));
    expect(result).toEqual({ loading: true });
  });
});

describe('userAddressMapReducer - _CONFIRM', () => {
  test('stores the confirmed address from the map', () => {
    const address = { lat: 1, lng: 2 } as never;
    const payload = { type: 'confirm', address };
    const result = userAddressMapReducer({}, userAddressMapActions._CONFIRM(payload as never));
    expect(result).toEqual({ address: payload });
  });
});
