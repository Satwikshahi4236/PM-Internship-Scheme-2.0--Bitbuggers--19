import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private db: ReturnType<typeof drizzle>;
  private sqlite: Database.Database;

  private constructor() {
    // Create database file in a persistent location
    const dbPath = path.join(process.cwd(), 'swaasth.db');
    this.sqlite = new Database(dbPath);
    this.db = drizzle(this.sqlite, { schema });
    
    // Enable foreign keys
    this.sqlite.pragma('foreign_keys = ON');
    
    // Initialize database
    this.initializeDatabase();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getDb() {
    return this.db;
  }

  private initializeDatabase() {
    try {
      // Run migrations
      migrate(this.db, { migrationsFolder: './database/migrations' });
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }

  public close() {
    this.sqlite.close();
  }
}

export const dbConnection = DatabaseConnection.getInstance();
export const db = dbConnection.getDb();