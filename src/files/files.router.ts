import { Router } from "express";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

const filesRouter = Router();

const filesController = new FilesController(new FilesService());

// upload
filesRouter.post("/upload", (req, res) => filesController.upload(req, res));

// download
filesRouter.get("/download/en", (req, res) =>
  filesController.downloadEn(req, res)
);
filesRouter.get("/download/ko", (req, res) =>
  filesController.downloadKo(req, res)
);

// cron-job: Periodically clear the cache.
filesRouter.patch("/cron-job/clear-cache", (req, res) =>
  filesController.clearCache(req, res)
);

export default filesRouter;
