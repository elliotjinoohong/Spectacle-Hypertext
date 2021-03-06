import { MongoClient } from 'mongodb'

// add mongo password and default db, replace with your own connection string
const uri = "mongodb+srv://xchai1:87581155Ab!!@cluster0.6ui0o.mongodb.net/Assignment?authSource=admin&replicaSet=atlas-6yv2c5-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"

const MongoDbConnection = function () {

    let client: MongoClient = null;
    let instance = 0;

    async function DbConnect(): Promise<MongoClient> {
        try {
            const _client = await new MongoClient(uri, { useNewUrlParser: true }).connect();
            return _client
        } catch (e) {
            console.log(e)
            return e;
        }
    }

   async function Get(): Promise<MongoClient> {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            // console.log(`DbConnection called ${instance} times`);

            if (client != null) {
                // console.log(`db connection is already alive`);
                return client;
            } else {
                client = await DbConnect();
                return client; 
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


export default MongoDbConnection()
