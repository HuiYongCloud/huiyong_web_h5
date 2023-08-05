export const Api = {

	/**
	 * 验证码
	 */
	Get_Login_Code:     	'/api-uua/uua/n/getLoginCode',          // 获取登录验证码	
    
	/**
	 * Auth 
	 */
	Login_Password:       	'/api-uua/uua/n/loginByPassword',       // 登录【密码】
	Login_Email_Code:       '/api-uua/uua/n/loginByCode',       	// 登录【验证码】

	/**
	 * 服务条款 
	 */
	Terms_Detail:       	'/api-client/baseTerms/n/getDetail',       // 条款详情

}

export default Api