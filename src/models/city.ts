import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Day } from "./day";
import { Movie } from "./movie";

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
