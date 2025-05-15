import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747304336850 implements MigrationInterface {
    name = 'InitialMigration1747304336850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "profile_image" TO "profileImage"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "profileImage" TO "profile_image"`);
    }

}
