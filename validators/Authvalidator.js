const { z } = require('zod');


const signupValidation = (req, res, next) => {
  const schema = z.object({
    name: z.string({ required_error: "name is required" })
      .trim()
      .min(3, { message: "name must be at least 3 characters long" })
      .max(100, { message: "name must be at most 100 characters long" }),
    email: z.string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" })
      .trim()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Bad request", error: error.errors });
  }
};


const loginValidation = (req, res, next) => {
  const schema = z.object({
    email: z.string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" })
      .trim()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Bad request", error: error.errors });
  }
};

module.exports = {
  signupValidation,
  loginValidation
};
