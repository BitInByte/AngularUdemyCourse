export class User {
  constructor(
    public email: string,
    public id: string,
    // Private because the token should not
    // be retrievable, instead when the user
    // or us as developer want to get access
    // to the token, we should actually be
    // required to do that in a way that will
    // automatically check the validity and this
    // can be achieved by adding a getter
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // A getter looks like a function which we
  // access like a property
  // A getter also means that the user can't
  // override this
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
