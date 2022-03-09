import {MigrationInterface, QueryRunner} from "typeorm";

export class InvestmentsMigration1646841059135 implements MigrationInterface {
    name = 'InvestmentsMigration1646841059135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "owner" varchar(50) NOT NULL, "initial_amount" integer NOT NULL, "withdraw_amount" integer, "withdraw_date" datetime, "creation_date" datetime NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "investment"`);
    }

}
