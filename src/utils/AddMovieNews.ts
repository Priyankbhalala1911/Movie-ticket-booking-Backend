import { AppSourcedata } from "../config/database";
import { MovieNewsData } from "../data/MovienewsData";
import { MovieNews } from "../models/movieNews";

export const AddMovieNews = async () => {
  for (let news of MovieNewsData) {
    const movieNews = new MovieNews();
    movieNews.title = news.newsTitle;
    movieNews.image = news.image;
    movieNews.description = news.description;
    movieNews.buttonName = news.buttonName;
    movieNews.date = news.date;
    movieNews.source = news.source;
    movieNews.video = news.video;

    await AppSourcedata.getRepository(MovieNews).save(movieNews);
  }
};
