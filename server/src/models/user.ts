import bcrypt from "bcrypt";
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
    const user: IUser = this as any;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as IUser;

    return bcrypt.compare(candidatePassword, user.password).then((isMatch) => {
        return isMatch;
    });
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
