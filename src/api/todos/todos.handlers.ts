import { Todo, TodoWithoutId } from './todos.model';
import client from '../../config/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsWithId } from '../../interfaces/paramsWithId';

export const findAll = async (req:Request, res:Response<Todo[]>, next: NextFunction) => {
  try {
    const result = await client.todo.findMany();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const findOne = async (req:Request<ParamsWithId, Todo, {}>, res:Response<Todo>, next: NextFunction) => {
  try {
    const numberId = Number(req.params.id);
    if (!numberId) {
      res.status(422);
      throw new Error(`Todo with id ${req.params.id} is invalid`);
    };

    const result = await client.todo.findUnique({
      where: {
        id: numberId,
      },
    });
    if (!result) {
      res.status(404);
      throw new Error(`Todo with id ${req.params.id} not found`);
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const create = async (req:Request<{}, Todo, TodoWithoutId>, res:Response<Todo>, next: NextFunction) => {
  try {
    const insertResult = await client.todo.create({
      data: req.body,
    });
    res.status(201);
    res.json(insertResult);
  } catch (error) {
    next(error);
  }
};

export const update = async (req:Request<ParamsWithId, Todo, Todo>, res:Response<Todo>, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};