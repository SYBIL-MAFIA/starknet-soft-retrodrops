import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

export function createLoggerInstance(addressIndex) {
    const myFormat = printf(({ level, message, timestamp }) => {
        const formattedTimestamp = timestamp.replace(/:/g, '-');
        return `${formattedTimestamp} ${level}: ${message}`;
    });

    return createLogger({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        transports: [
            new transports.File({ filename: `./logs/starknet_${new Date().toISOString().replace(/:/g, '-').replace(/T|\..+/g, '_')}.log` }),
            new transports.Console()
        ],
    });
}

