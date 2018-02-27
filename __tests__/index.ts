import Rave from '../src/index';

describe('Rave spec', () => {
  it('Errors without a public and private key', () => {
    expect(() => new Rave('', '')).toThrow();
  });
});
