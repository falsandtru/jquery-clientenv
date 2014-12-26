# jquery-clientenv

clientenvはウェブサイトのユーザー（閲覧者）のOS、ブラウザ、端末の種類のほか、フォントのインストールの有無（表示の可否）などの閲覧環境を判定・記録してウェブコンテンツの制作のクロスブラウザ対応をサポートするjQueryプラグインです。

たとえば、次のような記述でユーザーのブラウザがIEの8以前のバージョンを使用しているかとメイリオフォントがインストールされ表示可能であるかを調べて結果をクラスとしてHTML要素に追加することができます。

```js
$(function(){
  $.clientenv({ font: { family : '"メイリオ", Meiryo', lang : 'ja' } })
  .addClass('ie8:lte')
  .addClass('font', 'Meiryo, メイリオ', 'meiryo');
});
```

これは次のようにクラスを追加します。

```html
<!-- IEのバージョン8以前のブラウザであるが、メイリオフォントの表示に対応している場合 -->
<html class="lte-ie8 meiryo">

<!-- IEのバージョン8以前でないブラウザであるが、メイリオフォントの表示に対応していない場合 -->
<html class="not-lte-ie8 not-meiryo">
```

また、プラグインに記録された情報は次のように取得することができます。

```js
// OS名
$.clientenv.os.name;

// ハードウェアの種類 (pc/tablet/mobile/game/otherHardware)
$.clientenv.hardware.name;

// Windowsであるか (true/false)
$.clientenv.platform.windows;

// OSがWindowsのXP以前のバージョンであるか
$.clientenv.is('windowsXP:lte');

// 表示されているフォントがメイリオフォントであるか（表示可能であるかではありません）
$.clientenv.is('Meiryo, メイリオ');

// インストールされ、表示可能なすべてのフォントのカンマ区切り文字列
$.clientenv.font.support;
```

## API

### $.clientenv( Parameter as object )

ユーザーの閲覧環境の情報を判定・記録します。ただし、フォントの情報はDOMの読み込み完了後でなければ取得できないため、DOMの読み込み完了前に`$.clientenv()`を実行した場合は読み込む完了後に再度`$.clientenv()`を実行しなければフォント情報を使用することができません。取得済みの区分の情報（２回目以降の実行時）は明示されない限り更新されません。

```js
$.clientenv();
$(function(){ $.clientenv(); });
```

### $.fn.clientenv( Parameter as object )

clientenvのメソッドによりクラスを追加するHTML要素を設定します。`$.clientenv()`を使用した場合はルート要素であるHTML要素が設定されます。

```js
$('body').clientenv();
```

#### userAgent: string

ユーザーエージェントにより取得する文字列を上書きする場合に設定します。通常は設定は不要です。

#### hardware: boolean

この区分の情報を更新する場合に`true`を設定します。

#### platform: boolean

〃

#### os: boolean

〃

#### browser: boolean

〃

#### attribute: boolean

〃

#### font: node

フォントにかかる設定項目を持ちます。フォント情報はDOM読み込み完了後最初の実行時に取得されます。

#### font.family: Names as string

インストール（表示の可否）の判定を行うフォントをCSSの`font-family`の書式で列挙します。設定されない場合は`body`要素に適用されているCSSの`font-family`が使用されます。判定は`font.symbol``font.lang`の設定がない場合は英数字と記号の表示のみで行われます。

#### font.symbol: boolean

フォントのインストール（表示の可否）の判定に記号を使用します。初期値は`true`で有効です。

#### font.lang: Language as string

フォントのインストール（表示の可否）の判定に使用する言語をカンマ区切りで設定します。初期値は`en`です。

#### support: boolean

`jQuery.support`の内容を`jQuery.clientenv.support`から参照可能にするかを設定します。初期値は`true`で有効です。

#### strict: node

厳密な判定を行うかにかかる設定項目を持ちます。

#### strict.ie: boolean

IE5からIE9までのバージョン判定にコンディショナルコメントを使用するかを設定します。初期値は`false`で無効です。

#### not: boolean

`addClass()`メソッドなどを使用する際に、閲覧環境が条件に一致しなかった場合に`not-`の接頭辞を付加してクラスを追加するかを設定します。初期値は`true`で有効です。

### Method

#### addClass()

