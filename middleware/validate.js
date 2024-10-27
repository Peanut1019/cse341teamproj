const validator = require('../helpers/validate');

const saveLibrary = (req, res, next) => {
  const validationRule = {
    book_id: 'required|numeric',
    additionalInfo: 'required|boolean',
    series: 'string',
    title: 'required|string',
    author_first: 'required|string',
    author_middle: 'required|string',
    author_last: 'required|string',
    order_in_series: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveGrocery = (req, res, next) => {
    const validationRule = {
      item_name: 'required|string',
      price: 'required|string',
      store: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const savePharmacy = (req, res, next) => {
    const validationRule = {
      medication_name: 'required|string',
      dosage: 'required|string',
      form: 'required|string',
      perscription: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveUser = (req, res, next) => {
    const validationRule = {
      first_name: 'required|string',
      last_name: 'required|string',
      username: 'required|string',
      email: 'required|email',
      role: 'required|string',
      status: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  

module.exports = {
  saveLibrary,
  saveGrocery,
  savePharmacy,
  saveUser
};