import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieNews {
  @PrimaryGeneratedColumn("uuid")
  news_id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  image?: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 40 })
  buttonName!: string;

  @Column()
  date!: string;

  @Column({ type: "text", nullable: true })
  source?: string;

  @Column({ type: "text", nullable: true })
  video?: string;
}
