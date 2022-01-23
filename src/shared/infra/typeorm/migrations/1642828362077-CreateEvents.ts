import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEvents1642828362077 implements MigrationInterface {
    name = 'CreateEvents1642828362077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_79103ac8fd763d3386cb805d3bc"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "professionalId" TO "professional_id"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_1438e1e9e7824b536eef12fe416" FOREIGN KEY ("professional_id") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_1438e1e9e7824b536eef12fe416"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "professional_id" TO "professionalId"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_79103ac8fd763d3386cb805d3bc" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
