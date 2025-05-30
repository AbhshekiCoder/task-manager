import Task from '../models/Task.js'

 const deleteTask = async (req, res) => {
    try {
      await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        let result = await Task.find({user: req.user.id});
             
      res.status(200).json({success: true, message: 'Task deleted', data: result });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
  };

  export default deleteTask
  