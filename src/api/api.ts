export const Api = {

	/**
	 * 腾讯云
	 */
	TC_OSS_Secret:      '/api-admin/tencent/oss/secret',           // 腾讯云上传凭证	

	/**
	 * 验证码
	 */
	Get_Login_Code:     '/api-admin/auth/n/getLoginCode',          // 获取登录验证码	
    
	/**
	 * Auth 
	 */
	Auth_Encrypt:       '/api-admin/auth/n/encrypt',               // 加密
	AUTH_Login:         '/api-admin/auth/n/login',                 // 登录
	AUTH_Login_By_Code: '/api-admin/auth/n/loginByCode',           // 登录【验证码】
	AUTH_Login_Out:     '/api-admin/auth/loginOut',                // 退出登录
	Account_Login_Log_List:  '/api-admin/auth/loginLogList', 	   // 登录日志
	Account_Login_Log_MAP:   '/api-admin/auth/loginLogMap', 	   // 登录日志

}

export default Api