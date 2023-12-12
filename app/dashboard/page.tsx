'use client'
import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

import { GenerateSSHKeys, GenerateProviderFile, GenerateMainTerraformScript, TerraformPlan, TerraformApply, GetAWSData } from './SSHKeys'
import { GenerateDOCProviderFile, ConfigureDOCProviderFile, AddSSHKeyToDOCProviderFile, AddVolumesToDOCProviderFile, AddOutputsToDOCProviderFile, GetDOCData } from './digitaloceanAPIs'
import { GenerateInventoryFile, GeneratePlaybookFile, RunPlaybook } from './ansibleAPIS'

export default function Navbar() {


    const [user, setUser] = React.useState({ username: '', avatar_url: '', name: '' } as any);
    const [resps, setRepos] = React.useState([]);


    const GetGithubUserData = async () => {
        const Response = await fetch("http://127.0.0.1:3001/users/getGithubUserData", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        setUser(Data.data)
    }

    const GetGithubRepositories = async () => {
        const Response = await fetch("http://127.0.0.1:3001/users/getUserRepos", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        const Data = await Response.json()
        setRepos(Data.data)
    }

    useEffect(() => {
        GetGithubUserData()
        GetGithubRepositories()
    }, [])


    const [selectedRadio, setSelectedRadio] = React.useState(0);

    const handleRadioChange = (index: number) => {
        setSelectedRadio(index);
    };

    const [PageIndex, setPageIndex] = React.useState(0);
    const Pages = [
        "Select Repository",
        "Select Cloud",
    ]

    const handlePageChange = (index: number) => {
        setPageIndex(index);
    };

    const [selectedCloud, setSelectedCloud] = React.useState("AWS");

    interface AWSForm {
        AccessKey: string;
        SecretKey: string;
        Region: string;
        [key: string]: string; // Add index signature
    }

    const [AWSForm, SetAWSForm] = useState<AWSForm>({
        AccessKey: "",
        SecretKey: "",
        Region: "",
    } as AWSForm);

    interface DigitalOceanFormInt {
        token: string,
        monitoring: boolean,
        backups: boolean,
        [key: string]: string | boolean;
    }

    const [DigitalOceanForm, SetDigitalOceanForm] = useState<DigitalOceanFormInt>({
        token: "",
        monitoring: false,
        backups: false
    } as DigitalOceanFormInt)



    //add interface
    const HandleInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        if (selectedCloud === "AWS") {
            AWSForm[name] = value;
            SetAWSForm({ ...AWSForm })
        }
        else if (selectedCloud === "DigitalOcean") {
            DigitalOceanForm[name] = value;
            SetDigitalOceanForm({ ...DigitalOceanForm })
        }
    };



    const AWSSubmit = () => {
        if (AWSForm.AccessKey === "" || AWSForm.SecretKey === "") {
            notification.open(
                {
                    message: "Error",
                    description: "Please enter your AWS credentials",
                    type: "error"
                }
            )
        }
        else {
            //Next Page
            handlePageChange(PageIndex + 1)
        }

    }

    const DOCSubmit = () => {
        if (DigitalOceanForm.token === "") {
            notification.open(
                {
                    message: "Error",
                    description: "Please enter your Digital Ocean token",
                    type: "error"
                }
            )
        }
        else {
            //Next Page
            handlePageChange(PageIndex + 1)
        }

    }


    interface AWSStepsState {
        [key: string]: {
            timetaken: string;
            isLoading: boolean;
            isSuccess: boolean;
            isError: boolean;
            description?: string;
        };
    }

    const [AWSSteps, setAWSSteps] = useState<AWSStepsState>({
        "Infrastructure Choosen": {
            timetaken: "1000.00s",
            isLoading: false,
            isSuccess: true,
            isError: false,
        },
        "Selecting Repository for Deployment": {
            timetaken: "1000.00s",
            isLoading: false,
            isSuccess: true,
            isError: false,
        },
        "Generating SSH Keys": {
            timetaken: "0.00s",
            isLoading: true,
            isSuccess: false,
            isError: false,
        },
        "Configuring the Provider File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "EC2 Configurations , [VPC Creation and Security Groups]": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Terraform Apply": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
            description: "This step will take some time to complete"
        },
        "Generating Ansible Inventory File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Generating Ansible Playbook File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Running Ansible Playbook": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
            description: "This step will take some time to complete"
        }
    });

    const [DigitalOceanSteps, setDigitalOceanSteps] = useState<AWSStepsState>({
        "Infrastructure Choosen": {
            timetaken: "1000.00s",
            isLoading: false,
            isSuccess: true,
            isError: false,
        },
        "Selecting Repository for Deployment": {
            timetaken: "1000.00s",
            isLoading: false,
            isSuccess: true,
            isError: false,
        },
        "Generating SSH Keys": {
            timetaken: "0.00s",
            isLoading: true,
            isSuccess: false,
            isError: false,
        },
        "Generating the Provider File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Configuring the Provider File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Add SSH Key to Provider File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Add Volumes to Provider File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Add Output to Provider File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Terraform Apply": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
            description: "This step will take some time to complete"
        },
        "Generating Ansible Inventory File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Generating Ansible Playbook File": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
        },
        "Running Ansible Playbook": {
            timetaken: "0.00s",
            isLoading: false,
            isSuccess: false,
            isError: false,
            description: "This step will take some time to complete"
        }
    });



    const updateStepStatus = (
        step: string,
        isLoading: boolean,
        isSuccess: boolean,
        isError: boolean,
        timeTaken: number
    ): void => {
        if (selectedCloud === "AWS") {
            AWSSteps[step] = {
                timetaken: `${timeTaken.toFixed(2)}s`,
                isLoading,
                isSuccess,
                isError,
            };
            setAWSSteps({ ...AWSSteps });
        }
        else if (selectedCloud === "DigitalOcean") {
            DigitalOceanSteps[step] = {
                timetaken: `${timeTaken.toFixed(2)}s`,
                isLoading,
                isSuccess,
                isError,
            };
            setDigitalOceanSteps({ ...DigitalOceanSteps });
        }
    };

    const performStep = async (
        step: string,
        action: () => Promise<{ data: { success: boolean, description?: string } }>
    ): Promise<boolean> => {
        performance.mark('start');
        try {
            const res = await action();
            const { success } = res.data;
            const isLoading = false;
            const isSuccess = success;
            const isError = !success;
            performance.mark('end');
            performance.measure('Execution Time', 'start', 'end');
            if (selectedCloud === "AWS" && step === 'Terraform Apply') {
                AWSSteps[step].description = res.data.description;
            }
            else if (selectedCloud === "DigitalOcean" && step === 'Terraform Apply') {
                DigitalOceanSteps[step].description = res.data.description;
            }

            if (selectedCloud === "AWS" && step === 'Running Ansible Playbook') {

                AWSSteps[step].description = res.data.description;
                setAWSSteps({ ...AWSSteps });
            }

            updateStepStatus(step, isLoading, isSuccess, isError, performance.getEntriesByName('Execution Time')[0].duration);
            return isSuccess;
        } catch (err) {
            const isLoading = false;
            const isSuccess = false;
            const isError = true;
            performance.mark('end');
            performance.measure('Execution Time', 'start', 'end');
            updateStepStatus(step, isLoading, isSuccess, isError, performance.getEntriesByName('Execution Time')[0].duration);
            return false;
        }
    };

    const ManageSSHKeys = async (): Promise<boolean> => {
        const step = 'Generating SSH Keys';
        performance.mark('start');
        const isSuccess = await performStep(step, () => GenerateSSHKeys(selectedCloud));
        if (isSuccess) {
            if (selectedCloud === "AWS") {
                AWSSteps['Configuring the Provider File'].isLoading = true;
            }
            else if (selectedCloud === "DigitalOcean") {
                DigitalOceanSteps['Generating the Provider File'].isLoading = true;
            }
            return true
        }
        return false
    };

    const ManageProviderFile = async (): Promise<boolean> => {
        const step = 'Configuring the Provider File';
        performance.mark('start');
        const isSuccess = await performStep(
            step,
            () => GenerateProviderFile(selectedCloud, AWSForm.AccessKey, AWSForm.SecretKey)
        );
        if (isSuccess) {
            AWSSteps['EC2 Configurations , [VPC Creation and Security Groups]'].isLoading = true;
            return true
        }
        return false
    };

    const ManageVPCandInstance = async (): Promise<boolean> => {
        const step = 'EC2 Configurations , [VPC Creation and Security Groups]';
        performance.mark('start');
        const isSuccess = await performStep(step, () => GenerateMainTerraformScript(selectedCloud));
        if (isSuccess) {
            AWSSteps['Terraform Apply'].isLoading = true;
            return true
        }
        return false
    };

    interface AWSUserData {
        sshKey: string;
        providerFile: string;
        instanceFile: string;
        instancePublicIP: string;
        instancePrivateIP: string;
        instanceName: string;
        instanceVPC: string;
        instanceSecurityGroup: string;
    }

    const [AWSUserData, setAWSUserData] = useState({
        sshKey: "",
        providerFile: "",
        instanceFile: "",
        instancePublicIP: "",
        instancePrivateIP: "",
        instanceName: "",
        instanceVPC: "",
        instanceSecurityGroup: "",
    } as AWSUserData)


    interface DOCUserData {
        sshKey: string;
        providerFile: string;
        instancePublicIP: string;
        instancePrivateIP: string;
        instanceIpv6: string;
    }

    const [DOCUserData, setDOCUserData] = useState({
        sshKey: "",
        providerFile: "",
        instancePublicIP: "",
        instancePrivateIP: "",
        instanceIpv6: "",
    } as DOCUserData)


    const ManageTerraform = async (): Promise<boolean> => {
        const stepApply = 'Terraform Apply';
        performance.mark('start4');
        TerraformPlan(selectedCloud).then(async (res) => {
            if (res) {
                AWSSteps[stepApply].description = res.data.description;
                setAWSSteps({ ...AWSSteps });
                const Response = await TerraformApply(selectedCloud)
                if (Response.data.success) {
                    performance.mark('end4');
                    performance.measure('Execution Time4', 'start4', 'end4');
                    AWSSteps[stepApply].timetaken = `${performance.getEntriesByName('Execution Time4')[0].duration.toFixed(1)}s`
                    AWSSteps[stepApply].isLoading = false;
                    AWSSteps[stepApply].isSuccess = true;
                    AWSSteps[stepApply].isError = false;
                    updateStepStatus(stepApply, false, true, false, performance.getEntriesByName('Execution Time4')[0].duration);
                    AWSSteps[stepApply].description = Response.data.description;
                    setAWSSteps({ ...AWSSteps });
                    const AWSData = await GetAWSData(selectedCloud)
                    setAWSUserData({
                        sshKey: AWSData.data.sshKey,
                        providerFile: AWSData.data.providerFile,
                        instanceFile: AWSData.data.instanceFile,
                        instancePublicIP: AWSData.data.instancePublicIP,
                        instancePrivateIP: AWSData.data.instancePrivateIP,
                        instanceName: AWSData.data.instanceName,
                        instanceVPC: AWSData.data.instanceVPC,
                        instanceSecurityGroup: AWSData.data.instanceSecurityGroup,
                    })
                    if (AWSData.data.instancePublicIP !== "") {
                        GenerateAnsibleInventoryFile(AWSData.data.instancePublicIP).then((res) => {
                            if (res) {
                                GenerateAnsiblePlaybookFile().then((res) => {
                                    if (res) {
                                        RunAnsiblePlaybook()
                                    }
                                })
                            }
                        })
                    }
                    return true
                }
                else {
                    performance.mark('end4');
                    performance.measure('Execution Time4', 'start4', 'end4');
                    AWSSteps[stepApply].timetaken = `${performance.getEntriesByName('Execution Time4')[0].duration.toFixed(1)}s`
                    AWSSteps[stepApply].isLoading = false;
                    AWSSteps[stepApply].isSuccess = false;
                    AWSSteps[stepApply].isError = true;
                    updateStepStatus(stepApply, false, false, true, performance.getEntriesByName('Execution Time4')[0].duration);
                    AWSSteps[stepApply].description = Response.data.description;
                    setAWSSteps({ ...AWSSteps });
                    return false
                }
            }
        });
        return false
    };

    const ManageDOCTerraform = async (): Promise<boolean> => {
        const stepApply = 'Terraform Apply';
        performance.mark('start4');
        TerraformPlan(selectedCloud).then(async (res) => {
            if (res) {
                DigitalOceanSteps[stepApply].description = res.data.description;
                setDigitalOceanSteps({ ...DigitalOceanSteps });
                const Response = await TerraformApply(selectedCloud)
                if (Response.data.success) {
                    performance.mark('end4');
                    performance.measure('Execution Time4', 'start4', 'end4');
                    DigitalOceanSteps[stepApply].timetaken = `${performance.getEntriesByName('Execution Time4')[0].duration.toFixed(1)}s`
                    DigitalOceanSteps[stepApply].isLoading = false;
                    DigitalOceanSteps[stepApply].isSuccess = true;
                    DigitalOceanSteps[stepApply].isError = false;
                    updateStepStatus(stepApply, false, true, false, performance.getEntriesByName('Execution Time4')[0].duration);
                    DigitalOceanSteps[stepApply].description = Response.data.description;
                    setDigitalOceanSteps({ ...DigitalOceanSteps });
                    const DOCData = await GetDOCData(selectedCloud)
                    setDOCUserData({
                        sshKey: DOCData.data.sshKey,
                        providerFile: DOCData.data.providerFile,
                        instancePublicIP: DOCData.data.instancePublicIP,
                        instancePrivateIP: DOCData.data.instancePrivateIP,
                        instanceIpv6: DOCData.data.instanceIpv6,
                    })
                    if (DOCData.data.instancePublicIP !== "") {
                        GenerateAnsibleInventoryFile(DOCData.data.instancePublicIP).then((res) => {
                            if (res) {
                                GenerateAnsiblePlaybookFile().then((res) => {
                                    if (res) {
                                        RunDOCAnisiblePlaybook()
                                    }
                                })
                            }
                        })
                    }
                    return true
                }
                else {
                    performance.mark('end4');
                    performance.measure('Execution Time4', 'start4', 'end4');
                    DigitalOceanSteps[stepApply].timetaken = `${performance.getEntriesByName('Execution Time4')[0].duration.toFixed(1)}s`
                    DigitalOceanSteps[stepApply].isLoading = false;
                    DigitalOceanSteps[stepApply].isSuccess = false;
                    DigitalOceanSteps[stepApply].isError = true;
                    updateStepStatus(stepApply, false, false, true, performance.getEntriesByName('Execution Time4')[0].duration);
                    DigitalOceanSteps[stepApply].description = Response.data.description;
                    setDigitalOceanSteps({ ...DigitalOceanSteps });
                    return false
                }
            }
        });
        return false
    }

    const GenerateAnsibleInventoryFile = async (publicIP: string): Promise<boolean> => {
        const step = 'Generating Ansible Inventory File';
        performance.mark('start6');
        let user = "root"
        if (selectedCloud === "AWS") {
            user = "ubuntu"
        }
        if (selectedCloud === "DigitalOcean") {
            user = "root"
        }
        const isSuccess = await performStep(step, () => GenerateInventoryFile(selectedCloud, publicIP, user));
        if (isSuccess && selectedCloud === "AWS") {
            AWSSteps['Generating Ansible Playbook File'].isLoading = true;
            return true
        }
        else if (isSuccess && selectedCloud === "DigitalOcean") {
            DigitalOceanSteps['Generating Ansible Playbook File'].isLoading = true;
            return true
        }
        return false
    }

    const GenerateAnsiblePlaybookFile = async (): Promise<boolean> => {
        const step = 'Generating Ansible Playbook File';
        performance.mark('start7');
        const isSuccess = await performStep(step, () => GeneratePlaybookFile());
        if (isSuccess && selectedCloud === "AWS") {
            AWSSteps['Running Ansible Playbook'].isLoading = true;
            return true
        }
        else if (isSuccess && selectedCloud === "DigitalOcean") {
            DigitalOceanSteps['Running Ansible Playbook'].isLoading = true;
            return true
        }
        return false
    }

    const RunAnsiblePlaybook = async (): Promise<boolean> => {
        const step = 'Running Ansible Playbook';
        performance.mark('start8');
        const response = await RunPlaybook();      
        console.log(response)  
        if(response.data.success){
            performance.mark('end8');
            performance.measure('Execution Time8', 'start8', 'end8');
            AWSSteps[step].timetaken = `${performance.getEntriesByName('Execution Time8')[0].duration.toFixed(1)}s`
            AWSSteps[step].isLoading = false;
            AWSSteps[step].isSuccess = true;
            AWSSteps[step].isError = false;
            updateStepStatus(step, false, true, false, performance.getEntriesByName('Execution Time8')[0].duration);
            AWSSteps[step].description = response.data.description;
            setAWSSteps({ ...AWSSteps });
            return true
        }
        else {
            performance.mark('end8');
            performance.measure('Execution Time8', 'start8', 'end8');
            AWSSteps[step].timetaken = `${performance.getEntriesByName('Execution Time8')[0].duration.toFixed(1)}s`
            AWSSteps[step].isLoading = false;
            AWSSteps[step].isSuccess = false;
            AWSSteps[step].isError = true;
            updateStepStatus(step, false, false, true, performance.getEntriesByName('Execution Time8')[0].duration);
            AWSSteps[step].description = response.data.description;
            setAWSSteps({ ...AWSSteps });
            return false
        }            
    }

    const RunDOCAnisiblePlaybook = async (): Promise<boolean> => {
        const step = 'Running Ansible Playbook';
        performance.mark('start8');
        const response = await RunPlaybook();      
        console.log(response)
        if(response.data.success){
            performance.mark('end8');
            performance.measure('Execution Time8', 'start8', 'end8');
            DigitalOceanSteps[step].timetaken = `${performance.getEntriesByName('Execution Time8')[0].duration.toFixed(1)}s`
            DigitalOceanSteps[step].isLoading = false;
            DigitalOceanSteps[step].isSuccess = true;
            DigitalOceanSteps[step].isError = false;
            updateStepStatus(step, false, true, false, performance.getEntriesByName('Execution Time8')[0].duration);
            DigitalOceanSteps[step].description = response.data.description;
            setDigitalOceanSteps({ ...DigitalOceanSteps });
            return true
        }
        else {
            performance.mark('end8');
            performance.measure('Execution Time8', 'start8', 'end8');
            DigitalOceanSteps[step].timetaken = `${performance.getEntriesByName('Execution Time8')[0].duration.toFixed(1)}s`
            DigitalOceanSteps[step].isLoading = false;
            DigitalOceanSteps[step].isSuccess = false;
            DigitalOceanSteps[step].isError = true;
            updateStepStatus(step, false, false, true, performance.getEntriesByName('Execution Time8')[0].duration);
            DigitalOceanSteps[step].description = response.data.description;
            setDigitalOceanSteps({ ...DigitalOceanSteps });
            return false
        }
    }





    const GenerateDigitalOceanProviderFile = async (): Promise<boolean> => {
        const step = 'Generating the Provider File';
        performance.mark('start');
        const isSuccess = await performStep(step, () => GenerateDOCProviderFile(selectedCloud));
        if (isSuccess) {
            DigitalOceanSteps['Configuring the Provider File'].isLoading = true;
            return true
        }
        return false
    }

    const ConfigureDigitalOceanProviderFile = async (): Promise<boolean> => {
        const step = 'Configuring the Provider File';
        performance.mark('start');
        const isSuccess = await performStep(step, () => ConfigureDOCProviderFile(selectedCloud, DigitalOceanForm.token));
        if (isSuccess) {
            DigitalOceanSteps['Add SSH Key to Provider File'].isLoading = true;
            return true
        }
        return false
    }

    const ManageDigitalOceanSSHKeys = async (): Promise<boolean> => {
        const step = 'Add SSH Key to Provider File';
        performance.mark('start');
        const isSuccess = await performStep(step, () => AddSSHKeyToDOCProviderFile(selectedCloud, DigitalOceanForm.monitoring, DigitalOceanForm.backups));
        if (isSuccess) {
            DigitalOceanSteps['Add Volumes to Provider File'].isLoading = true;
            return true
        }
        return false
    }

    const AddVolumeDigitalOceanProviderFile = async (): Promise<boolean> => {
        const step = 'Add Volumes to Provider File';
        performance.mark('start');
        const isSuccess = await performStep(step, () => AddVolumesToDOCProviderFile(selectedCloud));
        if (isSuccess) {
            DigitalOceanSteps['Add Output to Provider File'].isLoading = true;
            return true
        }
        return false
    }

    const AddOutputDigitalOceanProviderFile = async (): Promise<boolean> => {
        const step = 'Add Output to Provider File';
        performance.mark('start');
        const isSuccess = await performStep(step, () => AddOutputsToDOCProviderFile(selectedCloud));
        if (isSuccess) {
            DigitalOceanSteps['Terraform Apply'].isLoading = true;
            return true
        }
        return false
    }





    const RunTimeExecution = async (): Promise<void> => {
        if (PageIndex === 2) {
            if (selectedCloud === "AWS" && AWSSteps['Generating SSH Keys'].isLoading) {
                ManageSSHKeys().then((res) => {
                    if (res) {
                        ManageProviderFile().then((res) => {
                            if (res) {
                                ManageVPCandInstance().then((res) => {
                                    if (res) {
                                        ManageTerraform()
                                    }
                                })
                            }
                        });
                    }
                })
            }
            if (selectedCloud === "DigitalOcean" && DigitalOceanSteps['Generating SSH Keys'].isLoading) {
                ManageSSHKeys().then((res) => {
                    if (res) {
                        GenerateDigitalOceanProviderFile().then((res) => {
                            if (res) {
                                ConfigureDigitalOceanProviderFile().then((res) => {
                                    if (res) {
                                        ManageDigitalOceanSSHKeys().then((res) => {
                                            if (res) {
                                                AddVolumeDigitalOceanProviderFile().then((res) => {
                                                    if (res) {
                                                        AddOutputDigitalOceanProviderFile().then((res) => {
                                                            if (res) {
                                                                ManageDOCTerraform()
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                })

            }
        }
    }

    useEffect(() => {
        RunTimeExecution();
    }, [PageIndex, AWSSteps, setAWSSteps]);

    const DownloadSSHKey = () => {
        const element = document.createElement("a");
        let file;
        if (selectedCloud === "AWS") {
            file = new Blob([AWSUserData.sshKey], { type: 'text/plain' })
        }
        else if (selectedCloud === "DigitalOcean") {
            file = new Blob([DOCUserData.sshKey], { type: 'text/plain' })
        }
        if (file) {
            element.href = URL.createObjectURL(file);
            element.download = "cloudFusion.pem";
            document.body.appendChild(element);
            element.click();
        }
    }

    const DownloadAWSProviderFile = () => {
        const element = document.createElement("a");
        let file;
        if (selectedCloud === "AWS") {
            file = new Blob([AWSUserData.providerFile], { type: 'text/plain' })
        }
        else if (selectedCloud === "DigitalOcean") {
            file = new Blob([DOCUserData.providerFile], { type: 'text/plain' })
        }
        if (file) {
            element.href = URL.createObjectURL(file);
            element.download = "provider.tf";
            document.body.appendChild(element);
            element.click();
        }
    }

    const DownloadAWSInstanceFile = () => {
        const element = document.createElement("a");
        const file = new Blob([AWSUserData.instanceFile], { type: 'text/plain' })
        element.href = URL.createObjectURL(file);
        element.download = "instance.tf";
        document.body.appendChild(element);
        element.click();
    }




    return (

        <div className='w-full bg-black z-10 shadow-inner'>
            <Navigation
                avatar={user?.avatar_url}
                name={user?.name}
            />
            {PageIndex === 0 && (
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-20 mx-auto">
                        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Select your Repository</h1>
                            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                                Select the repository you want to deploy to CloudFusion
                            </p>
                        </div>
                        <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                            {resps && resps.map((repos, index) => {
                                const inputId = `DeliveryMethod${index}`;
                                return (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            name="DeliveryMethod"
                                            id={inputId}
                                            className="peer hidden"
                                            onChange={() => handleRadioChange(index)}
                                        />
                                        <label
                                            htmlFor={inputId}
                                            className={`block cursor-pointer rounded-lg border border-white b-1 bg-black p-4 text-sm font-medium shadow-sm hover:border-gray-200 ${selectedRadio === index
                                                ? 'border-rose-500 bg-rose-500'
                                                : ''
                                                }`}
                                        >
                                            <p className="text-white">{repos.name}</p>
                                            <p className="mt-1 text-gray-400 flex flex-row justify-between">
                                                <span>{repos.default_branch}</span>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium capitalize ${repos.private ? (
                                                        'bg-green-100 text-green-800'
                                                    ) : (
                                                        'bg-rose-500 text-white'
                                                    )}`}
                                                >
                                                    {repos.private ? (
                                                        <span>Private</span>
                                                    ) : (
                                                        <span>Public</span>
                                                    )}
                                                </span>

                                            </p>
                                        </label>
                                    </div>
                                );
                            })}
                        </fieldset>
                    </div>
                </section>
            )}

            {PageIndex === 1 && (
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-auto">
                        <div className="flex flex-wrap w-full mb-2 flex-col items-center text-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Select your Infrastructure</h1>
                            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                                Select the cloud you want to deploy your application
                            </p>
                        </div>
                    </div>
                    <div className='w-4/5 
                                        mx-auto
                                        flex flex-row
                                        gap-4
                                        justify-between
                                        items-center
                        '>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className={`border 0 p-4 px-4  rounded-lg
                            ${selectedCloud === "AWS" ? (
                                    'border-rose-500 bg-black border-2'
                                ) : (
                                    'border-gray-20 bg-orange-500'
                                )}
                            `} onClick={
                                    () => setSelectedCloud("AWS")
                                }>
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/aws-svgrepo-com.svg"
                                        width={45}
                                        height={45}
                                        alt="aws-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">AWS</h2>
                                <p className="leading-relaxed text-white text-base">Amazon Web Services</p>
                                <button className={`flex items-center mt-3  border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm
                                ${selectedCloud === "AWS" ? (
                                        'text-white bg-black'
                                    ) : (
                                        'text-orange-500 bg-white'
                                    )}
                                `}>
                                    {selectedCloud === "AWS" ?
                                        <span>Selected</span>
                                        :
                                        <span>Select</span>
                                    }
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-4 h-4 ml-2 ${selectedCloud === "AWS" ? ('hidden') : ('text-orange-500')}`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className={`border p-4 px-4  rounded-lg
                             ${selectedCloud === "DigitalOcean" ? (
                                    'border-rose-500 bg-black border-2'
                                ) : (
                                    'border-gray-20 bg-blue-500'
                                )}
                            `} onClick={
                                    () => { setSelectedCloud("DigitalOcean") }
                                }>
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/digitalocean.svg"
                                        width={50}
                                        height={50}
                                        alt="doc-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">DOC</h2>
                                <p className="leading-relaxed text-white text-base">Digital Ocean</p>
                                <button className={`flex items-center mt-3 border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm
                                ${selectedCloud === "DigitalOcean" ? (
                                        'text-white bg-black'
                                    ) : (
                                        'text-blue-500 bg-white'
                                    )}
                                `}>
                                    {selectedCloud === "DigitalOcean" ?
                                        <span>Selected</span>
                                        :
                                        <span>Select</span>
                                    }
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-4 h-4 ml-2 ${selectedCloud === "DigitalOcean" ? ('hidden') : ('text-blue-500')}`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-4 px-4 bg-blue-800 rounded-lg">
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/azure.svg"
                                        width={50}
                                        height={50}
                                        alt="gcp-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">Azure</h2>
                                <p className="leading-relaxed text-white text-base">Microsoft Azure</p>
                                <button className="flex items-center mt-3 text-blue-800 bg-white border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm">
                                    Select
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-4 px-4 bg-red-400 rounded-lg">
                                <div className="inline-flex items-center justify-center rounded-full text-white flex-shrink-0 w-14 h-14">
                                    <img src="/images/openstack.svg"
                                        width={50}
                                        height={50}
                                        alt="gcp-logo"
                                    />
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">FusionCloud</h2>
                                <p className="leading-relaxed text-white text-base">Private Cloud</p>
                                <button className="flex items-center mt-3 text-red-500 bg-white border-0 py-1 px-2 focus:outline-none hover:bg-rose-600 rounded text-sm">
                                    Select
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                    {selectedCloud === "AWS" && (
                        <section className="py-16 font-poppins ">
                            <div
                                className="max-w-4xl px-4 py-4 mx-auto border shadow-sm dark:border-gray-900  lg:py-4 md:px-6">
                                <div className="mb-10 ">
                                    <h2 className="pb-2 mb-2 text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                                        AWS Credentials
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Enter your AWS credentials to connect your AWS account with CloudFusion
                                    </p>
                                    <div className="mb-6">
                                        <label htmlFor="" className="block mb-2 text-sm font-medium dark:text-gray-400">AWS Access Keys</label>
                                        <input type="text"
                                            className="block w-full px-4 py-3 mb-2 text-sm bg-gray-100 border rounded dark:placeholder-gray-400 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                                            placeholder="Access Key" required
                                            name="AccessKey"
                                            onChange={HandleInput}
                                            autoComplete='on'
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="" className="block mb-2 text-sm font-medium dark:text-gray-400">AWS Secret Keys</label>
                                        <input type="text"
                                            className="block w-full px-4 py-3 mb-2 text-sm bg-gray-100 border rounded dark:placeholder-gray-400 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                                            placeholder="Secret Key" required
                                            name="SecretKey"
                                            onChange={HandleInput}
                                            autoComplete='on'
                                        />
                                    </div>

                                    <div className="mb-6 ">
                                        <label htmlFor="" className="block mb-2 text-sm font-medium dark:text-gray-400">Region</label>
                                        <div className="relative">
                                            <select name="select-name"
                                                className="block w-full px-4 py-3 mb-2 text-sm text-gray-500 placeholder-gray-400 bg-gray-100 border rounded appearance-none dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800 ">
                                                <option value="1">Select Region</option>
                                                <option value="us-east-1">us-east-1</option>
                                                <option value="us-east-2">us-east-2</option>
                                                <option value="us-west-1">us-west-1</option>
                                                <option value="us-west-2">us-west-2</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                    className="bi bi-chevron-down" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-6 py-2 text-base text-white bg-rose-500 rounded hover:bg-rose-300" onClick={AWSSubmit}>Confirm</button>
                                </div>

                            </div>
                        </section>
                    )}

                    {selectedCloud === "DigitalOcean" && (
                        <section className="py-16 font-poppins ">
                            <div
                                className="max-w-4xl px-4 py-4 mx-auto border shadow-sm dark:border-gray-900  lg:py-4 md:px-6">
                                <div className="mb-10 ">
                                    <h2 className="pb-2 mb-2 text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                                        Digital Ocean Credentials
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Enter your Digital Ocean credentials to connect your Digital Ocean account with CloudFusion
                                    </p>
                                    <div className="mb-6">
                                        <label htmlFor="" className="block mb-2 text-sm font-medium dark:text-gray-400">Digital Ocean Token</label>
                                        <input type="text"
                                            className="block w-full px-4 py-3 mb-2 text-sm bg-gray-100 border rounded dark:placeholder-gray-400 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                                            placeholder="Token" required
                                            name="token"
                                            onChange={HandleInput}
                                            autoComplete='on'
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="" className="block text-sm font-medium dark:text-gray-400">Monitoring</label>
                                        <input type="checkbox"
                                            className="block w-full px-4 py-3 mb-2 text-sm bg-gray-100 border rounded dark:placeholder-gray-400 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                                            placeholder="Monitoring" required
                                            name="monitoring"
                                            onChange={HandleInput}
                                            autoComplete='on'
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="" className="block text-sm font-medium dark:text-gray-400">Backups</label>
                                        <input type="checkbox"
                                            className="block w-full px-4 py-3 mb-2 text-sm bg-gray-100 border rounded dark:placeholder-gray-400 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                                            placeholder="Backups" required
                                            name="backups"
                                            onChange={HandleInput}
                                            autoComplete='on'
                                        />
                                    </div>
                                    <button className="px-6 py-2 text-base text-white bg-rose-500 rounded hover:bg-rose-300" onClick={DOCSubmit}>Confirm</button>
                                </div>
                            </div>
                        </section>
                    )}
                </section>
            )}

            {PageIndex === 2 && (
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-auto">
                        <div className="flex flex-wrap w-full mb-2 flex-col items-center text-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">WorkFlow
                            </h1>
                        </div>
                    </div>
                    {selectedCloud === "AWS" && Object.keys(AWSSteps).map((step, index) => {
                        return (
                            <Step
                                key={index}
                                title={step}
                                description={AWSSteps[step]?.description ?? ''}
                                isLoading={AWSSteps[step]?.isLoading}
                                isSuccess={AWSSteps[step]?.isSuccess}
                                isError={AWSSteps[step]?.isError}
                                time={AWSSteps[step]?.timetaken}
                            />
                        );
                    })}

                    {selectedCloud === "AWS" && AWSSteps['Terraform Apply'].isSuccess && (
                        <>
                            <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            justify-between
                            border
                            border-white
                            p-4`}
                            >
                                <div className='flex flex-row gap-4 items-center'>Public IP : {AWSUserData.instancePublicIP}</div>
                                <div className='flex flex-row gap-4 items-center'>Private IP : {AWSUserData.instancePrivateIP}</div>
                                <div className='flex flex-row gap-4 items-center'>Instance Name : {AWSUserData.instanceName}</div>
                                <div className='flex flex-row gap-4 items-center'>VPC : {AWSUserData.instanceVPC}</div>
                                <div className='flex flex-row gap-4 items-center'>Security Group : {AWSUserData.instanceSecurityGroup}</div>
                            </div>
                            <div className='flex flex-col'>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Download SSH Key</div>
                                    <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                                        onClick={DownloadSSHKey}
                                    >Download</button>
                                </div>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Download Provider File</div>
                                    <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                                        onClick={DownloadAWSProviderFile}>Download</button>
                                </div>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Download Instance File</div>
                                    <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                                        onClick={DownloadAWSInstanceFile}>Download</button>
                                </div>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Connect your instance: </div>
                                    <div className='
                            flex
                            flex-row
                            gap-4
                            items-center
                            justify-between
                            '>ssh -i "cloudFusion.pem" ubuntu@${AWSUserData.instancePublicIP}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                            onClick={() => {
                                                navigator.clipboard.writeText(`chmod 600 cloudFusion.pem && ssh -i "cloudFusion.pem" ubuntu@${AWSUserData.instancePublicIP}`)
                                                notification.open(
                                                    {
                                                        message: "Copied",
                                                        description: "Copied to clipboard",
                                                        type: "success"
                                                    }
                                                )
                                            }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                    </div>
                                </div>
                                {AWSSteps['Running Ansible Playbook'].isSuccess && 
                                <div className={`w-4/5
                                        mt-5
                                        text-sm
                                        text-white 
                                        mx-auto
                                        flex flex-row
                                        font-vt323
                                        gap-4
                                        items-center
                                        justify-between
                                        border
                                        border-white
                                        p-4`}
                                            >
                                                <div>Access your Server: </div>
                                                <div className='
                                        flex
                                        flex-row
                                        gap-4
                                        items-center
                                        justify-between
                                        '>
                                            {`http://${AWSUserData.instancePublicIP}`}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" 
                                            onClick={() => {
                                                //open in new tab
                                                window.open(`http://${AWSUserData.instancePublicIP}`, "_blank")
                                            }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                            </svg>
                                        </div>
                                    </div>
                                }

                                
                            </div>
                        </>
                    )}

                    {selectedCloud === "DigitalOcean" && Object.keys(DigitalOceanSteps).map((step, index) => {
                        return (
                            <Step
                                key={index}
                                title={step}
                                description={DigitalOceanSteps[step]?.description ?? ''}
                                isLoading={DigitalOceanSteps[step]?.isLoading}
                                isSuccess={DigitalOceanSteps[step]?.isSuccess}
                                isError={DigitalOceanSteps[step]?.isError}
                                time={DigitalOceanSteps[step]?.timetaken}
                            />
                        );
                    })}
                    {selectedCloud === "DigitalOcean" && DigitalOceanSteps['Terraform Apply'].isSuccess && (
                        <>
                            <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            justify-between
                            border
                            border-white
                            p-4`}
                            >
                                <div className='flex flex-row gap-4 items-center'>Public IP : {DOCUserData.instancePublicIP}</div>
                                <div className='flex flex-row gap-4 items-center'>Private IP : {DOCUserData.instancePrivateIP}</div>
                                <div className='flex flex-row gap-4 items-center'>Private IPv6 : {DOCUserData.instanceIpv6}</div>
                            </div>
                            <div className='flex flex-col'>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Download SSH Key</div>
                                    <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                                        onClick={DownloadSSHKey}
                                    >Download</button>
                                </div>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Download Provider File</div>
                                    <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                                        onClick={DownloadAWSProviderFile}>Download</button>
                                </div>
                                <div className={`w-4/5
                            mt-5
                            text-sm
                            text-white 
                            mx-auto
                            flex flex-row
                            font-vt323
                            gap-4
                            items-center
                            justify-between
                            border
                            border-white
                            p-4`}
                                >
                                    <div>Connect your instance: </div>
                                    <div className='
                            flex
                            flex-row
                            gap-4
                            items-center
                            justify-between
                            '>ssh -i "cloudFusion.pem" root@${DOCUserData.instancePublicIP}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                            onClick={() => {
                                                navigator.clipboard.writeText(`chmod 600 cloudFusion.pem && ssh -i "cloudFusion.pem" root@${DOCUserData.instancePublicIP}`)
                                                notification.open(
                                                    {
                                                        message: "Copied",
                                                        description: "Copied to clipboard",
                                                        type: "success"
                                                    }
                                                )
                                            }
                                            }
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                    </div>
                                </div>
                                {DigitalOceanSteps['Running Ansible Playbook'].isSuccess &&
                                    <div className={`w-4/5
                                        mt-5
                                        text-sm
                                        text-white 
                                        mx-auto
                                        flex flex-row
                                        font-vt323
                                        gap-4
                                        items-center
                                        justify-between
                                        border
                                        border-white
                                        p-4`}
                                    >
                                        <div>Access your Server: </div>
                                        <div className='
                                        flex
                                        flex-row
                                        gap-4
                                        items-center
                                        justify-between
                                        '>
                                            {`http://${DOCUserData.instancePublicIP}`}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                                onClick={() => {
                                                    //open in new tab
                                                    window.open(`http://${DOCUserData.instancePublicIP}`, "_blank")
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>

                        </>
                    )}
                </section>






            )}


            <div className='w-4/5 
            mt-5
            mx-auto
            flex flex-row
            gap-4
            justify-between
            items-center
            '>
                <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                    onClick={() => handlePageChange(PageIndex - 1)}
                >Back</button>
                <button className="inline-flex items-center border b-1 border-rose-500 text-white py-2 px-5 focus:outline-none hover:bg-rose-500 rounded text-sm mt-4 md:mt-0"
                    onClick={() => handlePageChange(PageIndex + 1)}
                >Next</button>
            </div>


            <Footer />



        </div>

    )
}

interface StepProps {
    title: string;
    description: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    time: string
}


const Step = ({ title, description, isLoading, isSuccess, isError, time }: StepProps) => {
    const TimeToMillseconds = parseFloat(time) / 1000;

    if (isLoading === false && isError === false && isSuccess === false) {
        return (
            <>
            </>
        );
    }
    
    return (
        <>            
            <div className={`w-4/5 
        mx-auto
        flex flex-row
        gap-4
        justify-between
        border
        border-gray-800
        p-4
        ${description ? (
                    'border-b-0'
                ) : (
                    'mb-0'
                )}
        `}>
                {
                    isLoading ? (
                        <div className='flex flex-row gap-4 items-center'>
                            <LoadingIcon />
                            <h1 className='text-white'>
                                {title === "Terraform Apply"
                                    ? "Infrastructure Provisioning"
                                    : title
                                }
                            </h1>
                        </div>
                    ) : (
                        isLoading === false && isError === false && isSuccess === false ? (
                            <></>
                        ) : (
                            <>
                                <div className='flex flex-row gap-4 items-center'>
                                    {isSuccess ? (
                                        <SuccessIcon />
                                    ) : (
                                        <ErrorIcon />
                                    )}
                                    <h1 className='text-white'>
                                        {title === "Terraform Apply"
                                            ? "Infrastructure Provisioning"
                                            : title
                                        }
                                    </h1>
                                </div>
                                <div className='
                                    text-white
                                    text-sm
                                    font-medium
                                    '>
                                    Duration : {TimeToMillseconds.toFixed(1)}s
                                </div>
                            </>
                        )
                    )
                }
            </div>
            {description && isLoading === false && isError === false && isSuccess === false ?
                <></> :
                <div className='w-4/5 mx-auto flex flex-row gap-4 items-center border border-gray-800 border-t-0 p-4 pt-0' >
                    <div className='text-white whitespace-pre-wrap bg-gray text-sm font-vt323'>
                        <pre>{description}</pre>
                    </div>
                </div>
            }
        </>
    )
}


const SuccessIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

const ErrorIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

const LoadingIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    )
}

