import mongoose from "mongoose";
import { DBConfig } from "../config/dbconfig";

// Create new DB connection and return an instance of it.
const CreateMongoDBConnection = async (config: DBConfig) => {
    const connString = getConnectionString(config);
    return mongoose.connect(connString);
}

// Helper function
const getConnectionString = (config: DBConfig): string => {    
    return "mongodb://" + config.host + ":" + config.port + "/" + config.database;
}   

export default CreateMongoDBConnection;