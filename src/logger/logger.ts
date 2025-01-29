import pino, { TransportTargetOptions } from "pino";

const mongoTarget: TransportTargetOptions = {
  level: "error",
  options: {
    capped: true,
    collection: "logs",
    uri:
      (process.env.NODE_ENV === "test"
        ? process.env.ATLAS_URL_TEST
        : process.env.ATLAS_URL) ?? ""
  },
  target: "pino-mongodb"
};

const consoleTarget: TransportTargetOptions = {
  level: "info",
  options: { colorize: true },
  target: "pino-pretty"
};

const targets = [consoleTarget];
if (process.env.NODE_ENV !== "test") targets.push(mongoTarget);

const transport = pino.transport({
  targets
});

const logger = pino(transport);

const getLogger = (moduleName: string) => logger.child({ module: moduleName });

export { getLogger };
