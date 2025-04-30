import { Request, Response } from "express";
import { Not } from "typeorm";
import { movieNewsRepositry } from "../utils/service";

export const handleAllNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  const AllNews = await movieNewsRepositry.find();
  res.json(AllNews);
  return;
};

export const handleMovieNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, post } = req.query;
  const NewsData = await movieNewsRepositry.find();
  if (!NewsData) {
    res.json({ message: "News not found.." });
    return;
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
      res
        .status(404)
        .json({ message: "No matching news found for the given query." });
      return;
    }

    res.json({ filterNews, notFilterNews });
    return;
  }

  res.json(NewsData);
  return;
};

export const handleMovieNewsByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newsDataByID = await movieNewsRepositry.findOne({
      where: { news_id: req.params.id },
    });

    const anotherNews = await movieNewsRepositry.find({
      where: { news_id: Not(req.params.id) },
      take: 3,
      order: { date: "DESC" },
    });
    res.status(200).json({ newsDataByID, anotherNews });
    return;
  } catch (error) {
    res.status(404).json({ message: error });
    return;
  }
};
