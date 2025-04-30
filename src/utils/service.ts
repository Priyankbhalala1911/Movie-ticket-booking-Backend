import { AppSourcedata } from "../config/database";
import { City } from "../models/city";
import { ComingMovies } from "../models/comingMovies";
import { Day } from "../models/day";
import { Movie } from "../models/movie";
import { MovieNews } from "../models/movieNews";
import { Screen } from "../models/screen";
import { Seat } from "../models/seat";
import { SeatBooking } from "../models/seatBooking";
import { ShowTime } from "../models/showTime";
import { Theatre } from "../models/theater";
import { User } from "../models/user";

export const userRepositry = AppSourcedata.getRepository(User);
export const movieRepositry = AppSourcedata.getRepository(Movie);
export const cityRepositry = AppSourcedata.getRepository(City);
export const dayRepositry = AppSourcedata.getRepository(Day);
export const theatreRepositry = AppSourcedata.getRepository(Theatre);
export const screenRepositry = AppSourcedata.getRepository(Screen);
export const showTimeRepositry = AppSourcedata.getRepository(ShowTime);
export const seatRepositry = AppSourcedata.getRepository(Seat);
export const seatBookingTimeRepositry =
  AppSourcedata.getRepository(SeatBooking);
export const movieNewsRepositry = AppSourcedata.getRepository(MovieNews);
export const comingMoviesRepositry = AppSourcedata.getRepository(ComingMovies);
