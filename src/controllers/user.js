const User = require('../models/user')
const {generateToken} = require('../utils/auth')

exports.signup = async(req,res) => {
    try {
        const {firstname, lastname, email, password} = req.body
        let user = await User.findOne({ email });
    
        if (user) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        user = new User({
            firstname,
            lastname,
            email,
            password
        });
    
        await user.save();
        res.status(201).json({ message: 'Successfully Created user'});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.signin = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ userId: user._id });
    res.status(200).json({ token });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}