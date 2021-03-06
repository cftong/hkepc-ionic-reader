/**
 * Created by Gaplo917 on 27/1/2016.
 */
import * as HKEPC from '../../data/config/hkepc'
import * as URLUtils from '../../utils/url'
import {LoginTabUpdateRequest}  from '../model/LoginTabUpdateRequest'
import * as Controllers from "./index"

export class AccountController {
  static get STATE() { return 'tab.features-account'}
  static get NAME() { return 'AccountController'}
  static get CONFIG() { return {
    url: '/features/account',
    views: {
      'tab-features': {
        templateUrl: 'templates/features/account/account.html',
        controller: AccountController.NAME,
        controllerAs: 'vm'
      }
    }
  }}

  constructor($scope, $http, $state, LocalStorageService, AuthService,$ionicPopup,$ionicHistory) {

    this.localStorageService = LocalStorageService
    this.http = $http
    this.scope = $scope
    this.state = $state
    this.authService = AuthService
    this.ionicPopup = $ionicPopup
    this.version = HKEPC.version
    this.ionicHistory = $ionicHistory
    this.isLoggedIn = false

    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })

    LocalStorageService.get('proxy').subscribe(data => {
      this.proxy = data || HKEPC.proxy
    })

    LocalStorageService.getObject('authority').subscribe( data => {
      this. user = data
    })

  }

  login(username,password){

    const authority = {
      username: username,
      password: password
    }

    this.authService.login(authority,(err,username) => {
      this.authService.saveAuthority(authority)

      this.scope.$emit(LoginTabUpdateRequest.NAME, new LoginTabUpdateRequest(username) )

      // unset the password field
      this.user.password = undefined

      this.ionicHistory.clearCache()

      // back to previous page
      this.onBack()
    })

  }

  logout(){
    this.authService.logout()

    // send the login name to parent controller
    this.scope.$emit(LoginTabUpdateRequest.NAME, new LoginTabUpdateRequest() )

    this.ionicHistory.clearCache()

    this.isLoggedIn = false
  }

  onBack(){
    const history = this.ionicHistory.viewHistory()
    if(history.backView && history.backView.stateName == Controllers.FeatureRouteController.STATE){
      this.ionicHistory.goBack()
    } else {
      this.state.go(Controllers.FeatureRouteController.STATE)
    }
  }

  isProxy() {
    return !URLUtils.isFileSys()
  }
}