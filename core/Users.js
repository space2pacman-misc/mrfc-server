class Users {
  constructor() {
    this._users = [];
  }

  getByToken(token) {
    return this._users.find(user => user.token === token);
  }

  getByLogin(login) {
    return this._users.find(user => user.login === login);
  }

  add(user) {
    this._users.push(user);
  }
}

module.exports = Users;