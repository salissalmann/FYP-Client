import axios from "axios"

const GenerateSSHKeys = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/generate-ssh-key',{ProviderName : ProviderName})
}

const GenerateProviderFile = (ProviderName:string , AccessKey:string , SecretKey:string) => {
    return axios.post('http://127.0.0.1:3001/generate-aws-provider-file',{ProviderName : ProviderName , AccessKey : AccessKey , SecretKey : SecretKey})
}

const GenerateMainTerraformScript = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/generate-instance-provisioningfile',{ProviderName : ProviderName})
}

const TerraformPlan = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/terraform-plan',{ProviderName : ProviderName})
}

const TerraformApply = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/terraform-apply',{ProviderName : ProviderName})
}

const GetAWSData = (ProviderName:string) => {
    return axios.post('http://127.0.0.1:3001/users/getAWSFiles', {ProviderName : ProviderName})
}


export {
    GenerateSSHKeys,
    GenerateProviderFile,
    GenerateMainTerraformScript,
    TerraformPlan,
    TerraformApply,
    GetAWSData
}
    