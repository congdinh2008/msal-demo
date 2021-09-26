import { LocalStorageKeyConstant } from 'src/constants/local-storage-key.constant';
import { LoginResultViewModel } from 'src/view-models/core/login-result.view-model';

export class AuthenticationHelper {
  /**
   * store login result in local storage
   */
  static storeLoginResult(loginResult: LoginResultViewModel) {
    const basicLoginResult = new LoginResultViewModel();
    basicLoginResult.accessToken = loginResult.accessToken;
    basicLoginResult.lifeTime = loginResult.lifeTime;
    basicLoginResult.refreshToken = loginResult.refreshToken;
    basicLoginResult.tokenType = loginResult.tokenType;

    // set result to local storage
    localStorage.setItem(
      LocalStorageKeyConstant.loginResult,
      JSON.stringify(basicLoginResult)
    );
    // localStorage.setItem(LocalStorageKeyConstant.userInformation, loginResult.userInformation);
  }

  /**
   * format login result by LoginResultViewModel
   */
  static formatLoginResult(loginResult: any): LoginResultViewModel {
    const result = new LoginResultViewModel();
    result.accessToken = loginResult.access_token;
    result.lifeTime = loginResult['.expires'];
    result.refreshToken = loginResult.refresh_token;
    result.tokenType = loginResult.token_type;
    // result.userInformation = loginResult.userInformation;

    return result;
  }

  /**
   * clear local storage
   */
  static clearLocalStorage() {
    const selectedDepartment = localStorage.getItem(
      LocalStorageKeyConstant.departmentId
    );
    const appVersion = localStorage.getItem(LocalStorageKeyConstant.appVersion);

    // clear  storage
    localStorage.clear();

    // keep selected department
    if (selectedDepartment) {
      localStorage.setItem(
        LocalStorageKeyConstant.departmentId,
        selectedDepartment
      );
    }

    // keep app version
    if (appVersion) {
      localStorage.setItem(LocalStorageKeyConstant.appVersion, appVersion);
    }
  }
}
