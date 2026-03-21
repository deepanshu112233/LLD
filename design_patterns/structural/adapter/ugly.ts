// ❌ You have an old logger in your codebase
class LegacyLogger {
    logMessage(severity: string, message: string, timestamp: number): void {
        console.log(`[${severity}] ${timestamp}: ${message}`)
    }
}

// Your entire app expects this modern interface
interface Logger {
    info(message: string): void
    error(message: string): void
    warn(message: string): void
}

// You can't change LegacyLogger — it's a third party library
// You can't change Logger — your whole codebase depends on it
// They're incompatible — what do you do?

// Add logger instances
const legacyLogger = new LegacyLogger();
const logger: Logger = {
    info: (message: string) => console.log(`INFO: ${message}`),
    error: (message: string) => console.log(`ERROR: ${message}`),
    warn: (message: string) => console.log(`WARN: ${message}`),
};

// ❌ scattered translation logic all over the codebase
function doSomething(useNewLogger: boolean) {
    if (useNewLogger) {
        logger.info("started")
    } else {
        legacyLogger.logMessage("INFO", "started", Date.now())
    }
}

function doSomethingElse(useNewLogger: boolean) {
    if (useNewLogger) {
        logger.error("failed")
    } else {
        legacyLogger.logMessage("ERROR", "failed", Date.now())
    }
}

function doSomethingWarn(useNewLogger: boolean) {
    if (useNewLogger) {
        logger.warn("warning")
    } else {
        legacyLogger.logMessage("WARN", "warning", Date.now())
    }
}
// every function has this if/else — duplicated forever