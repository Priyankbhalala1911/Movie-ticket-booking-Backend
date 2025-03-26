import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @OneToMany(() => City, (city) => city.movie, { eager: true })
  cities!: City[];
}

@Entity()
export class City {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Movie, (movie) => movie.cities, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movieId" })
  movie!: Movie;

  @OneToMany(() => Theatre, (theatre) => theatre.city, { eager: true })
  theatres!: Theatre[];
}

@Entity()
export class Theatre {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  chain!: string;

  @Column()
  location!: string;

  @ManyToOne(() => City, (city) => city.theatres, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cityId" })
  city!: City;

  @OneToMany(() => Screen, (screen) => screen.theatre, { eager: true })
  screens!: Screen[];
}

@Entity()
export class Screen {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  type!: string;

  @Column()
  price!: number;

  @Column("text", { array: true })
  slots!: string[];

  @ManyToOne(() => Theatre, (theatre) => theatre.screens, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "theatreId" })
  theatre!: Theatre;
}
