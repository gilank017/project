import axios from "axios"

class Proxy {
    async get (uri, config = {}) {
        return await axios.get(uri, config);
    }  
    async post (uri, body, config = {}) {
        return await axios.post(uri, body, config);
    }
    async put (uri, body, config = {}) {
        return await axios.put(uri, body, config);
    }
    async delete (uri, body, config = {}) {
        return await axios.delete(uri, body, config);
    }
}
export default new Proxy()