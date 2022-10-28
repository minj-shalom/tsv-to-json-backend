export default function CsvToJson(csv: string) {
  const rows = csv.split("\n");
  const json = new Array<object>();
  const header = rows[0].split(",");
  for (let i = 1; i < rows.length; i++) {
    let obj: any = {};
    let row = rows[i].split(",");
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = row[j];
    }
    json.push(obj);
  }
  return json;
}
