import { Router } from 'express';
import { getArticles, getArticle, createArticle, deleteArticle } from '../controllers/articleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getArticles);
router.get('/:id', getArticle);
router.post('/', authMiddleware, createArticle);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;
