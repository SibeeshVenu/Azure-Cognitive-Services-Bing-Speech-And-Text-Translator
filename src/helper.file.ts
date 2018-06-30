import * as fs from 'fs';
import { Buffer } from "buffer";

export function readFile(path: string) {
    const fileData = fs.readFileSync(path).toString("hex");
    return Buffer.from(fileData);
}