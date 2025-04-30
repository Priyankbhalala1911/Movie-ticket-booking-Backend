import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Theatre } from "./theater";
import { ShowTime } from "./showTime";

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
