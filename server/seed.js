import 'dotenv/config';
import {pool,tx} from './db.js';
import {seedClean} from './clean-seed.js';
try {const result=await tx(c=>seedClean(c,process.env.SEED_PASSWORD));console.log(result.created?'Ambiente vazio criado, somente administradora Michele Shibata.':'Ambiente separado preservado, sem recriar dados ou redefinir senha.');}finally{await pool.end();}
