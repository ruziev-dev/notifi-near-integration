import * as fs from "fs";

const FOLDER_NAME = "logs";

class Logger {
  private formatLog(data: any, prefix?: string) {
    return (
      [
        `[${new Date().toISOString()}]`,
        "near_analizer",
        prefix,
        JSON.stringify(data, null, 2),
      ].join(" ") + "\n\n"
    );
  }

  private log(data: any, prefix?: string) {
    if (!fs.existsSync(FOLDER_NAME)) fs.mkdirSync(FOLDER_NAME);
    const fileName = new Date().toISOString().slice(0, 10) + ".log";

    const fullLogMessage = this.formatLog(data, prefix);
    console.log(fullLogMessage);
    const fullPath = `${FOLDER_NAME}/${fileName}`;
    if (!fs.existsSync(fullPath))
      fs.writeFileSync(fullPath, fullLogMessage, {});
    else fs.appendFileSync(fullPath, fullLogMessage, {});
  }

  error(error: Error) {
    this.log(error.stack || error.message, "ERROR");
  }

  info(data: any) {
    this.log(data, "INFO");
  }

  warn(data: any) {
    this.log(data, "WARN");
  }
}

export default new Logger();
