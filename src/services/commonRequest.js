import axios from "axios"


const commonRequest = async(method, url, data) =>{
  const config = {
    method,
    url,
    data
  };
  try{
    const response = await axios(config);
    return response;
  }catch(error){
    return error;
  } 
}

export default commonRequest;