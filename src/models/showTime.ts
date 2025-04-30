import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Seat } from "./seat";
import { Screen } from "./screen";

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
