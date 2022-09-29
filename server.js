const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const Users = require('./core/Users');
const User = require('./core/User');
const app = express();

app.use(cors());
app.use(json());

const users = new Users();
const u1 = new User('П1', '111');
const u2 = new User('П2', '222', ['ДФО'], ['Т1', 'Т2']);
const u3 = new User('П3', '333', ['СФО'], ['Т2', 'Т3']);

users.add(u1);
users.add(u2);
users.add(u3);

const data = {
  'Т1': ['ДФО', 'ЦФО', 'УФО', 'ЦФО'],
  'Т2': ['ЦФО', 'ДФО', 'СФО', 'СЗФО', 'ДФО'],
  'Т3': ['СФО', 'ЦФО', 'УФО', 'СЗФО']
}

app.get('/data', (request, response) => {
  const token = request.query.token;
  const type = request.query.type;
  const user = users.getByToken(Number(token));
  const paylaod = {
    status: '',
    message: '',
    data: null
  }

  if (user) {
    paylaod.status = 'success';

    if (user.allowedFields.length > 0 ) {
      paylaod.data = data[type].filter(item => {
        if (user.allowedFields.includes(item)) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      paylaod.data = data[type];
    }
  } else {
    paylaod.status = 'error';
    paylaod.message = 'User not found.';
  }
  
  response.send(paylaod);
});

app.post('/login', (request, response) => {
  const login = request.body.login;
  const password = request.body.password;
  const user = users.getByLogin(login);
  const paylaod = {
    status: '',
    message: '',
    data: null
  }

  if (!user) {
    paylaod.status = 'error';
    paylaod.message = 'User not found.';    
  } else if (user.checkPassword(password)) {
    token = Date.now();
    
    user.setToken(token);

    paylaod.status = 'success';
    paylaod.data = {
      token,
      allowedUserTables: user.allowedTables
    };
  } else {
    paylaod.status = 'error';
    paylaod.message = 'Password error.';
  }

  response.send(paylaod);
});

app.listen(80);