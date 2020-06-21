function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name : "メルカリ売り上げ取得",
      functionName : "myFunction"
    }
  ];
  sheet.addMenu("スクリプト実行", entries);
  //メインメニュー部分に[スクリプト実行]メニューを作成して、
  //下位項目のメニューを設定している
};

function myFunction () {
 
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheetData = book.getSheetByName("シート1");
  
  //B-F列を削除
  sheetData.getRange('B:F').clear({contentsOnly: true, skipFilteredRows: true});
  
  var colID = 1;
  var colURL = 2;
  var colContributeCount = 3;
  var colIcon = 4;
  var rowStartData = 2
  var rowEndData = sheetData.getDataRange().getLastRow()
  
  //取得項目入力
  sheetData.getRange(4,2).setValue("商品名");
  sheetData.getRange(4,3).setValue("売り上げ");
  sheetData.getRange(4,4).setValue("販売状況");
  sheetData.getRange(4,5).setValue("商品コード");
  sheetData.getRange(4,6).setValue("商品url");
  
  for (var i = rowStartData; i <= rowEndData; i += 1) {
      var url = 'https://www.mercari.com/jp/' + "u/" + sheetData.getRange(i, colID).getValue() + "/";
      sheetData.getRange(i, colURL).setValue(url);
      var response = UrlFetchApp.fetch(url);
    
    //商品数取得クエリ、実際よりだいぶ少ない
      var counth3 = ('ダイソン').length; 
//      Browser.msgBox(counth3);
  }
  
//　HTMLを独立させないとエラーになる。冗長なのでまとめたい。。。
  var html1 = response.getContentText('UTF-8');
  var html2 = response.getContentText('UTF-8');
  var html3 = response.getContentText('UTF-8');
  var html4 = response.getContentText('UTF-8');
  var html5 = response.getContentText('UTF-8');
  for (var i = 1; i <= counth3; i += 1) {
      //商品名取得クエリ
    　var searchTag = 'h3 class="items-box-name font-2">';
      //売り上げ取得クエリ
      var searchPrice = 'div class="items-box-price font-5">¥';
      //販売状況取得クエリ（販売中かsoldか確認するため）
      var searchSold = 'div class="item-sold-out-badge"><div>';
      //商品コード取得クエリ
      var searchNumber = '<a href="/jp/items/';
//      //商品Url取得クエリ
//      var searchUrl = 'section class="items-box">';
    var index1 = html1.indexOf(searchTag);
      var index2 = html2.indexOf(searchPrice);
      var index3 = html3.indexOf(searchSold);
      var index4 = html4.indexOf(searchNumber);
      if (index1 !== -1) {
        var html1 = html1.substring(index1 + searchTag.length);
        var index1 = html1.indexOf('</h3>');
        if (index1 !== -1) {
          sheetData.getRange(i+4, colContributeCount-1).setValue(html1.substring(0, index1));    
        }
      }
      if (index2 !== -1) {
        var html2 = html2.substring(index2 + searchPrice.length);
        var index2 = html2.indexOf('</div>');
        if (index2 !== -1) {
          sheetData.getRange(i+4, colContributeCount).setValue(html2.substring(0, index2));
        }
      }
      if (index3 !== -1) {
        var html3 = html3.substring(index3 + searchSold.length);
        var index3 = html3.indexOf('</div>');
        if (index3 !== -1) {
          sheetData.getRange(i+4, colContributeCount+1).setValue(html3.substring(0, index3));
        }
      }
      if (index4 !== -1) {
        var html4 = html4.substring(index4 + searchNumber.length);
        var index4 = html4.indexOf('/">');
        if (index4 !== -1) {
          sheetData.getRange(i+4, colContributeCount+2).setValue(html4.substring(0, index4));
        }
      }
      if (index4 !== -1) {
        var html4 = html4.substring(index4 + searchNumber.length);
        var index4 = html4.indexOf('">');
        if (index4 !== -1) {
          sheetData.getRange(i+4, colContributeCount+3).setValue(html4.substring(0, index4));
        }
      }
    }
}
