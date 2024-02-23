const router = require("express").Router();
const Note = require("../models/Notes");
const User = require("../models/User")
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
router.delete("/deleteNote/:id", async (req, res) => {
    try {
        const note = await Note.deleteOne({ _id: req.params.id });
        if (note.deletedCount === 0) {
            return res.status(404).json({ message: "Note not found", status: false });
        }
        res.status(200).json({ message: "Note deleted successfully", status: true });
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
});



// update notes
router.put("/updateNote/:id",async(req,res)=>{
    try{
        const notes = await Note.findOne({_id:req.params.id});
        !notes && 
        res.status(400).json({message:"note not found",status:false});
        const note = await Note.updateOne({
            title:req.body.title,
            description:req.body.description,
            postedBy:req.body.postedBy
        });
        res
        .status(200)
        .json({message:"note updated successfully",status:true});

    }catch(e){
        res.status(500).json(e); 
    }
    
})


// get all notes
router.get("/getNote/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        console.log(currentUser,'currentuser--->>>');
        if (!currentUser) {
            return res.status(400).json({ data: "User not found" });
        }
        const notes = await Note.find({ postedBy: req.params.userId });
        res.status(200).json(notes);
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router