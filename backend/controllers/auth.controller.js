import bcrypt from "bcryptjs"

import  User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async(req, res)=>{

    try{
        const {fullname, username, password, confirmPassword, gender} = req.body

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }

        const user =  await User.findOne({ username})

        if(user) {
            return res.status(400).json({error: "Username already exists !"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const malePicProf = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femalePicProf = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? malePicProf : femalePicProf
        }) 

        if(newUser){
            //Generate JWT token and set as cookie
              generateTokenAndSetCookie({
			    _id: newUser._id,
			    fullName: newUser.fullname,
			    username: newUser.username,
			    profilePic: newUser.profilePic,
		    }, res);

            await newUser.save()

            res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
        }else{
            res.status(400).json({error: "Invalid user data."})
        }

    }catch(error){
        console.log("Error in sign up controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }

}

export const login = async(req, res)=>{

    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({erorr: "Invalid username or password"})
        }

        generateTokenAndSetCookie({
			_id: user._id,
			fullName: user.fullname,
			username: user.username,
			profilePic: user.profilePic,
		}, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullname,
			username: user.username,
			profilePic: user.profilePic,
		});
    }catch(error){
        console.log("Error in Login controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = async(req, res)=>{

    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"Logged Out successfully"})
    }catch(error){
        console.log("Error in Logout controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}