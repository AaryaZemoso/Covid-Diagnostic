import { ObjectId } from "mongodb";
import Lab from "../model/lab";

class LabService {

    async create(name: string, price: number) {
        const newLab = new Lab({
            name: name,
            price: price
        });

        return newLab.save();
    }

    async update({id, name, price}: {id: number | ObjectId | string, name?: string, price?: number}) {
        const lab = await Lab.findOne({
            _id: id
        });
        if (!lab) {
            throw new Error("Could not find lab with id : " + id);
        }

        lab.name = name ? name : lab.name;
        lab.price = price ? price : lab.price;

        return lab.save();
    }

    async delete(id: number | ObjectId | string) {
        const lab = await Lab.findOne({
            _id: id
        });
        if (!lab) {
            throw new Error("Could not find lab with id : " + id);
        }

        await lab.remove();
    }

    async getById(id: string | number | ObjectId) {
        const lab = await Lab.findOne({
            _id: id
        });
        if (!lab) {
            throw new Error("Could not find lab with id : " + id);
        }

        return lab;
    }

    async getAll() {
        return Lab.find();
    }
}

export default LabService;