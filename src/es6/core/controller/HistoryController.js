/**
 * Created by Gaplo917 on 6/3/2016.
 */
import * as Controllers from "./index"

const moment = require('moment')
require('moment/locale/zh-tw');

export class HistoryController {
  static get STATE() { return 'tab.features-history' }

  static get NAME() { return 'HistoryController' }

  static get CONFIG() {
    return {
      url: '/features/history',
      views: {
        'tab-features': {
          templateUrl: 'templates/features/history/history.html',
          controller: HistoryController.NAME,
          controllerAs: 'vm'
        }
      }
    }
  }

  constructor(HistoryService,$ionicHistory,$state) {
    this.historyService = HistoryService
    this.state = $state
    this.ionicHistory = $ionicHistory

    const historyStat = this.historyService.getHistoryStat()
    this.historyStat = historyStat

    console.log(historyStat)

    for(let key of Object.keys(historyStat)){
      const stat = historyStat[key]
      console.log(stat)
    }

  }

  onBack(){
    const history = this.ionicHistory.viewHistory()
    if(history.backView && history.backView.stateName == Controllers.FeatureRouteController.STATE){
      this.ionicHistory.goBack()
    } else {
      this.state.go(Controllers.FeatureRouteController.STATE)
    }
  }

  momentize(dateStr){
    return moment(dateStr, 'YYYYMMDD').format('L')
  }

  relativeMomentize(dateStr){
    return moment(dateStr, 'YYYYMMDD').endOf('day').fromNow()
  }

  sortedDateStrKey(obj){
    return Object.keys(obj).sort((e1,e2) => parseInt(e2) - parseInt(e1)).slice(0,5)
  }
}