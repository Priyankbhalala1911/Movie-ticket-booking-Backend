import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShowTime } from "./movie";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  seat_number!: string;

  @Column()
  Row_number!: string;

  @Column({ default: "availabel" })
  status!: "availabel" | "confirmed";

  @ManyToOne(() => ShowTime, (time) => time.seats, { onDelete: "CASCADE" })
  showTime!: ShowTime;
}
