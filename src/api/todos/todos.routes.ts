import { Router } from 'express';
import * as TodosHandler from './todos.handlers';
import { Todo, TodoWithoutId } from './todos.model';
import { validateRequest } from '../../middlewares';
import { ParamsWithId } from '../../interfaces/paramsWithId';


const router = Router();

router.get('/', TodosHandler.findAll);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TodosHandler.findOne,
);
router.post(
  '/',
  validateRequest({
    body: TodoWithoutId,
  }),
  TodosHandler.create,
);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Todo,
  }),
  TodosHandler.update,
);

// router.get<{}, Todo[]>('/', (req, res) => {
//   res.json([{
//     content: 'learn...',
//     done: true,
//   }]);
// });

export default router;