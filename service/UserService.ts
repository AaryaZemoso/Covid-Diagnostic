import { ObjectId } from "mongodb";
import User from "../model/users";

class UserService {

    async create(name: string, email: string, password: string) {
        const user = await User.findOne({email: email});
        if (user) {
            throw new Error("User already exists with this email");
        }        
        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        return newUser.save();
    }

    async update({id, name}: {id: string | number | ObjectId, name?: string}) {
        const user = await User.findOne({
            _id: id
        });
        if (!user) {
            throw new Error("Could not find user with id : " + id);
        }

        user.name = name ? name : user.name;

        return user.save();
    }

    async delete(id: string | number | ObjectId) {
        const user = await User.findOne({
            _id: id
        });
        if (!user) {
            throw new Error("Could not find user with id : " + id);
        }

        await user.remove();
    }

    async getByEmail(email: string) {
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error("Could not find user with email : " + email);
        }
        return user;
    }

    async getById(id: string | number | ObjectId) {
        const user = await User.findOne({
            _id: id
        });
        if (!user) {
            throw new Error("Could not find user with id : " + id);
        }

        return user;
    }

    async getAll() {
        return User.find();
    }
}

export default UserService;