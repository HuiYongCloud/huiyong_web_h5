// 匹配邮箱后缀
export function emailSuffix(queryString: string, callback: any){
	let emailLeft="";
	let emailRight="";
	if(queryString.indexOf("@")>0){
		// 邮箱@左边的内容
		emailLeft = queryString.substring(0, queryString.indexOf("@"));
		// 邮箱@右边的内容
		emailRight = queryString.substring(queryString.indexOf("@"));
	}else{
		emailLeft = queryString;
	}

	// 调用 callback 返回建议列表的数据
	if(queryString){
		let emailAllEnd = [
        {value : "@qq.com"},
        {value : "@163.com"},
        {value : "@sina.com"},
        {value : "@sina.cn"},
        {value : "@sohu.com"},
        {value : "@126.com"},
        {value : "@139.com"},
        {value : "@189.cn"},
        {value : "@outlook.com"},
        {value : "@hotmail.com"},
        {value : "@foxmail.com"},
        {value : "@aliyun.com"},
        {value : "@vip.163.com"},
        {value : "@vip.126.com"},
        {value : "@188.com"},
        {value : "@live.cn"},
        {value : "@gmail.com"},
        {value : "@yahoo.com"},
        {value : "@yeah.com"}]

		var results = JSON.parse(JSON.stringify(emailAllEnd))
		// 补充邮箱输入的内容
		results = results.map( (item: any) => {
			item.value = emailLeft + item.value
			return item
		})

		// 过滤符合格式的邮箱地址
		results = results.filter((item: any) => (item.value.indexOf(emailRight) > 0 || !emailRight) && queryString != item.value )
		callback(results);
	}else{
		// 返回空选项
		callback([]);
	}
}