import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747305323755 implements MigrationInterface {
    name = 'InitialMigration1747305323755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_f38244c6e76d8e50e1a590f6744"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "movie_id"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "movie_poster"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "moviePoster" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "releaseDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "moviePoster"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "movie_poster" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "movie_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_f38244c6e76d8e50e1a590f6744" PRIMARY KEY ("movie_id")`);
    }

}
