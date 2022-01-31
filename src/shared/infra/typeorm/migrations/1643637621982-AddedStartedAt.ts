import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedStartedAt1643637621982 implements MigrationInterface {
    name = 'AddedStartedAt1643637621982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "channel_name" TO "started_at"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "started_at"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "started_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "started_at"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "started_at" character varying`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "started_at" TO "channel_name"`);
    }

}
