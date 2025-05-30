
import Task from "../../models/Task.js";
const task = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
      res.status(200).json({success: true, data: tasks});
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks', error: err.message });
      console.log(err.message)
    }
  };

export default task;