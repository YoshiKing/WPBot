/**
 * リクエストを送信
 * 
 * @param options
 * @return ret
 */
function sendRequest(options) {

  // retVal
  var ret = '';

  // リクエスト送信
  ret = UrlFetchApp.fetch('https://graph.facebook.com/' + Settings.GROUP_ID + '/feed', options);

  // 処理結果をログ出力
  Logger.log(ret);

  // return
  return ret;
}

/**
 * オプション情報を生成
 * 
 * @param message
 * @return options
 */
function generateOptions(message) {
  // オプション情報を返却
  return {
    'method': 'POST',
    'headers': {
      'Content-type': 'application/json'
    },
    'payload': {
      'access_token': Settings.ACCESS_TOKEN,
      'formatting': 'MARKDOWN',
      'message': message
    }
  }
}
