import Joi from 'joi';
import { type UserCreateDto } from './user';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({});

export const userUpdateDtoSchema = Joi.object<UserCreateDto>({});
