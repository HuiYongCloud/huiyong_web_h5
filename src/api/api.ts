const Api_Client = '/api-client'
const Api_UUA 	 = '/api-uua'

export const Api = {

	/**
	 * 搜索
	 */
	ES_Search:     			Api_Client + '/es/n/search',          		// 搜索	

	/**
	 * 验证码
	 */
	Get_Login_Code:     	Api_UUA + '/uua/n/getLoginCode',          	// 获取登录验证码	
	Get_Reg_Code:     		Api_UUA + '/uua/n/getRegisterCode',         // 获取注册验证码	
    
	/**
	 * Auth 
	 */
	Login_Password:       	Api_UUA + '/uua/n/loginByPassword',       	// 登录【密码】
	Login_Email_Code:       Api_UUA + '/uua/n/loginByCode',       		// 登录【验证码】
	UUA_Register:       	Api_UUA + '/uua/n/register',       			// 用户注册
	UUA_LoginOut:       	Api_UUA + '/uua/n/loginOut',       			// 退出登录

	/**
	 * 腾讯Oss
	 */
	TC_OSS_Secret: 			Api_Client + '/tencentOss/n/secret',       	// 用户注册

	/**
	 * 服务条款
	 */		
	Terms_Detail:       	Api_Client + '/baseTerms/n/getDetail',       // 条款详情

	/**
	 * 博客
	 */	
	Blog_Detail:          	Api_Client + '/blog/n/detail',               // 博客详情
	Blog_List_By_Tag_Id:  	Api_Client + '/blog/n/blogListByTagId',      // 博客列表
	Blog_Like_List:  		Api_Client + '/blogLike/n/list',      		 // 博客收藏列表
	Get_Tag_User_Id:   		Api_Client + '/blogTag/n/getTagUserId',   	 // 标签用户id
	Blog_Tag_List:   		Api_Client + '/blogTag/n/tagList',   		 // 标签列表
	Blog_Share:   			Api_Client + '/blog/n/getShareInfo',   	 	 // 分享博客

	/**
	 * 博客收藏
	 */	
	Blog_Like_Add:         	Api_Client + '/blogLike/likeAdd',            // 收藏博客
	Blog_Like_Cancel:      	Api_Client + '/blogLike/likeCancel',         // 取消收藏

	/**
	 * 关注
	 */	
	BLOG_FOCUS_ADD:       	Api_Client + '/blogFocus/addFocus',            // 关注博主
	BLOG_FOCUS_CANCEL:    	Api_Client + '/blogFocus/cancelFocus',         // 取消关注
	BLOG_FOCUS_LIST:      	Api_Client + '/blogFocus/n/focusUserList',     // 关注列表	

	/**
	 * 博主信息
	 */
	BLOG_INFO_DETAIL:     	Api_Client + '/blogInfo/n/detail',             // 博主信息

	/**
	 * 邀请码
	 */
	INVITE_CHECK:       	Api_Client + '/invite/n/checkInvite',         // 邀请码检测可用

	/**
	 * 简历详情
	 */
	Resume_Detail:       	Api_Client + '/resume/n/detail',        	  // 简历	
}
export default Api