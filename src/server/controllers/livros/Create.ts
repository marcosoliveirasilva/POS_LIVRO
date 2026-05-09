import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { ILivro } from "../../database/models";
import { livros } from "../../database/providers";

interface IBodyProps extends Omit<ILivro, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3),
    autor: yup.string().required().min(3).max(750),
  })),
}));

export const create = async (req: Request<unknown, unknown, ILivro>, res: Response) => {
  const result = await livros.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json({id_livro:result});
}
