# kikiau — ききあう

介護の場面で、高齢者の日本語を聞き取り、聞き返し、返答する練習サイトです。英語を初期表示に、日本語・シンハラ語・ミャンマー語・ベトナム語・インドネシア語へ切り替えられます。

**このフォルダーはビルド済みです。そのままGitHub Pagesへ公開できます。初回公開にコマンド操作やAPIキーは必要ありません。**

## GitHubへアップロードして公開する

1. ZIPを解凍します。解凍先を開き、`index.html`、`assets`、`print-art`、`fonts`、`source`などが見える場所まで進みます。
2. GitHubで新しいリポジトリを作ります。名前は **`kikiau-care`** を推奨します。GitHub FreeでPagesを使う場合は **Public** を選び、**Add a README file**を有効にして作成してください。公開サイトとリポジトリ内のファイルは誰でも閲覧できます。
3. 作成したリポジトリの **Add file → Upload files**を開きます。手順1で見えている**中身のファイルとフォルダーをまとめて**ドラッグします。ZIP自体や、中身を包んでいる`kikiau-care-github`フォルダーをアップロードしないでください。`assets`・`fonts`・`print-art`・`source`の中身をばらして置かず、フォルダー構造を保ちます。
4. **Commit changes**で`main`へ保存します。変更提案の画面になる場合は、Pull requestを作成して`main`へマージしてください。保存後、リポジトリの一番上に **`index.html`** と **`assets`・`print-art`** が並んでいることを確認します。
5. **Settings → Pages → Build and deployment**で、**Source: Deploy from a branch**、**Branch: main**、**フォルダー: / (root)** を選び、**Save**を押します。**Custom domainは空欄**のままにしてください。
6. 公開処理の完了を待ち、Pagesに表示された **Visit site**を開きます。通常のURLは`https://あなたのGitHubユーザー名.github.io/kikiau-care/`です。最初の公開には数分かかることがあります。

リポジトリ名を変えても画像・フォントを読み込めるよう、公開ファイルの参照は相対パスにしています。ファイル名や各フォルダー名は変更しないでください。`.nojekyll`が表示される場合は、それも一緒にアップロードしてください。隠しファイルが表示されない環境向けの`_config.yml`も同梱しています。

## 表示できないときの確認

- **GitHubにZIPだけが置かれている：** ZIPは自動展開されません。解凍した中身をアップロードします。
- **404になる：** リポジトリ直下に`index.html`があるか、Pagesが`main / (root)`になっているかを確認します。`Actions`で公開処理が完了してから、Pagesの`Visit site`を開きます。
- **画像やデザインが出ない：** `assets`・`fonts`・`print-art`が`index.html`と同じ階層にあり、フォルダー内のファイルもアップロードされているかを確認します。大文字・小文字も変えないでください。
- **古い画面のまま：** 公開処理の完了後、ページを再読み込みします。必要ならブラウザーの強制再読み込みを使います。
- **Pagesでブランチを選べない：** ファイルのアップロードとCommitが完了しているか、変更が`main`へマージされているかを確認します。GitHub Freeの場合はPublicリポジトリを使います。

## 内容と音声

短い会話48件、長い会話12件・277発話、聞き分け問題48件を含みます。音声制作画面には話者・台詞・演出など961クリップ分の制作指示があります。

現在の音声は、端末に用意された日本語読み上げ音声です。人物ごとの生成音声はまだ収録していません。日本語の声が端末にない場合は、字幕で練習するか、日本語の音声を端末へ追加してください。制作した音声をサイト内で各教材に関連付けることもできます。

学習履歴・設定・追加した録音は、そのブラウザーに保存されます。以前のSiteとGitHub Pagesは別の保存先なので、履歴や録音は自動移行されません。録音を追加しても、他の利用者へ配信されることはありません。教材・学習記録の書き出しには録音ファイルは含まれません。

## 後から内容やデザインを編集する

編集用のReact / TypeScriptソースを`source`に同梱しています。公開済みファイルを使うだけなら、以下の作業は不要です。

Node.js **22.13以上**を用意し、ターミナルで`source`フォルダーに移動して実行します。

```sh
npm ci
npm run build
npm run preview
```

`npm run build`は、親フォルダーの`index.html`と`assets`を更新します。`npm run preview`の後、`http://localhost:4173`を開くと手元で確認できます。`index.html`をダブルクリックして開く方法では確認しないでください。編集後は、更新した`index.html`・`assets`と、変更した画像・フォント・ソースをGitHubへ反映します。`node_modules`はアップロードしません。

## 検証の範囲

この配布物は静的サイトとしてビルドし、同梱ファイルと参照先の整合性を確認しています。実際のGitHubアカウントへのアップロード・公開、およびブラウザーでの対話操作は未実施です。GitHub側の公開結果は、アップロード後に`Settings → Pages`と`Actions`で確認してください。

## GitHub公式の手順

- [ファイルをリポジトリへ追加する](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Pagesの公開元を設定する](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

