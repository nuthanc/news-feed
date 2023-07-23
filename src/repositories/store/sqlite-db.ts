import { Database, Statement } from 'sqlite3';
import { readFileSync } from 'fs';
import { DB } from '../../models/interfaces/db-interface';

class SqliteDB implements DB {
  private static db: Database;

  private constructor() {
    this.db = new Database('./store.db', (err) => {
      if (err) {
        console.log('Could not connect to database', err);
      } else {
        console.log('Connected to database');
      }
    });
  }
  getInstance(): Database {
    if (SqliteDB.db) {
      return new SqliteDB();
    }
  }

  initializeDb() {
    const schema = readFileSync('schema.sql').toString();
    return new Promise<void>((resolve, reject) => {
      this.db.exec(schema, (err) => {
        if (err) {
          console.log('Error initializing database');
          reject(err);
        } else {
          console.log('Database initialized\n');
          resolve();
        }
      });
    });
  }

  get(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  run(sql: string, params: any[] = []): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  each(
    sql: string,
    params: any[] = [],
    callback: (arg0: unknown, arg1: Statement) => void
  ) {
    return new Promise<void>((resolve, reject) => {
      this.db.each(sql, params, function (err, row) {
        if (err) {
          reject(err);
        } else {
          callback(row, this);
        }
      });
      resolve();
    });
  }

  // TODO: Remove this later
  all(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default SqliteDB;
