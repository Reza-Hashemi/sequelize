var express = require('express');
var router = express.Router();
const User = require('../sequlize/models/user');
const { ValidationErrorItem, Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    let offsetData = (req.query.page - 1) * req.query.limit;
    let limitData = Number(req.query.limit);
    const users = await User.findAndCountAll({
      limit: limitData,
      offset: offsetData,
      order: [['firstName', 'ASC']],
      attributes: ['firstName', 'lastName', 'userName'],
    });
    return res.status(200).json(users);
  } catch (err) {
    if (
      err.errors instanceof Array &&
      err.errors[0] instanceof ValidationErrorItem
    ) {
      return res.status(400).json(
        err.errors.map(function (el) {
          return el.message;
        })
      );
    }
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create(data);
    res.json(user);
  } catch (err) {
    if (
      err.errors instanceof Array &&
      err.errors[0] instanceof ValidationErrorItem
    ) {
      return res.status(400).json(
        err.errors.map(function (el) {
          return el.message;
        })
      );
    }
    return res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const { firstName, lastName, userName } = req.body;
    const user = await User.findOne({
      where: { [Op.and]: [{ userName: userName }, { lastName: lastName }] },
    });
    if (user) {
      user.firstName = firstName;
      await user.save();
      return res.status(200).json('user changed success');
    } else {
      return res.status(401).json('username not found');
    }
  } catch (err) {
    if (
      err.errors instanceof Array &&
      err.errors[0] instanceof ValidationErrorItem
    ) {
      return res.status(400).json(
        err.errors.map(function (el) {
          return el.message;
        })
      );
    }
    return res.status(500).json(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    const { userName, firstName } = req.body;
    const row = await User.findOne({
      where: { [Op.and]: [{ firstName: firstName }, { userName: userName }] },
    });
    console.log(row);
    if (row) {
      await row.destroy();
      return res.json('deleted');
    } else {
      return res.status(401).json('user not found');
    }
  } catch (err) {
    if (
      err.errors instanceof Array &&
      err.errors[0] instanceof ValidationErrorItem
    ) {
      return res.status(400).json(
        err.errors.map(function (el) {
          return el.message;
        })
      );
    }
    return res.status(500).json(err);
  }
});
module.exports = router;
