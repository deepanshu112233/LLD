
interface VideoService {
  playVideo(videoId: string): void;
}

class RealVideoService implements VideoService {
  playVideo(videoId: string): void {
    console.log(`Playing video from server: ${videoId}`);
  }
}

class VideoServiceProxy implements VideoService {
  private realService: RealVideoService;
  private cache: Map<string, string> = new Map();

  constructor() {
    this.realService = new RealVideoService();
  }

  playVideo(videoId: string): void {
    // 🔒 Access control
    if (!this.checkAccess()) {
      console.log("Access Denied");
      return;
    }

    // ⚡ Caching
    if (this.cache.has(videoId)) {
      console.log("Playing from cache:", videoId);
      return;
    }

    // 🎯 Actual call
    this.realService.playVideo(videoId);

    // Store in cache
    this.cache.set(videoId, "cached");
  }

  private checkAccess(): boolean {
    return true; // simulate auth
  }
}

const service: VideoService = new VideoServiceProxy();

service.playVideo("abc123"); // real call
service.playVideo("abc123"); // cached




interface Database {
    query(sql: string): string
}

class RealDatabase implements Database {
    query(sql: string): string {
        console.log(`[DB HIT] ${sql}`)
        return `result: ${sql}`
    }
}

// ✅ Caching Proxy — same query? return cached result
class CachingDatabaseProxy implements Database {
    private db: RealDatabase
    private cache: Map<string, string> = new Map()

    constructor(db: RealDatabase) {
        this.db = db
    }

    query(sql: string): string {
        if (this.cache.has(sql)) {
            console.log(`[CACHE HIT] ${sql}`)
            return this.cache.get(sql)!
        }

        const result = this.db.query(sql)
        this.cache.set(sql, result)    // store for next time
        return result
    }
}

const db    = new RealDatabase()
const proxy = new CachingDatabaseProxy(db)

proxy.query("SELECT * FROM users")
// [DB HIT] SELECT * FROM users      ← first time, hits DB

proxy.query("SELECT * FROM users")
// [CACHE HIT] SELECT * FROM users   ← second time, from cache

proxy.query("SELECT * FROM users")
// [CACHE HIT] SELECT * FROM users   ← third time, from cache

proxy.query("SELECT * FROM orders")
// [DB HIT] SELECT * FROM orders     ← different query, hits DB