import { Request, Response } from "express";
import Busboy from "busboy";
import { FilesService } from "./files.service";

export class FilesController {
  constructor(private filesService: FilesService) {}

  // upload
  async upload(req: Request, res: Response) {
    const busboy = Busboy({
      headers: req.headers,
    });

    let uniqueId: string;

    busboy.on("file", async (_name, stream) => {
      const id = await this.filesService.readCsvFile(stream);
      await this.filesService.writeJsonFile(id);

      uniqueId = id;
    });

    busboy.on("error", (error) => {
      console.error(error);
    });

    busboy.on("finish", () => {
      res.status(200).json({
        data: {
          fileId: uniqueId,
        },
        status: "success",
      });
    });

    req.pipe(busboy);
  }

  // download
  async downloadEn(req: Request, res: Response) {
    try {
      const { fileId } = req.query;

      if (typeof fileId !== "string" || fileId === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      res.download(`./output/${fileId}_en.ts`);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  async downloadKo(req: Request, res: Response) {
    try {
      const { fileId } = req.query;

      if (typeof fileId !== "string" || fileId === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      res.download(`./output/${fileId}_ko.ts`);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  // cron-job: Periodically clear the cache.
  async clearCache(req: Request, res: Response) {
    try {
      this.filesService.clearCache().then((result) => {
        if (result) {
          return res.status(200).json({
            data: { deleteQueue: result },
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "크론잡 수행(clearCache)에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }
}
