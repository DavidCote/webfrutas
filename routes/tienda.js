var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Producto = require('../models/producto');
const Pedido = require('../models/pedido');
const { isAuthenticated } = require('../helpers/auth');

router.get('/',isAuthenticated, async (req, res) => {
  const prod = await Producto.find();
  res.render('index', {prod});
});

router.get('/nuevo', isAuthenticated, (req, res) => {
  res.render('nuevoElem');
});

router.get('/pedido', isAuthenticated, (req,res) => {
  res.render('pedido');
});

router.post('/nuevo_pedido', isAuthenticated, async(req, res) => {
  const Npedido = new Pedido({
    nombreU: req.body.nombreU,
    cantidad: req.body.cantidad,
    total: req.body.total,
    direccion: req.body.direccion,
  });
  await Npedido.save((err,data) => {
    if (err) {
      res.send('error');
    }else {
      res.redirect('/tienda');
    }
  });
});

router.post('/nuevo_elemento', isAuthenticated, async(req, res) => {
  const Nproducto = new Producto({
    tipo: req.body.tipo,
    nombre: req.body.nombre,
    color: req.body.color,
    imgurl: req.body.imgurl,
    existencias: req.body.existencias,
    precio: req.body.precio,
  });
  await Nproducto.save((err,data) => {
    if (err) {
      res.send('error');
    }else {
      res.redirect('/tienda');
    }
  });
});

router.get('/editar/:id', isAuthenticated, async(req,res) => {
  const prod = await Producto.findById(req.params.id);
  res.render('edit',{prod});
});

router.put('/editar-producto/:id', isAuthenticated, async (req,res) => {
  const {tipo, nombre, color, imgurl, existencias, precio}=req.body;
  await Producto.findByIdAndUpdate(req.params.id, {tipo, nombre, color, imgurl, existencias, precio});
  res.redirect('/tienda');
});

router.delete('/borrar/:id',isAuthenticated, async (req, res)=> {
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect('/tienda');
});
module.exports = router;
