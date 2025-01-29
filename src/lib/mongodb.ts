/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from 'mongodb'

const uri = process.env.DATABASE_URL!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>

if (!process.env.DATABASE_URL!) {
    throw new Error('Adicione a variável de ambiente DATABASE_URL no arquivo .env');
}

if (process.env.DATABASE_URL === 'development') {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise