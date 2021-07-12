export default
{
    downloadExcel,
    downloadFileSteam,
    downloadFileIframe,
    downloadFile
};

/**
 * 下载文件兼容性处理。
 * @param url 下载文件的url
 */
function downloadFile(url: string, name?: string): void
{
    if(!url || typeof url !== "string")
    {
        throw new Error("download url is avalid!");
    }

    const linkEl = document.createElement("a");
        
    if("download" in linkEl)
    {
        const filename = url.substr(url.lastIndexOf("/"));
        linkEl.download = name || filename;
        document.body.appendChild(linkEl);
        linkEl.href = url;
        linkEl.click();
        linkEl.remove();
    } else {
        const win = window.open(url, "_self");
        win.opener = null;
    }
}

/**
 * 下载文件兼容性处理。
 * @param url 下载文件的url
 */
function downloadFileIframe(url: string): void
{
    if(!url || typeof url !== "string")
    {
        throw new Error("download url is avalid!");
    }

    const linkEl = document.createElement("iframe");
    linkEl.setAttribute("id", "iframe_0");

    linkEl.src = url;
    document.body.appendChild(linkEl);
    setTimeout(() => {
        document.body.removeChild(linkEl);
    }, 1000);
}

/**
 * 下载文件兼容性处理。
 * @param url 下载文件的url
 */
function downloadFileSteam(url: string, name: string = new Date().getTime().toString()): void
{
    if(!url || typeof url !== "string")
    {
        throw new Error("download url is avalid!");
    }

    const requstConfig: any =
    {
        method: "GET",
        responseType: "blob"
    };

    fetch(url, requstConfig).then(res =>
    {
        return res.blob();
    }).then(blob =>
    {
        let bl = new Blob([blob], {type: "image/png"});

        const link = window.URL.createObjectURL(bl);
        
        downloadFile(link, `${name}.${getFileType(url)}`);

        window.URL.revokeObjectURL(link);
    });
}

/**
 * 下载excel文件流。
 * @param url 下载文件的url
 */
function downloadExcel(file: Blob, disposition: string): void
{
    if(!file)
    {
        throw new Error("download url is avalid!");
    }

    const blob = new Blob([file], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),
        reader = new FileReader();
    // let filename = disposition.match(/(?<=")([^:]+)(?=")/g)[0];
    let filename = disposition;

    reader.readAsDataURL(blob);
    reader.onload = (e: any) =>
    {
        const url = e.target.result,
            linkEl = document.createElement("a");
            
        if("download" in linkEl)
        {
            // const filename = url.substr(url.lastIndexOf("/"));
            linkEl.download = filename || (url.substr(url.lastIndexOf("/")) + ".xls");
            document.body.appendChild(linkEl);
            linkEl.href = url;
            linkEl.click();
            linkEl.remove();
        } else {
            const win = window.open(url, "_self");
            win.opener = null;
        }
    };
}

/**
 * 根据文件路径获取文件后缀
 * @returns string
 */
function getFileType(filePath: string): string
{
    // 获取最后一个.的位置
    let index = filePath.lastIndexOf(".");
    if(index === -1) {
        return "";
    }
    
    return filePath.substr(index + 1);
}
