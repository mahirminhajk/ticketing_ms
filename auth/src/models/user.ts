import { Model, model, Schema } from "mongoose";
import { IUser } from "../types";
import { Password } from "../services";

//* interface for simple user Attributes
type userAttrsType = {
  email: string;
  password: string;
}
//* interface for user model
interface IUserModel extends Model<IUser> {
  build(attrs: userAttrsType): IUser;
}

//* user schema
const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//* middleware for password hashing
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        const hashed = Password.toHash(user.get("password"));
        user.set("password", hashed);
    }
    next();
});

//* static methods for user model
userSchema.statics.build = (attrs: userAttrsType) => {
    return new User(attrs);
};

//* user model
const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

User.build({
    email: "ddk@dk",
    password: "dkd",
});

//* export
export default User;
