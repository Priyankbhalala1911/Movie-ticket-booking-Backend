import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./city";

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
