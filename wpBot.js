function onFormSubmit(e) {

  // グループID
  var GROUP_ID = '**********';
  // アクセストークン
  var ACCESS_TOKEN = '**********';

  // Items
  var items = getItems(e.response.getItemResponses());

  // メッセージ（投稿文）
  var message = generateMessage(items);

  // オプション
  var options = {
    'method': 'POST',
    'headers': {
      'Content-type': 'application/json'
    },
    'payload': {
      'access_token': ACCESS_TOKEN,
      'formatting': 'MARKDOWN',
      'message': message
    }
  }

  // 投稿メッセージをログ出力
  Logger.log(message);

  // リクエスト送信
  var res = UrlFetchApp.fetch('https://graph.facebook.com/' + GROUP_ID + '/feed', options);

  // 処理結果をログ出力
  Logger.log(res);
}

/**
 * アイテムを取得
 * 
 * @param itemResponses
 * @return items
 */
function getItems(itemResponses) {
  // Items
  var items = [3];

  // 入力項目でループ
  for (var i = 0; i < itemResponses.length; i++) {
    // 項目タイトルを判定
    switch (itemResponses[i].getItem().getTitle()) {
      // メッセージ1の場合
      case 'メッセージ1':
        items[0] = itemResponses[i].getResponse();
        break;
      // メッセージ2の場合
      case 'メッセージ2':
        items[1] = itemResponses[i].getResponse();
        break;
      // プルダウン1の場合
      case 'プルダウン1':
        items[2] = itemResponses[i].getResponse();
        break;
      // 上記以外の場合
      default:
        break;
    }
  }
  // return
  return items;
}

/**
 * メッセージを生成
 * 
 * @param items
 * @return message
 */
function generateMessage(items) {
  // message
  var message = '';

  message += 'メッセージ1 : ';
  message += '``` ';
  message += items[0];
  message += ' ```';
  message += '\r\n';
  message += 'メッセージ2 : ';
  message += '``` ';
  message += items[1];
  message += ' ```';
  message += "\r\n";
  message += 'プルダウン1 : ';
  message += '``` ';
  message += items[2];
  message += ' ```';
  message += "\r\n";
  message += '#';
  message += generateManagementID();
  message += "\r\n";
  message += "\r\n";
  message += '#';
  message += items[2];

  // return
  return message;
}

/**
 * 管理IDを発行
 * 
 * @return manageMentID
 */
function generateManagementID() {
  // manageMentID
  var manageMentID = '';

  // 現在日時を取得
  var date_obj = new Date();
  // 現在日時をフォーマット
  var timeStamp = Utilities.formatDate(date_obj, 'Asia/Tokyo', 'yyyyMMddHHmmsss');
  // ３６進数に変換
  var base36 = Number(timeStamp).toString(36);
  // 0埋め
  manageMentID = ('0000000000' + base36).slice(-10);

  // return
  return manageMentID;
}
