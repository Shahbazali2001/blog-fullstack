import config from '../config/config.js';

import { Client, Account, ID } from 'appwrite';
 
export class AuthService {
    client = new Client();
    account;
 
    constructor(){
        this.client
        .setEndpoint(config.appwrite_Url)
        .setProject(config.appwrite_ProjectId);

        this.account = new Account(this.client); 
    }

    async createAccount({email, password, name}){
            try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
                    if (userAccount){
                    // return userAccount;
                    return this.logIn({email, password});
                    }
                    else{
                        return userAccount;
                    }
            } catch(error){
                throw new Error(error.message);
            }
    }

     async logIn({email, password}){
            try{
                return await this.account.createEmailSession(email, password);
            } catch(error){
                throw new Error(error.message);
            }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        } catch(error){
            console.log("getCurrentUser error: ", error);
        }
        return null;
    }

    async logOut(){
        try{
            await this.account.deleteSessions();
        } catch(error){
            console.log("logOut error: ", error);
        }
    }


}

