import { IPager } from 'vn-models';

export class LoadUsersViewModel implements IPager {

  //#region Properties

  public userProvider: number;

  public isCheckUser: boolean;

  public keyword: string;

  public pageNumber: number;

  public pageSize: number;

  //#endregion

}
