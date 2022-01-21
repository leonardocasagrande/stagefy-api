import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterProfessionals1642639326656 implements MigrationInterface {
    name = 'AlterProfessionals1642639326656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional" ALTER COLUMN "accepted" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional" ALTER COLUMN "accepted" SET NOT NULL`);
    }

}
