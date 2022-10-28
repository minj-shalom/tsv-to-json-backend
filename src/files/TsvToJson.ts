export default function TsvToJson(tsv: string) {
  const rows = tsv.split("\r\n");
  const json = new Array<object>();
  const header = rows[0].split("\t");
  for (let i = 1; i < rows.length; i++) {
    let obj: any = {};
    let row = rows[i].split("\t");
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = row[j];
    }
    json.push(obj);
  }
  return json;
}
