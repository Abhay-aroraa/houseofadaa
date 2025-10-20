const storeAuthToken = (value) => {
  localStorage.setItem('authtoken', value)
}

const getAuthToken = () => {
  let data = localStorage.getItem('authtoken')
  return data
}

const setRole = (value) => {
  localStorage.setItem('role', value);
}

const getRole = () => {
  let data = localStorage.getItem("role");
  return data;
}


const removeAuthToken = () => {
  localStorage.removeItem('authtoken')
  localStorage.removeItem('role')
}
export{getRole,setRole,getAuthToken,storeAuthToken,removeAuthToken}