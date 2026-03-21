/*
Implement Rate Limiting Proxy
    Problem: Build a rate limiting proxy for an API service. 
    The proxy allows a maximum of 3 requests within any 10-second window. Requests beyond the limit are rejected.

Requirements:

    Subject interface: ApiService with request(String endpoint) returning a String
    RealSubject: RealApiService that returns "Response from [endpoint]"
    Proxy: RateLimitingProxy that allows at most 3 requests per 10-second window, rejecting excess requests with "Rate limit exceeded"
*/

interface ApiService{
    request(endpoint: string): string
}

class RealApiService implements ApiService{
    request(endpoint: string): string {
        return "Response from " + endpoint;
    }

}

class RateLimitingProxy implements ApiService{
    // TODO: Add a field to store the real ApiService reference
    // TODO: Add an array to store timestamps of recent requests
    // TODO: Add a field for MAX_REQUESTS (3)
    // TODO: Add a field for TIME_WINDOW_MS (10000)
    private realService: ApiService;
    private timestamps: number[] = []
    private static readonly MAX_REQUESTS = 3;
    private static readonly TIME_WINDOW_MS = 10_000;

     constructor(realService: ApiService) {
        this.realService = realService;
    }

    request(endpoint: string): string {
        const now = Date.now();
        this.timestamps = this.timestamps.filter(t => now - t <= RateLimitingProxy.TIME_WINDOW_MS);
        if (this.timestamps.length >= RateLimitingProxy.MAX_REQUESTS) {
            return "Rate limit exceeded. Try again later.";
        }
        this.timestamps.push(now);
        return this.realService.request(endpoint);
    }

}


const api: ApiService = new RateLimitingProxy(new RealApiService());

console.log(api.request("/users"));
console.log(api.request("/orders"));
console.log(api.request("/products"));
console.log(api.request("/inventory")); // Should be rejected