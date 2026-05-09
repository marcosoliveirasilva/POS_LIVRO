import { Router } from "express";
import { favoritos } from '../controllers';

const router = Router();

router.get('/',  favoritos.Controller.getAllValidation, favoritos.Controller.getAll);
router.get('/:id', favoritos.Controller.getByIdValidation, favoritos.Controller.getById);
router.post('/', favoritos.Controller.createValidation, favoritos.Controller.create);
router.put('/:id', favoritos.Controller.updateByIdValidation, favoritos.Controller.updateById);
router.delete('/:id', favoritos.Controller.deleteByIdValidation, favoritos.Controller.deleteById);

export default router;
