import fs from "fs";

class CodedError extends Error {
  code: string | undefined;
}

try {
  fs.mkdirSync("./input", {
    recursive: true,
  });
  fs.mkdirSync("./output", {
    recursive: true,
  });
} catch (e) {
  console.error(e);
  if (!(e instanceof CodedError && e.code === "EEXISTS")) {
    throw e;
  }
}
