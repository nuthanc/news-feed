import { SocialNetworkInterface } from "../models/interfaces/social-network-interface";
import User from "../models/user";

class SocialNetworkRepository implements SocialNetworkInterface {
  signup(username: string, password: string): User {
    let sql;
    try {
      sql = `INSERT INTO Users (username, password) VALUES (?, ?)`;
      let params = [username, password];
      const userId = await this.db.run(sql, params);
      const sessionId = await this.createSession(userId);
      this.id = userId;
      console.log(`User ${username} created successfully\n`);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
    }
  }

  async createSession(userId) {
    let sql, sessionId;
    try {
      sql = `INSERT INTO Sessions (user_id) VALUES (?)`;
      const params = [userId];
      sessionId = await this.db.run(sql, params);
    } catch (err) {
      console.error('Error running sql ' + sql);
      console.error(err);
      sessionId = null;
    }
    return sessionId;
  }
}