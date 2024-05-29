var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/finishGame", function (req, res){
    usuarioController.finishGame(req,res);
});

router.get("/album", function(req,res){
    usuarioController.album(req,res);
});

router.post("/quizResultado", function(req,res){
    usuarioController.quizResultado(req,res);
});

router.get("/kpi1", function(req,res){
    usuarioController.kpi1(req,res);
});

router.post("/kpi2", function(req,res){
    usuarioController.kpi2(req,res);
});


module.exports = router;