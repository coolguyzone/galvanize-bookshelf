const bcrypt = require('bcrypt-as-promised');


console.log(bcrypt.hash('youreawizard', 12));


router.post('/token', (req, res) => {
  let user;
  knex('users')
    .where('email', req.body.email)
    .then((users) => {
      let user = users[0];
      let password = user.hashed_password;
      bcrypt.compare(req.body.password, password)
        .then((arg) => {
          const claim = { userId: user.id};
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days'
          });
          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: router.get('env') === 'production'
          })
        })
        .catch(bcrypt.MISMATCH_ERROR, () => {
          res.set('Content-Type', 'match/plain');
          res.status(400).send('Bad email or password');
        })
    })
    .then(()=> {
      res.status(200).send('success!');
    })

    .catch((err) => {
      res.set('Content-Type', 'match/plain');
      res.status(400).send('Bad email or password');
    })

})
