import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
       username :{
        type : String,
        required: true,
        unique: true,
        lowercase : true,
        trim : true,
        index: true
       },
       email :{
        type : String,
        required: true,
        unique: true,
        lowercase : true,
        trim : true,
       },
       fullname :{
        type : String,
        required: true,
        lowercase : true,
       },
       avatar :{
        type : String, //cloudinary url
        required: true,
       },
       coverimage :{
        type: String, //cloudinary
  
       },
       watchHistory :[{
        type: Schema.Types.ObjectId,
        ref: "Video"
       }],
       password:{
        type: String,
        required: [true, "password is required"]
       },
       refreshToken:{
        type: String
       },


    },{timestamps:true}
)
 userSchema.pre("save" ,async function (next){
    if(!isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)

next()
 });

 userSchema.methods.isPasswordCorrect = async function (password){
     return await bcrypt.compare(password, this.password)
 }

userSchema.methods.generateAccessToken = async function(){
    jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN__EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    jwt.sign(
        {
        _id: this._id,
        
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = new mongoose.model("User", userSchema);