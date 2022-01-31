import {MigrationInterface, QueryRunner} from "typeorm";

export class ResponsibleJoinLive1643489773300 implements MigrationInterface {
    name = 'ResponsibleJoinLive1643489773300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "finished_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "finished_at"`);
    }

}
