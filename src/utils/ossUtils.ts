import Api from "/@/api/api"
import Request from "/@/api/request"
import COS from "cos-js-sdk-v5"

/**
 * 
 * @param {文件夹} folder 
 * @param {文件} file 
 * @returns 
 */
function upImage(folder: any, file: any, upCallback: any) {

  const fileMaxSize = 2 * 1024 * 1024
  if (file.size > fileMaxSize) {
    upCallback.error("文件大小不能超过2M")
    return;
  } 

  // 授权认证
  let cos = new COS({
    getAuthorization: (_ : any, callback: any) => {
      Request.post(Api.TC_OSS_Secret).then( (data: any) =>{
        callback({
          TmpSecretId: data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials.tmpSecretKey,
          SecurityToken: data.credentials.sessionToken,
          // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
          ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
        });
      }).catch(res =>{
        // 提示失败
        upCallback.error("上传失败")
      })
    }
  });

  // 上传
  cos.putObject({
    Bucket: 'huiyong-online-1251911077',  /* 必须 */
    Region: 'ap-guangzhou',               /* 存储桶所在地域，必须字段 */
    Key: folder,                          /* 文件夹名称 */
    Body: file,                           // 上传文件对象

    // 上传进度
    onProgress: (progressData: any) => {           
      upCallback.progress(progressData.percent)
    },

  }, (err :any, data :any) => {
    if(err){
      // 上传失败
      upCallback.error("上传失败")
    }else{
      // 上传成功
      upCallback.success("上传成功")
    }
  });
}

export default{
  upImage
}