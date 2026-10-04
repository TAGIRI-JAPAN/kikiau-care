import {Children,cloneElement,isValidElement,type ReactNode,type ReactElement} from 'react';
import {drillDictionary} from './drill-english';
import {scenarioDictionary} from './scenario-english';
import {scenarios} from './scenarios';
import {drills} from './listening-drills';
import si from './locales/si.json';
import my from './locales/my.json';
import vi from './locales/vi.json';
import id from './locales/id.json';
export type Language='en'|'ja'|'si'|'my'|'vi'|'id';
export const languages:{id:Language;label:string;english:string}[]=[{id:'en',label:'English',english:'English'},{id:'ja',label:'日本語',english:'Japanese'},{id:'si',label:'සිංහල',english:'Sinhala'},{id:'my',label:'မြန်မာ',english:'Myanmar'},{id:'vi',label:'Tiếng Việt',english:'Vietnamese'},{id:'id',label:'Bahasa Indonesia',english:'Indonesian'}];

const jaExtras:Record<string,string>={
'A little listening. A closer connection.':'少し聞く。その人に近づく。','Learn to hear the person behind the words.':'ことばの奥にある、その人の思いを聞く。','Your learning room':'あなたの学習室','Today, take a moment to listen.':'今日も、耳を傾ける時間を。','Choose a conversation':'会話を選ぶ','Small moments, real understanding.':'日々の会話から、理解を深める。','Explore the conversations':'会話を探す','Learning language':'表示言語','Display language':'表示言語','Short, everyday moments':'日常の短い会話','Longer conversations':'長い会話','Listen, understand, connect.':'聞く。わかる。つながる。','A quiet moment in the lounge':'居間で過ごすひととき','Every conversation starts with listening.':'会話は、聞くことから。','Your next small step':'次の小さな一歩','Practice at your pace':'自分のペースで練習','Open your lesson':'練習を開く','Learning translation':'英語の訳','A conversation worth listening to':'耳を傾けたい会話','Your practice':'あなたの練習','Listen together':'ともに聞く','Conversation library':'会話の本棚','Care, one conversation at a time.':'一つひとつの会話から、思いやりを。','Keep learning':'学びを続ける','Audio workshop':'音声制作室','FOLLOW THE CONVERSATION':'会話の流れを追う','CHECK YOUR UNDERSTANDING':'内容を確かめる','AUDIO PRODUCTION STUDIO':'音声制作室','ONE WORD, DIFFERENT MEANING':'一語で変わる意味','SCENE LIBRARY':'場面から選ぶ','YOUR PRACTICE':'あなたの練習','NEXT PRACTICE':'次の練習','GROW THE LESSONS':'教材を育てる','CONTENT WORKSHOP':'教材制作室','Asset ID':'素材ID'
};
const localeMaps:Partial<Record<Language,Record<string,string>>>={si,my,vi,id};
export function isLanguage(value:unknown):value is Language{return languages.some(l=>l.id===value);}
export function localText(text:string,language:Language):string{
 const map=localeMaps[language];if(!map)return text;
 if(map[text])return map[text];
 return text.split('\n').map(line=>{if(map[line])return map[line];const trimmed=line.trim();if(map[trimmed])return line.replace(trimmed,map[trimmed]);const suffix=trimmed.match(/^(.*?)( [0-9]+(?:[ /.,×–-][0-9]+)*[.!]?| · .*|: .*)$/);if(suffix&&map[suffix[1]])return line.replace(trimmed,map[suffix[1]]+suffix[2]);return line;}).join('\n');
}
export function localizedText(value:{ja:string;en:string},language:Language):string{return language==='ja'?value.ja:localText(value.en,language);}

