// Target interface — what your app expects
interface Logger {
    info(message: string): void
    error(message: string): void
    warn(message: string): void
}

// Adaptee — the incompatible class you can't change
class LegacyLogger {
    logMessage(severity: string, message: string, timestamp: number): void {
        console.log(`[${severity}] ${timestamp}: ${message}`)
    }
}

// Adapter — translates Logger interface into LegacyLogger calls
class LegacyLoggerAdapter implements Logger {
    private legacyLogger: LegacyLogger

    constructor(legacyLogger: LegacyLogger) {
        this.legacyLogger = legacyLogger       // wraps the adaptee
    }

    info(message: string): void {
        this.legacyLogger.logMessage("INFO", message, Date.now())
    }

    error(message: string): void {
        this.legacyLogger.logMessage("ERROR", message, Date.now())
    }

    warn(message: string): void {
        this.legacyLogger.logMessage("WARN", message, Date.now())
    }
}

// Usage — app only knows about Logger, has no idea LegacyLogger exists
function processOrder(logger: Logger) {
    logger.info("Order started")
    logger.warn("Low stock")
    logger.error("Payment failed")
}

const legacyLogger = new LegacyLogger()
const adapter = new LegacyLoggerAdapter(legacyLogger)
processOrder(adapter)   // works seamlessly with the adapter

