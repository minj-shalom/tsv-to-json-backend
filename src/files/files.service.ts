import { Readable } from "stream";
import { resolve } from "path";
import { createReadStream, createWriteStream, writeFileSync } from "fs";
import TsvToJson from "./TsvToJson";
import { JsonFormatter } from "./JsonFormatter";
import { v4 } from "uuid";
import { FileSystemModel } from "../models/models";
import { koreaTimezone } from "../commons/in-memory-map";

export class FilesService {
  async readCsvFile(stream: Readable) {
    const uniqueId = v4();
    const now = new Date(Date.now() + koreaTimezone).toISOString();

    const newFile = {
      fileId: uniqueId,
      createdAt: now,
      updatedAt: now,
    };

    await FileSystemModel.create(newFile);

    const writeStream = createWriteStream(
      resolve("./input"!, `${uniqueId}.tsv`)
    );

    stream.pipe(writeStream);

    return uniqueId;
  }

  async writeJsonFile(uniqueId: string) {
    const readStream = createReadStream(`./input/${uniqueId}.tsv`);
    const tsv: any = [];

    readStream.on("data", (chunk) => {
      tsv.push(chunk);
    });

    readStream.on("end", () => {
      const origin = TsvToJson(Buffer.concat(tsv).toString());
      const json = JsonFormatter(origin);
      const en = `export default ${JSON.stringify(json.en_json)}`;
      const ko = `export default ${JSON.stringify(json.ko_json)}`;
      writeFileSync(`./output/${uniqueId}_en.ts`, en);
      writeFileSync(`./output/${uniqueId}_ko.ts`, ko);
    });
  }
}
