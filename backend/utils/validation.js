// const { validationResult } = require('express-validator');
// const { check } = require('express-validator');

// // Common validation rules
// const vehicleValidationRules = [
//   check('vehicleNumber', 'Vehicle number is required').not().isEmpty(),
//   check('dcNumber', 'D.C. number is required').not().isEmpty(),
//   check('poNumber', 'P.O. number is required').not().isEmpty()
// ];

// const vendorValidationRules = [
//   check('name', 'Name is required').not().isEmpty(),
//   check('companyName', 'Company name is required').not().isEmpty(),
//   check('contactNumber', 'Contact number is required').not().isEmpty()
// ];

// const productValidationRules = [
//   check('name', 'Name is required').not().isEmpty(),
//   check('quantity', 'Quantity must be a positive integer').isInt({ min: 1 }),
//   check('poNumber', 'P.O. number is required').not().isEmpty(),
//   check('vendorId', 'Vendor ID is required').not().isEmpty()
// ];

// const userValidationRules = [
//   check('username', 'Username is required').not().isEmpty(),
//   check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
//   check('role', 'Role is required').not().isEmpty()
// ];

// const securityCheckValidationRules = [
//   check('status', 'Status is required').not().isEmpty(),
//   check('status', 'Status must be pending, approved, or rejected').isIn(['pending', 'approved', 'rejected'])
// ];

// const loginValidationRules = [
//     check('username', 'Username is required').not().isEmpty(),
//     check('password', 'Password is required').exists()
//   ];

// // Validation middleware
// const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }
//   const extractedErrors = [];
//   errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

//   return res.status(422).json({
//     errors: extractedErrors,
//   });
// };

// module.exports = {
//   vehicleValidationRules,
//   vendorValidationRules,
//   loginValidationRules,
//   productValidationRules,
//   userValidationRules,
//   securityCheckValidationRules,
//   validate
// };

const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// Validation rules
const userValidationRules = [
  check('username')
    .not().isEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
  check('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  check('role')
    .not().isEmpty().withMessage('Role is required')
    .isIn(['admin', 'operator', 'security']).withMessage('Invalid role')
];

const loginValidationRules = [
  check('username')
    .not().isEmpty().withMessage('Username is required'),
  
  check('password')
    .not().isEmpty().withMessage('Password is required')
];

// Other validation rules (keep your existing ones)
const vehicleValidationRules = [
  check('vehicleNumber', 'Vehicle number is required').not().isEmpty(),
  check('dcNumber', 'D.C. number is required').not().isEmpty(),
  check('poNumber', 'P.O. number is required').not().isEmpty()
];

const vendorValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('companyName', 'Company name is required').not().isEmpty(),
  check('contactNumber', 'Contact number is required').not().isEmpty()
];

const productValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('quantity', 'Quantity must be a positive integer').isInt({ min: 1 }),
  check('poNumber', 'P.O. number is required').not().isEmpty(),
  check('vendorId', 'Vendor ID is required').not().isEmpty()
];

const securityCheckValidationRules = [
  check('status', 'Status is required').not().isEmpty(),
  check('status', 'Status must be pending, approved, or rejected').isIn(['pending', 'approved', 'rejected'])
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = errors.array().map(err => ({ 
    field: err.param,
    message: err.msg 
  }));

  return res.status(422).json({
    success: false,
    errors: extractedErrors
  });
};

module.exports = {
  vehicleValidationRules,
  vendorValidationRules,
  productValidationRules,
  userValidationRules,
  securityCheckValidationRules,
  loginValidationRules,
  validate
};