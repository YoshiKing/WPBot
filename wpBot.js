function onFormSubmit(e) {

  // Items
  var items = getItems(e.response.getItemResponses());

  // メッセージ（投稿文）
  var message = generateMessage(items);

  // オプション
  var options = generateOptions(message);

  // リクエスト送信
  var res = sendRequest(options);
}

/**
 * アイテムを取得
 * 
 * @param itemResponses
 * @return ret
 */
function getItems(itemResponses) {
  // retVal
  var ret = [3];

  // 入力項目でループ
  for (var i = 0; i < itemResponses.length; i++) {
    // 項目タイトルを判定
    switch (itemResponses[i].getItem().getTitle()) {
      // メッセージ1の場合
      case 'メッセージ1':
        ret[0] = itemResponses[i].getResponse();
        break;
      // メッセージ2の場合
      case 'メッセージ2':
        ret[1] = itemResponses[i].getResponse();
        break;
      // プルダウン1の場合
      case 'プルダウン1':
        ret[2] = itemResponses[i].getResponse();
        break;
      // 上記以外の場合
      default:
        break;
    }
  }
  // return
  return ret;
}

/**
 * メッセージを生成
 * 
 * @param items
 * @return ret
 */
function generateMessage(items) {
  // retVal
  var ret = '';

  ret += 'メッセージ1 : ';
  ret += '``` ';
  ret += items[0];
  ret += ' ```';
  ret += '\r\n';
  ret += 'メッセージ2 : ';
  ret += '``` ';
  ret += items[1];
  ret += ' ```';
  ret += "\r\n";
  ret += 'プルダウン1 : ';
  ret += '``` ';
  ret += items[2];
  ret += ' ```';
  ret += "\r\n";
  ret += '#';
  ret += generateManagementID();
  ret += "\r\n";
  ret += "\r\n";
  ret += '#';
  ret += items[2];

  // メッセージをログ出力
  Logger.log(ret);

  // return
  return ret;
}

/**
 * 管理IDを発行
 * 
 * @return managementID
 */
function generateManagementID() {

  // 現在日時を取得
  var date_obj = new Date();
  // 現在日時をフォーマット
  var timeStamp = Utilities.formatDate(date_obj, 'Asia/Tokyo', 'yyyyMMddHHmmsss');
  // ３６進数に変換
  var base36 = Number(timeStamp).toString(36);
  // 0埋めして返却
  return ('0000000000' + base36).slice(-10);
}
