import bcrypt from 'bcryptjs';
import {assertCleanEnvironment} from './environment.js';
export async function seedClean(c, password){
 await c.query('SELECT pg_advisory_xact_lock(882731)');
 await assertCleanEnvironment(c,{allowEmpty:true});
 const existing=Number((await c.query('SELECT COUNT(*) AS count FROM organizations')).rows[0].count);
 if(existing){return {created:false};}
 if(typeof password!=='string'||password.length<12)throw new Error('Configure SEED_PASSWORD com pelo menos 12 caracteres.');
 const hash=await bcrypt.hash(password,12);
 const org=(await c.query('INSERT INTO organizations(name) VALUES($1) RETURNING id',['ABC Cargas'])).rows[0].id;
 await c.query("INSERT INTO users(organization_id,name,email,password_hash,role) VALUES($1,$2,$3,$4,'admin')",[org,'Michele Shibata','michele@abccargas.local',hash]);
 await c.query('INSERT INTO organization_settings(organization_id,company_name) VALUES($1,$2)',[org,'ABC Cargas']);
 await c.query('CREATE TABLE fleet_clean_environment(identity TEXT PRIMARY KEY, organization_id UUID NOT NULL REFERENCES organizations(id))');
 await c.query('INSERT INTO fleet_clean_environment(identity,organization_id) VALUES($1,$2)',['abc-clean-v4',org]);
 return {created:true};
}
