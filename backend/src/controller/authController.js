import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../modules/userModule.js";
import { generateToken } from "../utils/generateToken.js";

//------------Register User------------ //
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName: `@${userName}`,
      email,
      password: hashPassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.status(201).json({
      message: "User Registation Successfuly",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      }
    });

  } catch (err) {
    res.status(400).json({
      message: err?.errors?.userName?.message ||
        err?.errors?.password?.message ||
        err?.errors?.email?.message ||
        "Server Error"
    });
  }
};

//------------Get Single User Details------------ //
export const getUser = async (req, res) => {
  const {id} = req.params;
  const user = await User.findById(id).select("-password -role");
  if(!user){
    return res.status(404).json({message: "User not found"})
  }

  res.status(200).json({ message: "Fetching user successfuly", user });

};

//------------Login User------------ //
export const loginUser = async (req, res) => {
  let { userName, email, password } = req.body;

  if ((!email && !userName) || !password) {
    return res.status(401).json({
      message: "Missing credentials. Provide email or username and password."
    });
  };

  const user = await User.findOne({ $or: [{ email }, { userName }] });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  };

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    return res.status(401).json({ message: "Invalid password" })
  }

  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.status(200).json({
    message: "Login Successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email
    },
  });
};

//---------Ckeck Token---------//
export const checkUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ isAuth: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ isAuth: false });
    }
    return res.status(200).json({ isAuth: true });
  } catch (err) {
    return res.status(500).json({ isAuth: false });
  }
}

export const adminUser = (req, res) => {
  const user = req.user;
  if(!user){
    return res.status(404).json({message: "User Note Found", isAdmin: false});
  }

  if(user.role === "admin"){
    return res.status(200).json({message: "User Founded", isAdmin: true});
  }
}

//------------Logout User------------ //
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout Successfully" });
}

//------------Get Profile User------------ //
export const getProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Pofile fetching Successfully", user });
}

export const updateProfile = async (req, res) => {
  const user = req.user;
  if(!user){
    return res.status(404).json({message: "User not found"});
  }
  
  const {userName, email} = req.body;

  user.userName = userName;
  user.email = email;

  await user.save();

  res.status(200).json({message: "Update successfully", 
    user : {
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  });
}