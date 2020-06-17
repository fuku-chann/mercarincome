function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name : "Qiita ユーザー コントリビュート数取得",
      functionName : "myFunction"
    }
  ];
  sheet.addMenu("スクリプト実行", entries);
  //メインメニュー部分に[スクリプト実行]メニューを作成して、
  //下位項目のメニューを設定している
};

function myFunction () {
  Browser.msgBox("確認", "Hello GAS World.", Browser.Buttons.OK);
}
