import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEvents1642827863388 implements MigrationInterface {
    name = 'CreateEvents1642827863388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(512) NOT NULL, "image" character varying(512) NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "views" integer NOT NULL DEFAULT '0', "professional_user" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_2846b0dcaac01f9983cb719f124"`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "UQ_2846b0dcaac01f9983cb719f124" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_2846b0dcaac01f9983cb719f124" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_2350b58bf784453a44a36ec5162" FOREIGN KEY ("professional_user") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2350b58bf784453a44a36ec5162"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_2846b0dcaac01f9983cb719f124"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "UQ_2846b0dcaac01f9983cb719f124"`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_2846b0dcaac01f9983cb719f124" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
