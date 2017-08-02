

export var validateLogin = (str)=>{
	if (str === "-1") {
		sessionStorage.removeItem('user');
		return false;
	}
	return true;
}