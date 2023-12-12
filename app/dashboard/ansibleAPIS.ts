import axios from "axios"

const GenerateInventoryFile = (ProviderName:string,instancePublicIP:string , user:string) => {
    return axios.post('http://127.0.0.1:3001/ansible-config' , {ProviderName : ProviderName , instancePublicIP : instancePublicIP , user : user})
}

const GeneratePlaybookFile = () => {
    return axios.post('http://127.0.0.1:3001/generate-ansible-playbook')
}

const RunPlaybook = () => {
    return axios.post('http://127.0.0.1:3001/execute-ansible-playbook')
}

export {
    GenerateInventoryFile,
    GeneratePlaybookFile,
    RunPlaybook
}
    
