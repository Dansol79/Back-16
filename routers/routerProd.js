import {Router} from "express";
import Producto from "../class/productos.js";

const routerProd = Router();
const producto = new Producto("productos");

routerProd.get('/', (req, res) => {
   const data = producto.getAll();
    res.render('index.ejs', {data});
});

routerProd.get('/:id', (req, res) => {
    const data = producto.getById(req.params.id);
    return console.log(res.json(data))
    
});

routerProd.post('/', (req, res) => {
    const data = producto.save(req.body);
    return res.json(data);
});

routerProd.delete('/:id', (req, res) => {
    const data = producto.deleteById(req.params.id);
    return res.json(data);
});

routerProd.delete('/', (req, res) => {
    const data = producto.deleteAll();
    return res.json(data);
});


export default routerProd;

