export async function assertCleanEnvironment(db, {allowEmpty=false}={}) {
 const exists=(await db.query("SELECT to_regclass('public.organizations') AS table_name")).rows[0].table_name;
 if(!exists){if(allowEmpty)return;throw new Error('Banco não inicializado. Execute migração e seed.');}
 const count=Number((await db.query('SELECT COUNT(*) AS count FROM organizations')).rows[0].count);
 if(count===0 && allowEmpty)return;
 const marker=(await db.query("SELECT to_regclass('public.fleet_clean_environment') AS table_name")).rows[0].table_name;
 if(!marker)throw new Error('Banco incompatível: use um PostgreSQL novo e exclusivo. Ambiente existente recusado.');
 const identity=(await db.query("SELECT organization_id FROM fleet_clean_environment WHERE identity=$1",['abc-clean-v4'])).rows[0];
 if(!identity || count!==1 || !(await db.query('SELECT id FROM organizations WHERE id=$1',[identity.organization_id])).rows.length)throw new Error('Identidade do ambiente separado inválida.');
}
