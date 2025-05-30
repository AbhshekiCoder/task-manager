import Task from "../models/Task.js"


const updateTask = async(req, res) =>{
    const {priority, name, date, time, id, description } = req.body

    try{
        let result = await Task.findByIdAndUpdate(id, {name, priority, date, time, description});
        if(result){
            console.log(result)
            res.send({success: true, message: "successfully updated task"});
        }
    }catch(err){
        res.send({success: false, message: err.message})
    }
}
export default updateTask;