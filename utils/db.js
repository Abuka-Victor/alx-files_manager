import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const URI = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  isAlive() {
    if (this.client.isConnected()) return true;
    return false;
  }

  async nbUsers() {
    const result = await this.client
      .db(DATABASE)
      .collection('users')
      .countDocuments();
    return result;
  }

  async nbFiles() {
    const result = await this.client
      .db(DATABASE)
      .collection('files')
      .countDocuments();
    return result;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
