import { Router } from "express";
import livrosRoutes from './livros.routes';
import favoritosRoutes from "./favoritos.routes";

const router = Router();

router.use('/livros', livrosRoutes);
router.use('/favoritos', favoritosRoutes);

export { router };
