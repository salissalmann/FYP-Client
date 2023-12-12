import axios from "axios"

const GenerateDOCProviderFile = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/generate-digitalocean-provisioning-file',{ProviderName : ProviderName})
}

const ConfigureDOCProviderFile = (ProviderName:string , token:string) => {
    return axios.post('http://127.0.0.1:3001/configure-digitalocean-provider-file',{ProviderName : ProviderName , token : token})
}

const AddSSHKeyToDOCProviderFile = (ProviderName:string , monitoring: boolean , backups: boolean) => {
    return axios.post('http://127.0.0.1:3001/addsshkey-digitalocean-instance-provisioning-file',{ProviderName : ProviderName , monitoring : monitoring , backups : backups})
}

const AddVolumesToDOCProviderFile = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/volumes-digitalocean-instance-provisioning-file',{ProviderName : ProviderName})
}

const AddOutputsToDOCProviderFile = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/addoutputs-digitalocean-instance-provisioning-file',{ProviderName : ProviderName})
}

const GetDOCData = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/get-terraform-data', {ProviderName : ProviderName})
}


export {
    GenerateDOCProviderFile,
    ConfigureDOCProviderFile,
    AddSSHKeyToDOCProviderFile,
    AddVolumesToDOCProviderFile,
    AddOutputsToDOCProviderFile,
    GetDOCData
}


    

