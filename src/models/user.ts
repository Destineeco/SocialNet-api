import { Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string,
  email: string,
  thoughts: Schema.Types.ObjectId[],
  friends: string[],
 }

const userSchema = new Schema<IUser>(
 {
   username: {
     type: String,
     required: true,
     unique: true,
     trim: true,
   },
   email: {
     type: String,
     required: true,
     unique: true,
     match: [/.+@.+\..+/, 'Must match an email address!'],
   },
   thoughts: [
     {
       type: Schema.Types.ObjectId,
       ref: 'Thought',
     },
   ],
   friends: [
     {
       type: [
        {
          type:String,
        },
       ],
       ref: 'User',
     },
   ],
 },
 {
   toJSON: {
     virtuals: true,
   },
   id: false,
 }
);

userSchema.virtual('friendCount').get(function () {
 return this.friends.length;
});

const User = model('User', userSchema);

export default User;
