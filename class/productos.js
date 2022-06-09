import knex from "knex" ;
import {options} from "../config/db.js";

const myknex = knex(options);

class Producto{
    constructor(name){
        this.table = name;

    }

   async init(){
        await myknex.schema.createTable(this.table, table =>{
            table.increments('id').primary();
            table.string('title');
            table.string('description');
            table.string('price');
            table.string('imagen');
        })
    }

    async save(obj){
        try{
            return await myknex(this.table).insert([obj]);

        }catch(error){
            console.log(`Ocurrio un error al guardar el producto ${error}`);
        }

    }
    async getById(id){
        try{
            return await myknex.from('productos').where('id','=',id);

        }catch(error){
            console.log(`Ocurrio un error al obtener el producto ${error}`);
        }
    }
    async getAll(){
        try{
            return await myknex.from(this.table).select('*');

        }catch(error){
            console.log(` No se pueden Obtener los productos ${error}`);
        }
    }
    async deleteById(id){
        try{
            return await myknex(this.table).where('id', id).del();
        }catch(error){
            console.log(`No se puede eliminar el producto ${error}`);
        }
    }
    async deleteAll(){
        try{
            return await myknex.from(this.table).del();
        }catch(error){
            console.log(`Los productos no se pudieron eliminar ${error}`);
        }
    }
    async updateById(id, obj){
        try{
            return await myknex(this.table).where('id', id).update([obj]);
        }catch(error){
            console.log(`No se pudo actualizar el producto ${error}`);
        }
    }

}

export default Producto;