import Joi from '@hapi/joi';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(4).required(),
    Description: Joi.string().min(4).required()
  });
  
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    // req.validatedBody = value;
    next();
  }
};
