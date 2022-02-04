import {MigrationInterface, QueryRunner} from "typeorm";

export class AddChannelName1643377683480 implements MigrationInterface {
    name = 'AddChannelName1643377683480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "channel_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "channel_name"`);
    }

}
