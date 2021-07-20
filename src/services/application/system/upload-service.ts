import { IHttpResponse } from "src/models";
import { Injectable } from "uxmid-core";

import ServiceBase from "../../service-base";

@Injectable()
export default class UploadService extends ServiceBase
{
    public async testUpload(file: File)
    {
        console.log("test upload", file);

    }

    /**
     * blob文件上传
     * @param blobs Array<Blob>
     * @param onUploadProgress 
     */
    public async blobUpload(blobs: Array<Blob>, onUploadProgress?: (progressEvent: any) => void): Promise<Array<any>>
    {
        const result: Array<any> = [];
        const res = await this.mainApis.fileUpload({
            files: blobs,
            onUploadProgress
        });
        res.content.forEach(item =>
        {
            result.push(item);
        });
        return result;
    }
}
