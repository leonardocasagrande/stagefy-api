import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLikes1643572680910 implements MigrationInterface {
    name = 'AddLikes1643572680910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like" ("user_id" uuid NOT NULL, "event_id" uuid NOT NULL, CONSTRAINT "PK_3dd8a9b5afafb766340fa9d86c4" PRIMARY KEY ("user_id", "event_id"))`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_4356ac2f9519c7404a2869f1691" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_dc844fa320ff5b5595d90fa37eb" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_dc844fa320ff5b5595d90fa37eb"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_4356ac2f9519c7404a2869f1691"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
