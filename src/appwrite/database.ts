import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DatabaseServices {
  client = new Client();
  databases: Databases;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteProjectUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  createPost = async (
    {
      title,
      content,
      status,
    }: {
      title: string;
      content: string;
      status: string;
    },
    userId: string | undefined
  ) => {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          userId,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  };

  getPosts = async () => {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      throw error;
    }
  };
}

const databaseServices = new DatabaseServices();
export default databaseServices;
