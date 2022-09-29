class User {
  constructor(login, password, allowedFields = [], allowedTables) {
    this._login = login;
    this._password = password;
    this._allowedFields = allowedFields;
    this._allowedTables = allowedTables;
    this._token = null;
  }

  checkPassword(password) {
    if (this._password === password) {
      return true;
    } else {
      return false;
    }
  }

  setToken(token) {
    this._token = token;
  }

  get login() {
    return this._login;
  }

  get allowedFields() {
    return this._allowedFields;
  }

  get allowedTables() {
    return this._allowedTables;
  }

  get token() {
    return this._token;
  }
}

module.exports = User;