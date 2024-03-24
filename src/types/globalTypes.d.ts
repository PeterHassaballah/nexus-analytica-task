//define models used in this repo
namespace models {
    // interface IUser{
    //     id:Number,
    //     name: string;
    //     email?: string;
    //     password?: string;
    //     age: number;
    //     active: boolean;
    //     lastLogin:string;
    // }
}
type SortOrder = 'asc' | 'desc' | 1 | -1;

interface QueryOptions {
    sortBy?: string; // Field to sort by
    sortOrder?: SortOrder; 
    skip?: number; // Number of documents to skip for pagination
    limit?: number; // Maximum number of documents to return
  }

export default QueryOptions;