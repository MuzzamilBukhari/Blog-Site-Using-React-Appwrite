import { Client, Databases } from "appwrite";
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
      slug,
      content,
      status,
    }: {
      title: string;
      slug: string;
      content: string;
      status: string;
    },
    featuredImage: string,
    userId: string | undefined
  ) => {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title, content, userId, status, featuredImage
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

  getPost = async (postId: string) => {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.log("Database", error);
    }
  };

  deletePost = async (postId: string) => {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.log("database error ", error);
    }
  };

  updatePost = async (
    {
      title,
      content,
      status,
    }: {
      title: string;
      content: string;
      status: string;
    },
    featuredImage: string,
    postId: string
  ) => {
    try {
      return this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          title,
          content,
          status,
          featuredImage
        }
      );
    } catch (error) {
      console.log("database error ", error);
    }
  };
}

const databaseServices = new DatabaseServices();
export default databaseServices;
