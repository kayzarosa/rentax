import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableUnique,
} from "typeorm";

export class AlterUserUniqueEmail1654970271911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      "users",
      new TableUnique({
        columnNames: ["email"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint("users", "email");
  }
}
