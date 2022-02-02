import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePost1643438139228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await  queryRunner.renameColumn('post','title','name')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await  queryRunner.renameColumn('post','name','title')
    }

}
