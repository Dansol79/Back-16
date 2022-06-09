import knex from "knex" ;
import { sqlite } from "../config/db.js";

const myknex = knex(sqlite);

class Message{
    constructor(name){
        this.table = name;

    }

    async init(){
        await myknex.schema.createTable(this.table, table =>{
            table.increments('id').primary();
            table.string('author');
            table.string('text');
            table.timestamp('fyh', { useTz: true }).notNullable().defaultTo(myknex.fn.now());

           
        })
    }

    async save(obj){
        try{
            return await myknex(this.table).insert([obj]);

        }catch(error){
            console.log(`No se puede guardar los mensajes${error}`);
        }

    }

    async getAllMessage(){
        try{
            return await myknex.from(this.table).select('*');
        }catch(error){
            console.log(`No se pueden obtener los mensajes ${error}`);
        }
    }
}

export default Message;