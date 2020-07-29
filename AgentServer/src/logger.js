import winston from 'winston';
import process from 'process';
import expressWinston from 'express-winston';

const isProduction = process.env.NODE_ENV === 'production';

const simpleFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
});

const fancyConsoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.label({ label: 'agent-server' }),
    winston.format.timestamp(),
    simpleFormat,
)

const logger = winston.createLogger({
    level      : (isProduction ? 'info' : 'debug'),
    info       : winston.format.json,
    transports : [ new winston.transports.Console({ format: fancyConsoleFormat }), ],
});

const express_logger = expressWinston.logger({
    level      : (isProduction ? 'debug': 'debug'),
    info       : winston.format.json,
    transports : [ new winston.transports.Console({ format: fancyConsoleFormat }), ],
})

const express_error_logger = expressWinston.logger({
    level      : (isProduction ? 'debug': 'warn'),
    info       : winston.format.json,
    transports : [ new winston.transports.Console({ format: fancyConsoleFormat }), ],
})

winston.addColors({
    error: 'red',
    warn : 'yellow',
    info : 'cyan',
    debug: 'green'
})

export default logger
export { express_logger, express_error_logger };
