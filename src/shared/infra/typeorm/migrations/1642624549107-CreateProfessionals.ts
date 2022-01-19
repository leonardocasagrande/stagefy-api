import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProfessionals1642624549107 implements MigrationInterface {
    name = 'CreateProfessionals1642624549107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profile_role_enum" AS ENUM('ADMIN', 'PROFESSIONAL', 'RESPONSIBLE', 'STUDENT')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(512) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(1024) NOT NULL, "phone" character varying(256), "avatar" character varying(1024), "profile_role" "public"."user_profile_role_enum" NOT NULL DEFAULT 'STUDENT', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "professional" ("bio" character varying(2048) NOT NULL, "artistic_name" character varying(512) NOT NULL, "zipcode" character varying(128) NOT NULL, "birthday" character varying(128) NOT NULL, "accepted" boolean NOT NULL, "id" uuid NOT NULL, CONSTRAINT "REL_2846b0dcaac01f9983cb719f12" UNIQUE ("id"), CONSTRAINT "PK_2846b0dcaac01f9983cb719f124" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tokens" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "refresh_token_expiration_date" TIMESTAMP NOT NULL, "access_token_expiration_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_2846b0dcaac01f9983cb719f124" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_2846b0dcaac01f9983cb719f124"`);
        await queryRunner.query(`DROP TABLE "user_tokens"`);
        await queryRunner.query(`DROP TABLE "professional"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_role_enum"`);
    }

}
