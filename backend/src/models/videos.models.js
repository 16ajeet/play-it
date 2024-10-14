import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const videosSchema = new Schema (
    {
        videoFile : [{
            type : String,
            required : true,
            unique : true
        }],
        thumbnail : {
            type : String,
            required : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String
        },
        duration : {
            type : Number,
            required : true
        },
        views : {
            type : Number,
            required : true
        },
        isPublished : {
            type : Boolean,
            default : true
        }
    },{timestamps : true}
);

videosSchema.plugin(mongooseAggregatePaginate);
export const Videos = mongoose.model("Videos", videosSchema)