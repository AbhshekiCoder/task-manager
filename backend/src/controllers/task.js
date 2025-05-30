import Task from '../models/Task.js';

 const task = async (req, res) => {
  try {
    const { name, description, date, time, status, priority } = req.body;
    console.log(name)
    const task = new Task({
      name,
      description,
      date,
      time,
      status,
      user: req.user.id,
      priority
    });
    await task.save();
    let result = await Task.find({user:req.user.id})
    console.log(result)
    res.status(201).json({success: true, message: "successfully created task", data : result });
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
    console.log(err.message)
  }
};

export default task

