import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class SeatBooking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  movie_title!: string;

  @Column()
  movie_poster!: string;

  @Column()
  location!: string;

  @Column()
  show_type!: string;

  @Column()
  show_date!: string;

  @Column()
  seat_price!: number;

  @Column()
  show_time!: string;

  @Column()
  payment_Id!: string;

  @Column()
  password_key!: string;

  @Column("text", { array: true })
  seat_number!: string[];

  @Column()
  total_amount!: number;

  @Column()
  payment_status!: boolean;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: "CASCADE" })
  user!: User;
}
