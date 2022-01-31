import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStreamerPeerId1643651886011 implements MigrationInterface {
    name = 'AddStreamerPeerId1643651886011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "streamer_peer_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "streamer_peer_id"`);
    }

}
