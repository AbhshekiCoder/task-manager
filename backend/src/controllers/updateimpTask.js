import Task from "../models/Task.js";

 const updateimpTask = async (req, res) => {
   try {
           console.log(req.body.important)
        let result = await Task.findOne({$and:[{_id: req.params.id}, {user: req.user.id}]})
        if(result.important == "yes"){
            
           const updatedTask = await Task.findOneAndUpdate(
               { _id: req.params.id, user: req.user.id },
               { $set: {important: "no"} },
               { new: true }
             );
   
             let result = await Task.find({user: req.user.id});
       
             res.status(200).json({success: true, message: "task updated successfully", data: result});
   
        }
        else{
           const updatedTask = await Task.findOneAndUpdate(
               { _id: req.params.id, user: req.user.id },
               { $set: {important: req.body.important} },
               { new: true }
             );
             let result = await Task.find({user: req.user.id});
       
             res.status(200).json({success: true, message: "task updated successfully", data: result});
   
        }
        
       } catch (err) {
         res.status(500).json({ message: 'Error updating task', error: err.message });
         console.log(err.message)
       }
  };

  export default updateimpTask;