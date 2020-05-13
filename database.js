// yarn add pg

const Pool = require('pg').Pool;

//1- Abre conexão
//2- Executa o comando SQL(select - indice,insert...) 4ms
//3- Fecha a conexão

const pool = new Pool({
    user: 'pbotjmbjntqvdp',
    password: 'f3258950c147d6d5d6b431c2f0a79a9d1b799d999678bd10a01b772d330a8d7d',
    host: 'ec2-34-204-22-76.compute-1.amazonaws.com',
    database: 'd6fdqukjj00ojh',
    port: 5432,
    ssl: {rejectUnauthorized:false}
});

const sqlCreate  = `
    DROP TABLE corretoras;
    CREATE TABLE IF NOT EXISTS corretoras
    (
        ID serial primary key,
        nomecorretora varchar(50) not null,
        ativo varchar(50) not null,
        valorporoperacao decimal not null 
    )
`;
// pool.query(sqlCreate,function(error,result){
//     if(error)
//        throw error

//     console.log('Tabela criada com sucesso!');
// });
module.exports ={
async create(nomecorretora,ativo,valorporoperacao){
    const sql= `INSERT INTO corretoras(nomecorretora,ativo,valorporoperacao) VALUES($1,$2,$3)`;
    const result = await pool.query(sql,[nomecorretora,ativo,valorporoperacao]);
    return result.rowCount;
},


async read(){
    const sql= `SELECT * FROM corretoras`;
    const result = await pool.query(sql);
    return result.rows;
},

async update(nomecorretora,ativo,valorporoperacao,id){
    const sql= `UPDATE corretoras SET nomecorretora = $1,ativo =$2,valorporoperacao=$3 WHERE id=$4`;
    const result = await pool.query(sql,[nomecorretora,ativo,valorporoperacao,id]);
    return result.rowCount;
},

async delete(id){
    const sql= `DELETE FROM corretoras WHERE id=$1`;
    const result = await pool.query(sql,[id]);
    return result.rowCount;
},


}



