import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { MovieNews } from "../models/movieNews";
import { Not } from "typeorm";

export const handleAllNews = async (
  req: Request,
  res: Response
): Promise<any> => {
  const AllNews = await AppSourcedata.getRepository(MovieNews).find();
  return res.json(AllNews);
};

export const handleMovieNews = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, post } = req.query;
  const NewsData = await AppSourcedata.getRepository(MovieNews).find();
  if (!NewsData) {
    return res.json({ message: "News not found.." });
  }

  if (name || post) {
    const filterNews = NewsData.filter((news) => {
      const matchesName = name
        ? news.buttonName.toLowerCase() === name.toString().toLowerCase()
        : true;
      const matchesPost = post
        ? news.title.toLowerCase().startsWith(post.toString().toLowerCase())
        : true;

      return matchesName && matchesPost;
    });

    const notFilterNews = NewsData.filter((news) => !filterNews.includes(news));

    if (filterNews.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching news found for the given query." });
    }

    return res.json({ filterNews, notFilterNews });
  }

  return res.json(NewsData);
};

export const handleMovieNewsByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const newsDataByID = await AppSourcedata.getRepository(MovieNews).findOne({
      where: { news_id: req.params.id },
    });

    const anotherNews = await AppSourcedata.getRepository(MovieNews).find({
      where: { news_id: Not(req.params.id) },
      take: 3,
      order: { date: "DESC" },
    });
    return res.status(200).json({ newsDataByID, anotherNews });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
