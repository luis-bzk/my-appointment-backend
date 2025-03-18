import { Pool } from 'pg';

export class PostgresDatabase {
  private static pool: Pool;

  static async connect(options: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
  }) {
    if (!this.pool) {
      this.pool = new Pool(options);
      this.pool.on('connect', () => {
        console.log('Connected to the PostgreSQL database');
      });
      this.pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });

      try {
        // Verify initial connection
        await this.pool.query('SELECT NOW()');
        console.log(
          'Initial connection to the PostgreSQL database was successful',
        );
      } catch (error) {
        console.error(
          'Failed to establish initial connection to the PostgreSQL database',
          error,
        );
        throw error;
      }
    }
  }

  static getPool() {
    if (!this.pool) {
      throw new Error(
        'Database connection not established. Call connect() first.',
      );
    }
    return this.pool;
  }
}
