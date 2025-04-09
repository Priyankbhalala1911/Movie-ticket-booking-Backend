import { IsNotEmpty, Length, Matches } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SeatBooking } from "./seatBooking";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character",
    }
  )
  @Length(8, 18, {
    message: "Password must be between 8 and 18 characters long",
  })
  @IsNotEmpty({ message: "Password is required!" })
  password!: string;

  @Column({ default: null })
  profile_image!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @CreateDateColumn({ type: "timestamp" })
  updated_at!: Date;
  @OneToMany(() => SeatBooking, (booking) => booking.user, {
    cascade: true,
    eager: true,
  })
  bookings!: SeatBooking[];
}
