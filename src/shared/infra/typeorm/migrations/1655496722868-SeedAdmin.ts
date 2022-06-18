import { MigrationInterface, QueryRunner } from "typeorm";

import { hash } from "bcrypt";

import { v4 as uuidV4 } from "uuid";

export class SeedAdmin1655496722868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = uuidV4();
    const password = await hash("admin", 8);

    await queryRunner.query(`INSERT INTO public.users (id,"name",email,"password",driver_license,"isAdmin")
    VALUES('${id}'::uuid, 'admin', 'admin@rentx.com.br', '${password}', '123456', true)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from public.users  where "isAdmin" = true`);
  }
}
