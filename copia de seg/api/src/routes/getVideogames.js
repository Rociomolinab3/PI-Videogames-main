const { Router } = require("express");
const axios = require("axios");
const { getInfoTotal, postVideoGame } = require("./controllers");
const { Videogame, Genre }= require("../db");
const {API_KEY}=process.env;

const router =Router();

router.get("/", async (req,res)=>{

    const { name } = req.query ;
    const allGames = await getInfoTotal();
    if( name ){
        const filterName = await allGames.filter ( (vg) => 
        vg.name.toLowerCase().includes(name.toLocaleLowerCase()));
        filterName.length ? 
        res.status(200).send(filterName):
        res.status(404).send("No se encuentra el juego con ese nombre");
    }
    else{ 
        res.status(200).send(allGames);
    }
});

router.get("/:id",async(req,res)=>{
    const {id} =req.params;
    if(isNaN(id)){
        const game= await Videogame.findByPk(id, {include: Genre});
        res.status(200).json(game);
    }
    else {
        const gameApi=await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
        {
            headers: {
                "accept-encoding": "*"
            }
        });
        const result = {
            id:gameApi.data.id,
            name: gameApi.data.name,
            description: gameApi.data.description_raw,
            image: gameApi.data.background_image,
            released: gameApi.data.released,
            genres: gameApi.data.genres.map((gen) => {
                return { id: gen.id, name: gen.name };
                }),
            rating: gameApi.data.rating,
            platforms: gameApi.data.platforms.map((el) => el.platform.name),
                }
     res.status(200).json(result);
    }

})



router.post("/", async (req,res) => {
    try {
        const objVideoGame = req.body;
        const newGame = await postVideoGame(objVideoGame);
        res.status(200).send(newGame);
        //res.status(200).send("videojuego creado con éxito");
      } catch (error) {
        res.status(400).json("Error en ruta Post", error);
      }
    });


module.exports=router;


