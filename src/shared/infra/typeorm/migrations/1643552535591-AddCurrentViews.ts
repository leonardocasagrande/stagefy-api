import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCurrentViews1643552535591 implements MigrationInterface {
    name = 'AddCurrentViews1643552535591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "current_views" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "current_views"`);
    }

}