const ui=String.raw`否定・時間・言い直し。似たことばの違いを練習します。\tPractise differences in negation, time, and self-corrections.
このサイトの会話と問題は、学習用に作った例です。\tThe conversations and questions on this site are authored learning examples.
場面イメージ・生成画像\tGenerated scene illustration
居間で会話する高齢の女性と介護職員。椅子のそばに黄色いひざ掛けと上着があります。\tAn older woman and care worker talking in the lounge. A yellow lap blanket and a jacket are beside the chair.
山田 はるさん\tHaru Yamada · 山田はる
佐藤 正夫さん\tMasao Sato · 佐藤正夫
田中 文子さん\tFumiko Tanaka · 田中文子
鈴木 昭さん\tAkira Suzuki · 鈴木昭
練習から、もう一度。\t practice: try again.
長い会話\tConversations
会話劇\tTalks
高齢者の日本語\tJapanese in elder care
会話を練習\tShort lessons
場面から選ぶ\tScenes
聞き分ける\tListen closely
復習する\tReview
教材を育てる\tWorkshop
会話\tLessons
場面\tScenes
聞き分け\tListening
復習\tReview
教材\tWorkshop
教材と音声について\tAbout lessons and audio
学習メニュー\tLearning menu
今日の会話\tToday's short lesson
約 3 分\tAbout 3 min
生活のお願い\tEveryday requests
気持ち・雑談\tFeelings and small talk
言い直し・時間\tCorrections and time
困りごと・連携\tConcerns and staff communication
復習に保存済み\tSaved for review
復習に保存\tSave for review
会話の練習\tConversation practice
練習の段階\tPractice steps
聞く\tListen
意味を考える\tUnderstand
聞き返す\tClarify
返答する\tRespond
申し送る\tPass it on
追加した録音\tAdded audio
練習用の読み上げ\tDevice speech · practice sample
音声について\tAbout audio
音声を停止\tStop audio
会話を聞く\tListen to the words
聞いています…\tPlaying…
短いことばと、間を聞いてみましょう。\tListen to short phrases and pauses.
字幕あり\tShow Japanese transcript
再生速度\tPlayback speed
0.8 倍\t0.8×
1.0 倍\t1.0×
1.2 倍\t1.2×
話したことば\tWords spoken · Japanese
まず、自分の耳で捉える。\tFirst, listen for yourself.
ことばの断片だけでも大丈夫。聞こえたものを残します。\tA few words are enough. Note what you heard.
聞こえたことば・自分の予想（任意）\tWords you heard and your guess (optional)
例：寒い、そこの…。近くの何かがほしい？\tFor example: samui, soko no… Maybe they want something nearby?
ことばの選択肢を開く\tOpen the word choices
どのくらい聞き取れましたか？\tHow confident are you?
自信あり\tConfident
少し迷う\tUnsure
まだ不明\tNot clear yet
聞き取ったことを確認\tCheck the words
もう一度聞く\tListen again
注目することば：\tKey words: 
聞き逃したことば：\tWords missed: 
発言にない選択：\tWords not spoken: 
最初のメモ：\tYour first note: 
なし\tNone
メモの自動採点はありません。字幕と比べて、自分の予想を確かめます。\tNotes are not automatically graded. Compare your guess with the transcript.
今、どこまでわかりますか？\tWhat do you know so far?
どう聞き返しますか？\tHow would you check the meaning?
確認できたことに、どう返しますか？\tHow would you respond after checking?
わかったことと、まだ不明なことを分けましょう。\tSeparate what you know from what is still unclear.
一度に一つ、相手が答えやすい方法で。\tAsk one specific question at a time.
短いことばで、次の行動を伝えましょう。\tBriefly explain what you will do next.
相手の返答\tTheir reply · Japanese
相手の返答を聞く\tListen to their reply
理解が一歩進みました\tYour understanding has moved forward
もう一度、確かめてみましょう\tLet's check again
返答を聞く\tListen to the reply
まだ不明：\tStill unclear: 
聞き返してみる\tTry a clarification
返答してみる\tTry a response
申し送りへ\tPractise a handover
この聞き返しを試す\tTry this question
回答を確かめる\tCheck my answer
選び直す\tChoose again
職員に、どう伝えますか？\tWhat would you tell another staff member?
話されたこと・確認できたこと・まだ不明なことを分けます。\tSeparate the words spoken, confirmed information, and unknown details.
あなたの申し送り\tYour handover note
本人のことば、確かめた内容、まだ不明なことを書きます。\tWrite the person's words, what you checked, and what remains unknown.
文章の自動採点はありません。例と比べて、自分で確認します。\tYour writing is not automatically graded. Compare it with the example.
申し送り例と比べる\tCompare with the handover example
この会話の練習を終える\tFinish this lesson
申し送りの例\tHandover example
本人のことばを残せましたか？\tDid you include the person's own words?
確認した内容を伝えましたか？\tDid you include what was confirmed?
未確認のことを、決めつけていませんか？\tDid you avoid presenting unconfirmed details as facts?
「担当職員へ伝える」と書く場合は、実際に伝えたかも区別します。\tDistinguish a plan to inform staff from an action already completed.
相手の思いを、確かめられました。\tYou checked what the person meant.
迷ったところは、もう一度練習できます。\tYou can practise the parts you were unsure about again.
同じ希望でも、伝え方はいろいろあります。\tThe same wish can be expressed in different ways.
確認後の、わかりやすい日本語\tClear Japanese after confirmation
読み上げを聞く\tListen to the clear version
こんな言い方もあります\tOther ways to say it
次の復習目安：\tSuggested next review: 
 日後\t days later
（迷った箇所は今すぐ復習もできます）\t (You can review uncertain parts now.)
次の会話を練習\tNext short lesson
もう一度練習\tPractise again
会話の相手\tPerson in this lesson
 歳・架空の人物\t years old · fictional person
今の場面\tThe situation
お茶と手芸が好き。居間でよくお話しします。\tEnjoys tea and crafts. Often chats in the lounge.
園芸が好き。短いことばで用事を伝えます。\tEnjoys gardening. Sometimes makes requests in short phrases.
昔の歌が好き。思い出を話してくれます。\tEnjoys familiar songs and sharing memories.
新聞と将棋が好き。話しながら言い直すことがあります。\tEnjoys newspapers and shogi. Sometimes corrects a phrase while speaking.
答えを急がず、手がかりを探す\tLook for clues before deciding
聞き返しは、一つずつ\tClarify one thing at a time
確認できた希望を受け止める\tAcknowledge the confirmed wish
事実と、推測を分ける\tSeparate facts from guesses
ことばだけで決められないときは、目線や指差し、前後の会話も手がかりになります。\tIf words alone are not enough, use gaze, pointing, and the surrounding conversation as clues.
短く聞く。物を見せる。答えを待つ。聞き取れないときは、別の職員にもつなぎましょう。\tAsk briefly, show an object, and wait. Ask another staff member for support if needed.
相手の返答を聞いて、最初の推測を更新します。\tUse the person's reply to update your first guess.
聞いた内容と、自分で考えた内容を混ぜずに伝えます。\tKeep what you heard separate from what you inferred.
English ヒント\tExtra English hint
読み上げの設定\tDevice speech settings
一語の違いを、聞けますか？\tCan you hear the one-word difference?
否定・時間・方向を、短い発言で集中練習。\tFocus on negation, time, and direction in short utterances.
聞き分ける・24問\tListen closely · 24 questions
作成例・現場監修待ち\tAuthored sample · professional review pending
話し方は人それぞれです。年齢だけで、話し方や理解力を決めつけません。\tSpeech varies by person. Age alone does not determine speech or understanding.
場面から、練習しよう。\tChoose a situation to practise.
お願いも、何気ないお話も。\tRequests and everyday conversations. 
 の会話が待っています。\t lessons available.
場面の種類\tSituation category
すべての場面\tAll situations
難しさ\tDifficulty
すべてのレベル\tAll levels
Level 1 ・短い会話\tLevel 1 · Short phrases
Level 2 ・言い直しと条件\tLevel 2 · Corrections and conditions
Level 3 ・確認と連携\tLevel 3 · Checking and staff communication
この組み合わせの教材は、まだありません。\tThere are no lessons for these filters yet.
すべての場面を見る\tShow all situations
もう一度聞くと、気づけること。\tListen again and notice more.
迷った会話、保存した会話を、自分のペースで。\tReview uncertain and saved lessons at your own pace.
練習した会話\tLessons completed
練習した会話の割合\tProportion of lessons completed
今の復習候補\tSuggested reviews
聞き分けも、練習してみよう。\tTry focused listening practice too.
会話で迷った段階を集計。正誤だけでなく、どこで迷ったかを見直します。\tSee which stages caused uncertainty, then practise those stages again.
まだ迷った段階の記録はありません\tNo uncertain stages recorded yet
24問の聞き分けへ\tOpen 24 listening questions
今、復習の時期になった会話はありません。\tNo scheduled short lessons are due now.
最初の会話を、聞いてみましょう。\tTry your first short lesson.
練習すると、迷った箇所と次の復習目安がここに残ります。\tYour uncertain stages and suggested review dates will appear here.
会話を練習する\tStart a short lesson
保存した会話\tSaved lessons
記録はこのブラウザーに保存されます。復習日数は目安で、学習効果の判定ではありません。\tRecords stay in this browser. Review intervals are suggestions, not a measure of learning effectiveness.
現場のことばで、教材を育てる。\tBuild lessons from real situations.
聞いたことばと、確認した意味を、ひとつの教材に。\tKeep the actual words and their checked meaning together.
教材の下書きを作る\tCreate a lesson draft
録音があると、発音も練習できます。\tRecordings let you practise different voices.
初期教材は作成した会話の読み上げです。本人の同意を得た匿名の録音や、協力者が演じた音声を追加できます。録音と教材は、このブラウザーに保存されます。\tInitial lessons use device speech for authored examples. Add anonymous recordings with consent, acted recordings, or generated audio. Files and lessons stay in this browser.
サーバーへの送信、ほかの人との自動共有はありません。\tThere is no automatic upload or sharing with others.
会話に録音を追加する\tAttach audio to a short lesson
字幕と同じ内容の音声を選んでください。\tChoose audio that matches the Japanese script exactly.
字幕にすることば\tJapanese script for the recording
音声ファイルを選ぶ\tChoose an audio file
MP3・WAV・M4A など / 20MB まで\tMP3, WAV, M4A and more · up to 20 MB
録音音声を選ぶ\tChoose lesson audio
追加した録音を使う\tUse added audio
オフにすると読み上げに戻ります。保存した録音は残ります。\tSwitch off to use device speech. Your audio file will remain saved.
この教材で練習する\tPractise this lesson
一つの教材に残すこと\tWhat to keep in each lesson
話したことばを、そのまま\tThe exact spoken words
省略や言い直しも残します。\tKeep omitted words and self-corrections.
わかったこと・まだ不明なこと\tKnown and unknown information
正解を一つに決められない場面も作れます。\tInclude situations where the words alone are not enough.
確かめた質問と、相手の返答\tThe clarification and reply
意味がわかった経緯を残します。\tRecord how the meaning was checked.
返答と、申し送りの例\tResponse and handover example
介護職や日本語教師と内容を確認してから追加します。\tCheck the content with a care professional or Japanese teacher before use.
教材を持ち出す・受け取る\tExport and import lessons
JSON 書き出し\tExport lesson JSON
教材を読み込む\tImport lessons
教材JSONを読み込む\tImport lesson JSON
書き出しに録音は含まれません。読み込み時は追加教材を統合し、あなたの学習記録を保持します。\tAudio is not included in this export. Import merges custom lessons and keeps your learning records.
追加した教材\tCustom lessons
 件\t items
下書き\tDraft
練習に追加済み\tAvailable for practice
内容を確認\tReview the content
最初の教材を、残してみませんか。\tCreate your first custom lesson.
下書きを作り、内容を確認してから練習に加えられます。\tSave a draft, check it, then add it to practice.
教材について\tAbout these lessons
— 会話の向こうにいる人へ。\t— Listen to the person, not just the words.
教材の下書きを編集\tEdit lesson draft
教材の内容を確認する\tReview lesson content
ききあうの教材について\tAbout Kikiau lessons
個人が特定される名前や情報は入れないでください。\tDo not include information that identifies a real person.
意味・質問・返答・申し送りを確認します。\tReview the meaning, questions, responses, and handover.
日本語の音声は、ご利用の端末やブラウザーで異なります。\tAvailable Japanese voices depend on your device and browser.
会話を理解し、確かめるための日本語学習です。\tPractise understanding Japanese and checking its meaning.
日本語の読み上げ音声\tJapanese device voice
読み上げ音声\tDevice voice
自動で選ぶ\tSelect automatically
利用できる日本語音声：\tAvailable Japanese voices: 
 種類\t voices
声を変えても、高齢者特有の発音や個人差を再現する機能ではありません。\tChanging the device voice does not reproduce an older person's individual speech.
音声を試す\tTry the voice
初期の24会話と、聞き分け24問は、学習用に作った例です。\tThe initial 24 lessons and 24 listening questions are authored learning examples.
登場人物も架空です。実際の利用者の発言や、現場で監修済みの教材ではありません。\tThe people are fictional. These are not recordings of actual residents or professionally reviewed care materials.
音声は端末の日本語読み上げを使います。省略されたことばや言い直しを練習できますが、入れ歯による発音の変化、個人特有の声、病気による発話の変化は再現しません。\tDefault audio uses Japanese device speech. It can read fragments and corrections, but does not reproduce individual voices, denture-related changes, or speech changes caused by illness.
実際の発音の練習には「教材を育てる」で録音を追加してください。録音は字幕と同じ内容にし、意味や返答を介護職・日本語教師と確認すると、教材として育てられます。\tAdd recordings in the Workshop for real pronunciation practice. Match the transcript, then check the meanings and responses with a care professional or Japanese teacher.
不調の場面も日本語の練習例です。実際の対応は施設の手順と担当職員の判断に沿って行います。\tDiscomfort scenarios are language exercises. Actual care follows facility procedures and responsible staff guidance.
学習の組み立ての参考\tReferences for the learning structure
先に聞いて、あとから文字で確かめる順序と、苦手な項目を繰り返す練習を参考にしています。このサイトの会話・問題は独自作成です。\tThe structure uses listening before reading and repeated practice of difficult items. Scripts and questions on this site are independently authored.
国際交流基金「まるごと」の教え方\tJapan Foundation: teaching Marugoto
いろどり日本語オンラインコース\tIrodori Japanese Online Course
教材を育てる画面へ\tOpen the Workshop
追加教材の種類\tCustom lesson category
追加教材の話者\tCustom lesson speaker
教材のタイトル\tLesson title
例：そこの、黄色いの…\tFor example: the yellow one over there…
前後の状況・場面\tSituation and context
何をしているときの発言ですか？\tWhat was happening when the words were spoken?
話したことば・字幕\tSpoken Japanese and transcript
省略や言い直しも、そのまま残します。\tKeep omissions and self-corrections exactly as spoken.
発言から、わかること\tWhat the utterance tells us
確認前にわかることだけを書きます。\tWrite only what is known before clarification.
まだ不明なこと\tWhat is still unknown
何を確かめる必要がありますか？\tWhat needs to be checked?
意味を確かめた質問\tQuestion used to check the meaning
一度に一つ、具体的に。\tOne specific question at a time.
質問のあと、何と答えましたか？\tWhat was the person's reply?
相手の希望を短く書きます。\tWrite the person's wish briefly in clear Japanese.
希望を確認したあとの返答\tResponse after confirming the wish
次の行動を短く伝えます。\tExplain the next action briefly.
事実と未確認のことを分けます。\tSeparate facts from unconfirmed information.
English ヒント（任意）\tEnglish hint (optional)
下書きを保存\tSave draft
わかること\tWhat is known
聞き返し\tClarification
確認後の意味\tMeaning after checking
返答\tResponse
申し送り\tHandover
練習に表示する選択肢\tChoices shown to learners
意味\tMeaning
推奨例\tSuggested example
別の選択肢\tAnother choice
介護職や日本語教師と、選択肢も確認してから使ってください。\tCheck the choices with a care professional or Japanese teacher before use.
下書きを編集\tEdit draft
内容を確認した方の名前・役割\tName or role of the reviewer
例：日本語教師・介護職員\tFor example: Japanese teacher / care worker
確認して、このブラウザーの練習に加える\tConfirm and add to this browser's lessons
練習済み\tPractised
未練習・約 3 分\tNot practised · about 3 min
迷った箇所：\tUncertain stages: 
保存から外す\tRemove from saved lessons
具体的に確かめました。相手の返答で、理解を更新できます。\tYou checked specifically. Use the reply to update your understanding.
『いつ、どれ、どうして、どうしたいですか？』と一度に聞く。\t『いつ、どれ、どうして、どうしたいですか？』\nAsk when, which, why, and what they want all at once.
質問が重なると、何に答えるか迷いやすくなります。短く一つずつ聞きましょう。\tSeveral questions at once can be confusing. Ask briefly, one at a time.
『もういいですね』と話を終える。\t『もういいですね』\nEnd the conversation without checking what they mean.
『わかりました』だけで、確認せず進める。\t『わかりました』\nSay you understand and proceed without checking.
見えている物や、聞き取れたことばを使って確かめましょう。\tUse visible objects and the words you heard to check the meaning.
確認できた希望を受け止め、次の行動を短く伝えられました。\tYou acknowledged the confirmed wish and explained the next action briefly.
『わかりました』だけ言って、次にどうするか伝えない。\t『わかりました』\nSay only that you understand, without explaining the next action.
この練習では、確認できたことと次の行動を一言添えてみましょう。\tIn this exercise, briefly mention the confirmed meaning and the next action.
聞き取れたこと：\tWhat you heard: 
発言からわかるのは：\tWhat the words tell us: 
まだ不明なのは：\tStill unknown: 
省略されたことばや、言い直しのあとに注目しましょう。\tListen for omitted information and what follows a correction. 
確認できた希望は\tThe confirmed wish is
。相手が確認してくれた内容を使いましょう。\t. Use the meaning confirmed by the person.
最後のひとことまで、聞こう。\tListen to the end of the phrase.
否定・時間・言い直し。似たことばの違いを、24問で練習します。\tPractise negation, time, and corrections in 24 short questions.
回答した問題\tQuestions answered
直近の回答が正解\tCorrect in latest attempt
もう一度確かめる\tNeeds another check
聞き分けのテーマ\tListening theme
すべてのテーマ\tAll themes
間違えた問題だけ\tReview missed questions
否定\tNegation
時間・条件\tTime and conditions
場所・量\tPlace and amount
関係・言い直し\tRelations and corrections
省略・未確認\tOmissions and unknowns
まず、文字を見ずに聞く\tListen before reading
聞き取れなければ、字幕を使ってかまいません。\tUse the transcript if you need help.
このことばを聞く\tListen to this phrase
字幕を表示\tShow Japanese transcript
聞こえたことば・気になった部分（任意）\tWords you heard or noticed (optional)
例：最後が『いらない』に聞こえた\tFor example: the last word sounded like 'iranai'.
この発言から、わかることは？\tWhat do these words tell you?
意味を確かめる\tCheck the meaning
違いを捉えられました\tYou noticed the difference
決め手のことばを、もう一度\tListen to the key words again
手がかり：\tKey words: 
聞き返しの例：\tA way to check: 
あなたのメモ：\tYour note: 
似た発言と、比べて聞く\tCompare two similar phrases
次の問題\tNext question
字幕なしでもう一度\tTry again without the transcript
このテーマの最後の問題です。別のテーマか、間違えた問題を選んで続けられます。\tThis is the last question in this set. Choose another theme or review missed questions.
前の問題\tPrevious question
問題をスキップ\tSkip this question
名詞だけで、決めない。\tDo not decide from nouns alone.
何の話かが聞こえても、希望や時間はまだ違うかもしれません。否定と、言い直した後のことばまで聞きます。\tKnowing the topic is not enough. Listen for negation, time, and what follows a correction.
5つの聞きどころ\tFive listening focuses
このテーマに、間違えた問題はありません。\tNo missed questions in this theme.
すべての問題を練習する\tPractise all questions
前回：\tPrevious: 
正解\tCorrect
要復習\tReview needed
字幕の補助あり\tTranscript used
回答前の字幕なし\tNo transcript before answering
 回回答\t attempts
 問\t questions
問題 \tQuestion 
このブラウザーでは記録を保存できません。終了前に「教材を育てる」から書き出してください。\tRecords cannot be saved in this browser. Export them from the Workshop before closing.
この会話の練習を記録しました。\tLesson saved.
音声ファイルを選んでください。\tChoose an audio file.
20MB以下の音声を選んでください。\tChoose an audio file no larger than 20 MB.
録音をこのブラウザーに保存しました。\tAudio saved in this browser.
音声を保存できません。ブラウザーの保存容量や設定を確認してください。\tAudio could not be saved. Check browser storage and settings.
追加した録音に切り替えました。\tSwitched to added audio.
読み上げに切り替えました。録音は保存されています。\tSwitched to device speech. Your audio file is still saved.
音声の設定を保存できませんでした。\tAudio settings could not be saved.
音声を再生できません。対応したMP3・WAV・M4Aなどを選んでください。\tThis audio cannot be played. Try a supported MP3, WAV, or M4A file.
音声を再生できませんでした。もう一度押してください。\tPlayback failed. Please try again.
このブラウザーで日本語の読み上げが使えません。字幕を表示するか、録音音声を追加してください。\tJapanese device speech is unavailable. Show the transcript or add an audio file.
読み上げを再生できませんでした。字幕でも練習できます。\tDevice speech could not play. You can practise with the transcript.
教材と学習記録を書き出しました。録音は含まれません。\tLessons and learning records exported. Audio is not included.
2MB以下の教材ファイルを選んでください。\tChoose a lesson JSON file no larger than 2 MB.
このサイトから書き出した教材JSONを選んでください。\tChoose lesson JSON exported from this site.
英語ヒント以外の項目をすべて入力してください。\tComplete every field except the optional English hint.
下書きを保存しました。内容を確認してから練習に加えられます。\tDraft saved. Review it before adding it to practice.
確認した方の名前または役割を入力してください。\tEnter the reviewer's name or role.
このブラウザーの練習に加えました。\tAdded to this browser's lessons.
追加教材\tCustom lesson
教材を育てる画面から、別の言い方を含む教材も追加できます。\tYou can add other ways of speaking in the Workshop.
回答時に記録されます。正解数は各問題の直近の初回回答で、字幕の使用も残します。自作の練習例・現場監修待ち。読み上げは高齢者の発音を再現したものではありません。\tAnswers are saved on checking. Counts reflect the first answer in the latest attempt for each question. Transcript use is recorded. Authored samples await professional review. Device speech does not reproduce older people's individual pronunciation.`;
export const dictionary:Record<string,string>={...scenarioDictionary,...drillDictionary,...Object.fromEntries(ui.replaceAll('\\t','\t').split('\n').filter(Boolean).map(line=>{const i=line.indexOf('\t');return [line.slice(0,i),line.slice(i+1).replaceAll('\\n','\n')];}))};
const japaneseTargets=new Set([...scenarios.flatMap(s=>[s.utterance,...s.keywords,...s.distractors,...s.variants,...s.clarification.map(c=>c.reply||'')]),...drills.map(d=>d.utterance)]);
const parts=Object.keys(dictionary).filter(k=>k.length>3&&!japaneseTargets.has(k)).sort((a,b)=>b.length-a.length);
export function translate(text:string,language:Language):string{if(language==='ja')return jaExtras[text]||text;if(japaneseTargets.has(text))return text;if(dictionary[text])return localText(dictionary[text],language);let value=text;for(const k of parts){if(value.includes(k))value=value.replaceAll(k,localText(dictionary[k],language));}return localText(value,language);}
export function localize(node:ReactNode,language:Language):ReactNode{if(typeof node==='string')return translate(node,language);if(Array.isArray(node))return node.map(n=>localize(n,language));if(!isValidElement(node))return node;const element=node as ReactElement<Record<string,unknown>>;if(element.props['data-japanese']||element.props['data-no-translate'])return node;const props:Record<string,unknown>={};for(const key of ['aria-label','alt','placeholder','title'])if(typeof element.props[key]==='string')props[key]=translate(element.props[key] as string,language);if(element.props.children!==undefined)props.children=Children.map(element.props.children as ReactNode,c=>localize(c,language));return cloneElement(element,props);}
