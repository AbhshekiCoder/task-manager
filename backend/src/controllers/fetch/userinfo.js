import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const userinfo = async(req, res) =>{
    let {token} = req.params;
    let user = jwt.decode(token);
    try{

    
    let result = await User.findById(user.id);
    if(result){
        console.log(result)
        res.send({success: true, data: result});
    }
    else{
        res.send({success: false, message: "user not found"})
    }
}catch(err){
    res.send({success: false, message: err.message})
}


}
export default userinfo;