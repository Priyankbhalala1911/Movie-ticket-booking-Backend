import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Seat } from "./seat";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  movie_id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  movie_poster!: string;

  @Column()
  director!: string;

  @Column()
  duration!: string;

  @Column()
  genre!: string;

  @Column()
  rating!: string;

  @Column({ type: "date" })
  release_date!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @OneToMany(() => City, (city) => city.movie, { eager: true, cascade: true })
  cities!: City[];
}

@Entity()
export class City {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Movie, (movie) => movie.cities, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie!: Movie;

  @OneToMany(() => Day, (day) => day.city, { cascade: true, eager: true })
  days!: Day[];
}

@Entity()
export class Day {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  day!: number;

  @ManyToOne(() => City, (city) => city.days, { onDelete: "CASCADE" })
  @JoinColumn({ name: "city_id" })
  city!: City;

  @OneToMany(() => Theatre, (theatre) => theatre.day, {
    cascade: true,
    eager: true,
  })
  theatres!: Theatre[];
}

@Entity()
export class Theatre {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  chain!: string;

  @Column()
  location!: string;

  @ManyToOne(() => Day, (day) => day.theatres, { onDelete: "CASCADE" })
  @JoinColumn({ name: "day_id" })
  day!: Day;

  @OneToMany(() => Screen, (screen) => screen.theatre, {
    cascade: true,
    eager: true,
  })
  screens!: Screen[];
}

@Entity()
export class Screen {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  type!: string;

  @OneToMany(() => ShowTime, (showtime) => showtime.screen, {
    cascade: true,
    eager: true,
  })
  showtime!: ShowTime[];

  @ManyToOne(() => Theatre, (theatre) => theatre.screens, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "theatre_id" })
  theatre!: Theatre;
}

@Entity()
export class ShowTime {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  Time!: string;

  @Column()
  Price!: number;

  @ManyToOne(() => Screen, (screen) => screen.showtime, { onDelete: "CASCADE" })
  screen!: Screen;

  @OneToMany(() => Seat, (seat) => seat.showTime, { cascade: true })
  seats!: Seat[];
}
