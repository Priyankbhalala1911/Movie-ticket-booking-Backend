import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ComingMovies {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  movie_title!: string;

  @Column()
  movie_poster!: string;

  @Column("text", { array: true })
  chain!: string[];
}