引数をクエリとして結果をコンテキストとなるHTML要素のクラスに追加します。

##### addClass( Property as string [, Query as string [, Key as string ]] )

`Property`に設定可能な値は`hardware``platform``os``browser``font`です。
`Query`に設定可能な値は、後述するこれらのプロパティが持つプロパティです。このプロパティが存在し、プロパティの値が`true`であればクエリが一致したものしてクラスが追加されます。クエリはカンマ区切りの文字列にすることで候補を複数列挙することができます。候補のうち１つ以上一致するものがあればクエリが一致したものとみなされます。クエリが一致しなかった場合はクエリに`not-`接頭辞を追加した値がクラスとして追加されます。`not-`接頭辞の使用の有無は`not`パラメータで設定可能です。
`Key`により追加するクラス名を設定できます。

```js
$.clientenv.addClass('font', 'Meiryo, メイリオ', 'meiryo');
```

##### addClass( Selector as string )

Selectorには複数のPropertyとQueryを混在させた文字列を使用することが可能です。プロパティ名の使用に対してはそのプロパティの区分の判定結果（プロパティが`os`であれば`windows7`など）を、クエリの使用に対してはそのクエリがユーザーの環境に一致すればクエリ名（クエリが`ie8`でユーザーの使用しているブラウザがIE8であれば`ie8`）をクラスとしてコンテキストにクラスを追加します。
プロパティとクエリはいずれも空白区切りの文字列にすることで複数列挙することができ、メソッドの記述の繰り返しを省略することが可能です。また、プロパティとクエリを混在させて使用できます。
次の２つの記述は同じ結果となります。

```js
$.clientenv.addClass('os').addClass('browser', 'ie').addClass('platform');
```

```js
$.clientenv.addClass('os ie platform');
```

`windows``osx``ie`のバージョンに対するクエリは範囲指定が可能であり、接尾辞として`:gt``:gte``:lt``:lte`、または接頭辞として`gt-``gte-``lt-``lte-`が指定可能です。接尾辞を使用したクエリは内部で接頭辞を使用したクエリに変換され、クラス名には接頭辞を使用したクエリ名が使用されます。

```js
$.clientenv.addClass('ie8:lte');
```

判定結果をJavaScriptで次のように使用できます。

```js
if ( $.clientenv.is('ie8:lte') ) {
  //IEのバージョン8以下のブラウザである
} else {
  //IEのバージョン8以下のブラウザでない
} ;
```

#### removeClass()

引数をクエリとして結果をコンテキストとなるHTML要素のクラスから削除します。

##### removeClass( Property as string [, Query as string [, Key as string ]] )

`addClass()`の動作に準じます

##### removeClass( Properties as string )

〃

##### removeClass( Queries as string )

〃

#### is()

##### is( Property as string [, Queries as string ] )

##### is( Selector as string )

引数をクエリとして、クエリが一致すれば`true`を、一致しなければ`false`を返します。
カンマでクエリを区切ることで次のように一致する候補を列挙することができます。候補のうち１つ以上一致するものがあればクエリが一致したものとみなされます。

```js
$.clientenv.is('mac, ios');
```

判定結果をJavaScriptで次のように使用できます。

```js
if ( $.clientenv.is('mac, ios') ) {
  //MacまたはiOSを搭載したデバイスである
} else {
  //MacまたはiOSを搭載したデバイスでない
} ;
```

#### filter()

##### filter( Property as string [, Queries as string ] )

##### filter( Selector as string )

引数をクエリとして、クエリが一致すればコンテキストをコンテキストとなるHTML要素を持つオブジェクトを、一致しなければ持たないオブジェクトを返します。一致しなかった場合、メソッドチェーンで繋がれる以降のメソッドは実行されません。
カンマでクエリを区切ることで次のように一致する候補を列挙することができます。候補のうち１つ以上一致するものがあればクエリが一致したものとみなされます。

#### reset()

##### reset( Parameter as object )

取得した情報をすべて破棄し再度取得します。`$.clientenv()`の初回実行と同等です。

```js
$.clientenv.reset();
```

### Property

#### hardware

このプロパティは次のプロパティを持ちます。

* `name`
* `pc`
* `mobile`
* `tablet`
* `game`
* `otherHardware`

#### platform

このプロパティは次のプロパティを持ちます。

