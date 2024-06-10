import { Request, Response } from 'express';
import { Article } from '../models/Article';

interface AuthRequest extends Request {
  userId?: string;
}

export const getArticles = async (req: Request, res: Response) => {
  const articles = await Article.find();
  res.json(articles);
};

export const getArticle = async (req: Request, res: Response) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
};

export const createArticle = async (req: AuthRequest, res: Response) => {
  const { title, content, preview } = req.body;
  const article = new Article({ title, content, preview, createdBy: req.userId });
  await article.save();
  res.json(article);
};

export const deleteArticle = async (req: AuthRequest, res: Response) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  res.json(article);
};
