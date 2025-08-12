const mongoose =require("mongoose")

const poseSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      require:true,
      trim:true,
    },
    content:{
      type:String,
      require:true,
    },
    auther :{
      type:String,
      default:"익명"
    },
    isPublished :{
      type:Boolean,
      default:false
    },
    tags:{
      type:[String],
      default:[]
    }

  },
  {timestamps:true}
)

module.exports = mongoose.model("Post",poseSchema)