import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./city";
import { Theatre } from "./theater";

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
