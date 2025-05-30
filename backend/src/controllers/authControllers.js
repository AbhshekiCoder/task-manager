import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, phone, email,  password: hashedPassword });
    await user.save();

    res.status(201).send({success: true, message: 'Signup successful' });
  } catch (err) {
    res.send({success: false,  message: 'Signup failed', error: err.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({success: false, message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({success: true, message: 'login  successfull', token: token });
  } catch (err) {
    console.log(err.message)
    res.json({ message: 'Signin failed', error: err.message });
  }
};
