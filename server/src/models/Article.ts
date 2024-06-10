import { Schema, model } from 'mongoose';

interface IArticle {
  title: string;
  content: string;
  preview: string;
  createdBy: string;
}

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  preview: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export const Article = model<IArticle>('Article', articleSchema);
