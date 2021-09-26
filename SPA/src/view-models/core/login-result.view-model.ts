export class LoginResultViewModel {

  //#region Properties

  /*
  * Token that is used for accessing to protected sources in system.
  * */
  public accessToken: string;

  /*
  * Type of token.
  * */
  public tokenType: string;

  /*
  * Token which is used for refreshing the access token.
  * */
  public refreshToken: string;

  /*
  * How many seconds the token can live.
  * */
  public lifeTime: number;

  /**
   * user information
   */
  // public userInformation?: any;

  //#endregion

}
