const { Router } = require("express");
const { genresDb } = require("./controllers");

const router = Router();

router.get("/",async (req,res)=>{
   try {
    const allGenres= await genresDb();
    res.status(200).send(allGenres);
   } catch (error) {
    res.status(404).send(error)
   } 
})

module.exports=router;