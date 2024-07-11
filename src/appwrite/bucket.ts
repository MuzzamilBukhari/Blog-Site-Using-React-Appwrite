import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

export class BucketServices {
  client = new Client();
  storage: Storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteProjectUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  uploadFile = async (file: File) => {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      // throw error
      console.log("Bucket error : ", error);
    }
  };

  getFilePreview = (fileId: string) => {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
    } catch (error) {
      console.log("Bucket error : ", error);
    }
  };

  deleteFile = async (fileId: string) => {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Bucket error : ", error);
    }
  };
}

const bucketServices = new BucketServices();

export default bucketServices;
