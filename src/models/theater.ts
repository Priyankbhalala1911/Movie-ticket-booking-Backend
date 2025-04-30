import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Day } from "./day";
import { Screen } from "./screen";

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
