export interface IUser {
  id: string;
  username: string;
  name: string;
  avatar: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  emailVisibility: boolean;
  verified: boolean;
  expand?: any;
  isNew?: any;
}
