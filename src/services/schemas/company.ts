import joi from 'joi';

const createCompany = joi.object({
  name: joi.string().required().min(3).max(30).required(),
  taxId: joi.string().required().min(13).max(15).required(),
  mainUserId: joi.number().required().min(1).required(),
  address: joi.string().required().min(8).max(100).required(),
});

const updateCompany = joi.object({
  name: joi.string().required().min(3).max(30).required(),
  taxId: joi.string().required().min(13).max(15).required(),
  address: joi.string().required().min(8).max(100).required(),
});

const deleteCompany = joi.object({
  taxId: joi.string().required().min(13).max(15).required(),
  userId: joi.number().required().min(1).required(),
});

export { createCompany, updateCompany, deleteCompany };
