const router = require("express").Router();
const Note = require("../models/Notes");

// create notes
router.post("/addNote", async (req, res) => {
    try {
        const { title, description, postedBy } = req.body;
        if (!title || !description || !postedBy) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const note = new Note({
            title: title,
            description: description,
            postedBy: postedBy
        });
        const data = await note.save();
        res.status(200).json(data);
    } catch (e) {
        console.error("Error adding note:", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// delet notes
router.delete("/deleteNote",async(req,res)=>{
    try{
      const note = await Note.deleteOne({_id:req.params.id})
      res.status(200).json({message:"note deleted successfully",status:true});
    }catch(e){
        res.status(500).json(e)
    }
    
})


// update notes
router.put("/updateNote",(req,res)=>{
    
})


// get all notes
router.get("/getNote",(req,res)=>{
    
})
module.exports = router