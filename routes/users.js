const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const helmet = require("helmet");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());
router.use(express.json());

router.get("/", (req,res)=>{
    try{
        userModel.find({},(err, users)=>{
            if(err)
            {
                res.status(500).json({"message":"An error occured, ",exp});
                return;
            }
            res.status(200).send(users);    
        });
        
    }
    catch(exp)
    {
        res.status(500).json({"message":"An error occured, ",exp});
    }
});

router.get("/:id", async(req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(exp)
    {
        res.status(500).json({"message":"An error occured, ",exp});
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'An error occurred.' });
    }
  });
  
  // Delete a user by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(204).json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  });

module.exports = router;
