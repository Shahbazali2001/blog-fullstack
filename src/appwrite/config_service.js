import config from '../config/config.js';

import { Client, ID, Databases, Storage, Query } from 'appwrite';
 
export class BlogService {
    client = new Client();
    databases;
    bucket;


    constructor(){
        this.client
        .setEndpoint(config.appwrite_Url)
        .setProject(config.appwrite_ProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)     
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        
        try{
            return await this.databases.createDocument(
                config.appwrite_DatabaseId,
                config.appwrite_CollectionId,
                slug,
                {title, content, featuredImage, status, userId,}
            )

        }catch(error){
            throw new Error(error.message);
        }
    }

    async updatePost(slug, {title, slug, content, featuredImage, status }){
        try{
            return await this.databases.updateDocument(
                config.appwrite_DatabaseId,
                config.appwrite_CollectionId,
                slug,
                {title, slug, content, featuredImage, status }
            )

        }catch(error){
            throw new Error(error.message);
    
        }    
    }

    async deletePost(slug){ 
        try{

            await this.databases.deleteDocument(
                config.appwrite_DatabaseId,
                config.appwrite_CollectionId,
                slug
            )
            return true; 

            }catch(error){
                throw new Error('Post not found');
                return false;
            }
    }


    async getPost(){
        try{
            return await this.databases.getDocument(
                config.appwrite_DatabaseId,
                config.appwrite_CollectionId,
                slug
            )

        }catch(error){
            throw new Error(error.message);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                config.appwrite_DatabaseId,
                config.appwrite_CollectionId,
                queries,

            )
        }catch(error){
            throw new Error(error.message); 
            return false;
            
     }
    }

    // file upload service 

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwrite_BucketId,
                ID.unique(),
                file
            )}catch(error){
                throw new Error(error.message); 
            }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                config.appwrite_BucketId,
                fileId
            )
            return true;

            }catch(error){
                throw new Error(error.message); 
                return false; 
            }
    }

    async getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                config.appwrite_BucketId,
                fileId
            )
           
        }catch(error){
            throw new Error(error.message); 
    
        }
    }


        
        

}

const Service = new Service();
export default Service;