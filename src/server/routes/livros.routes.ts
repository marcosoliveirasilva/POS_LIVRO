import { Router } from "express";
import { livros } from '../controllers';

const router = Router();

router.get('/',  livros.Controller.getAllValidation, livros.Controller.getAll);
router.get('/:id',  livros.Controller.getByIdValidation, livros.Controller.getById);
router.post('/',  livros.Controller.createValidation, livros.Controller.create);
router.put('/:id',  livros.Controller.updateByIdValidation, livros.Controller.updateById);
router.delete('/:id',  livros.Controller.deleteByIdValidation, livros.Controller.deleteById);

export default router;
