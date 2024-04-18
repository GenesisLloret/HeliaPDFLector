import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'
export async function createNode() {return await createHelia();}
export async function nodeFs(e) {return await unixfs(e);}
export async function obtenerObj(e, f) {
    const fs = unixfs(e)
    const data = fs.cat(CID.parse(f))
    return data;
}
