import Patient from "../model/patient";

class PatientService {

    async create(name: string, address: string, blood_group: string) {
        const newPatient = new Patient({
            name: name,
            address: address,
            blood_group: blood_group
        });

        return newPatient.save();
    }

    async update({id, name, address, blood_group}: {id: string, name?: string, address?: string, blood_group?: string}) {
        const patient = await Patient.findOne({_id: id});
        if (!patient) {
            throw new Error("Could not find Patient with id : " + id);
        }

        patient.name = name ? name : patient.name;
        patient.address = address ? address : patient.address;
        patient.blood_group = blood_group ? blood_group : patient.blood_group;

        return patient.save();
    }

    async delete(id: string) {
        const patient = await Patient.findOne({_id: id});
        if (!patient) {
            throw new Error("Could not find Patient with id : " + id);
        }

        await patient.remove();
    }

    async getById(id: string) {
        const patient = await Patient.findOne({_id: id});
        if (!patient) {
            throw new Error("Could not find Patient with id : " + id);
        }

        return patient;
    }

    async getAll() {
        return Patient.find();
    }
}

export default PatientService;