* `name`
* `windows`
* `mac`
* `android`
* `iphone`
* `ipad`
* `ipod`
* `windowsPhone`
* `blackberry`
* `wii`
* `ds`
* `psp`
* `ps2`
* `ps3`
* `otherPlatform`

#### os

このプロパティは次のプロパティを持ちます。

* `name`
* `windows8`
* `windowsRT`
* `windows7`
* `windowsVista`
* `windowsServer2003`
* `windowsXP`
* `windowsME`
* `windows2000`
* `windows98`
* `windowsNT`
* `windows95`
* `osx10.8`
* `osx10.7`
* `osx10.6`
* `osx10.5`
* `osx10.4`
* `osx10.3`
* `osx10.2`
* `osx10.1`
* `osx10.0`
* `ios`
* `androidos`
* `otherOS`

#### browser

このプロパティは次のプロパティを持ちます。

* `name`
* `version`
* `chrome`
* `safari`
* `opera`
* `firefox`
* `mozilla`
* `lunascape`
* `sleipnir`
* `ie`
* `ie10`
* `ie9`
* `ie8`
* `ie7`
* `ie6`
* `ie5`
* `otherBrowser`

#### font

このプロパティは次のプロパティを持ちます。

* `name`
* `support`
* `notsupport`
* `support4style`
* `notsupport4style`
* 各フォント名

#### attribute

このプロパティは次のプロパティを持ちます。

* `name`
* `touch`

## Sample

### メイリオフォントのためのフォントファミリー最適化

Windowsでは最大限メイリオフォントを使用したいところですが、XP以前のバージョンのOSなどの環境ではフォントがインストールされていなかったり、インストールされていてもブラウザによってはかえって汚くなるなど環境別に細かな対応が必要となってきます。clientenvはこのための環境の切り分けをすべて行えるため、簡単に対応を行うことができます。

#### OSとブラウザ別の表示の仕様

##### メイリオフォントを使用させる環境

* WindowsXP以前のOSであり、メイリオフォントがインストールされているIEブラウザ
* WindowsVista以降のOSである、すべてのブラウザ

##### メイリオフォントを使用させない環境

* WindowsXP以前のOSである、IE以外のブラウザ
* メイリオフォントを表示できないすべてのブラウザ

##### 注記

デフォルトのCSSセレクタを変更しないように記述します。
上記以外の環境ではデフォルトのフォントファミリーの優先順によりフォントを選択させます。
WindowsXP以前のOSでメイリオフォントを使用させない環境ではMS Pゴシックを使用させます。


#### 閲覧環境の判定とフォントファミリーの最適化


##### HTML & CSS & JavaScript

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>visibilitytrigger</title>
<style type="text/css">

body {
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", Arial, sans-serif;
}

<!-- /* WindowsXP以下用のフォントファミリー */ -->
html:not(.not-lte-windowsXP):not(.ie) body,
html.ie.not-meiryo body {
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "ＭＳ Ｐゴシック", "MS PGothic", Arial, sans-serif;
}
</style>
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.clientenv.js"></script>
<script type="text/javascript">
$(function(){
  $.clientenv({
    font: {
      // clientenv実行前はWindowsXP以下用のCSSセレクタのほうが優先順位が高く
      // デフォルトのフォントファミリーが読み込まれないため判定を行うフォントを直接指定する
      family: '"メイリオ", Meiryo', lang: 'ja'
    }
  })
  // CSSの適用を分けるためのクラスを追加する
  .addClass( 'windowsXP:lte ie' )
  .addClass( 'font', 'Meiryo, メイリオ', 'meiryo' )；
});
</script>
</head>
<body>
  <h1>メイリオフォントのためのフォントファミリーの最適化</h1>
  <p>表示確認用テキスト</p>
</body>
</html>
```

### メイリオフォントのためのフォントサイズ最適化

WindowsXP以前の環境でもメイリオフォントを使用したい場合はフォントサイズを調整することでフォントのにじみを抑えて見やすくすることができます。

```html
/* すべての環境で共通のフォントファミリー */
body {
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", Arial, sans-serif;
  font-size: 95%;
}
```

## Browser

* IE6+
* Chrome
* Firefox
* Safari
* Android
* iOS

## jQuery

1.4.2+

## License
MIT License
