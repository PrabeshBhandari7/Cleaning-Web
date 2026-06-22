const bcrypt = require('bcrypt');

const hash = '$2b$10$LoHFXuY8Cu1kMgzSou1gru51JoVZJbjC9/2pGxrNgsrJihJq7yLpq';
const pass = 'Smile#123';

bcrypt.compare(pass, hash).then(res => {
  console.log("MATCH?", res);
});
