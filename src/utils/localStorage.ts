/**
 * @param {值名} name 
 * @param {值内容} value 
 * 
 */
export function setItem(key : any, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  /**
   * @param {值名} key 
   * @returns {值}
   * 
   */
  export function getItem(key: any) {
    //从获取token
    var value = null
    var localValue = localStorage.getItem(key)
    if(localValue && localValue != undefined && localValue != null){
      value = JSON.parse(localValue);
    }
    return value
  }
  
  /**
   * @param {用户信息} userInfo 
   * 
   */
  export function setUserInfo(userInfo: any) {
    setItem('USER_INFO', userInfo)
  }
  
  
  /**
   * 获取用户信息
   * 
   */
  export function getUserInfo() {
    return getItem('USER_INFO')
  }
  
  /**
   * @param {值名} name 
   * 
   */
  export function logout() {
    localStorage.removeItem("USER_INFO")
  }
  
  export default{
    setItem,
    getItem,
    setUserInfo,
    getUserInfo,
    logout
  }