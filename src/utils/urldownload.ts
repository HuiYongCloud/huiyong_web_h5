/**
 * 获取url文件内容
 * 
 */
export function getUrlFileContent(url: string, callback: (val: any) => void){
    // 读取内容
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
        if (xhr.status === 200) {
            const reader = new FileReader();
            reader.readAsText(xhr.response);
            reader.onload = () => {
                callback && callback(reader.result);
            };
        }
    };
    xhr.send();
}