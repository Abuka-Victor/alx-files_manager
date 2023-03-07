import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    res
      .status(200)
      .json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    const userNo = await dbClient.nbUsers();
    const filesNo = await dbClient.nbFiles();

    res.status(200).json({ users: userNo, files: filesNo });
  }
}

module.exports = AppController;
