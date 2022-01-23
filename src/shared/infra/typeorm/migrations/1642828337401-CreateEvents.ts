import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEvents1642828337401 implements MigrationInterface {
    name = 'CreateEvents1642828337401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2350b58bf784453a44a36ec5162"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "professional_user" TO "professionalId"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_79103ac8fd763d3386cb805d3bc" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_79103ac8fd763d3386cb805d3bc"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "professionalId" TO "professional_user"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_2350b58bf784453a44a36ec5162" FOREIGN KEY ("professional_user") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
