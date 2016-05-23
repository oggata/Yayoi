var CONFIG = CONFIG || {};

CONFIG.FONT = "HiraKakuProN-W6";
CONFIG.VISIBLE_MIN_PEOPLE_CNT = 3;
CONFIG.VISIBLE_MAX_PEOPLE_CNT = 30;
CONFIG.PEOPLE_DEAD_SECOND = 6;
CONFIG.PEOPLE_EAT_FOOD_RATE = 3;
CONFIG.TAX_PER_PEOPLE = 4;
CONFIG.DEBUG_ADD_AMOUNT = 0;
CONFIG.MAX_AMOUNT = 300;
CONFIG.CYCLE_SECOND = 60 * 1 * 1.5;
//CONFIG.CYCLE_SECOND = 10 * 1 * 1.5;
CONFIG.CYCLE_BACKGROUND_SECOND = 60 * 1 * 60 * 2;
CONFIG.ITEM_MONEY_AMOUNT = 30;
CONFIG.ITEM_FOOD_AMOUNT = 1;
CONFIG.ITEM_DOKI_AMOUNT = 1;
CONFIG.ITEM_ILL_AMOUNT = 5;
CONFIG.FOOD_AMOUNT_FOR_HAVE_PERSON = 5;
CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR = 1;

CONFIG.SHOP_PLODUCT_LIST_FOOD  = ["f_i001_lv1_a90", null, null, "f_i004_lv1_a90", "f_i005_lv1_a90", null, null, null, null];
CONFIG.SHOP_PLODUCT_LIST_HOUSE = ["h_i001_lv1_a90", "h_i002_lv1_a90", "h_i003_lv1_a90", null, null, null, null, null, null];
CONFIG.SHOP_PLODUCT_LIST_SAFE  = ["s_i001_lv1_a90", "s_i002_lv1_a90", "s_i003_lv1_a90", null, null, null, null, null, null];

CONFIG.SHOP_PRODUCT_ITEM_MASTER = [
	{"id":"f_i001_lv1_a90","lv":1,"name" :"水田",    "description":"食料+3","item":"res/f_001.png","map_chip":"res/f_i001_lv1_a90.png","food":3,  "maxFood":0, "house":0,  "safe":0, "amount":100 ,"maxAmount" : 0},
	{"id":"f_i002_lv1_a90","lv":1,"name" :"水田",    "description":"食料+1","item":"res/f_002.png","map_chip":"res/f_i002_lv1_a90.png","food":1,  "maxFood":0, "house":0,  "safe":0, "amount":100 ,"maxAmount" : 0},
	{"id":"f_i003_lv1_a90","lv":1,"name" :"水田",    "description":"食料+1","item":"res/f_003.png","map_chip":"res/f_i003_lv1_a90.png","food":1,  "maxFood":0, "house":0,  "safe":0, "amount":100 ,"maxAmount" : 0},
	{"id":"f_i004_lv1_a90","lv":1,"name" :"高床式倉庫A",     "description":"備蓄+10","item":"res/f_004.png","map_chip":"res/f_i004_lv1_a90.png","food":0,  "maxFood":5, "house":0,  "safe":0, "amount":200 ,"maxAmount" : 0},
	{"id":"f_i005_lv1_a90","lv":1,"name" :"高床式倉庫B",     "description":"備蓄+20","item":"res/f_005.png","map_chip":"res/f_i005_lv1_a90.png","food":0,  "maxFood":10, "house":0,  "safe":0, "amount":300 ,"maxAmount" : 0},
	{"id":"f_i006_lv1_a90","lv":1,"name" :"",               "description":"備蓄+100","item":"res/f_006.png","map_chip":"res/f_i006_lv1_a90.png","food":0,  "maxFood":100, "house":0,  "safe":0, "amount":1000 ,"maxAmount" : 0},
	{"id":"f_i007_lv1_a90","lv":1,"name" :"",               "description":"","item":"res/f_007.png","map_chip":"res/f_i007_lv1_a90.png","food":0,  "maxFood":0, "house":0,  "safe":0, "amount":100 ,"maxAmount" : 0,"maxAmount" : 0},
	{"id":"f_i008_lv1_a90","lv":1,"name" :"",               "description":"","item":"res/f_008.png","map_chip":"res/f_i008_lv1_a90.png","food":0,  "maxFood":0, "house":0,  "safe":0, "amount":100 ,"maxAmount" : 0,"maxAmount" : 0},
	{"id":"f_i009_lv1_a90","lv":1,"name" :"",               "description":"","item":"res/f_009.png","map_chip":"res/f_i009_lv1_a90.png","food":0,  "maxFood":0, "house":0,  "safe":0, "amount":100 ,"maxAmount" : 0,"maxAmount" : 0},

	{"id":"h_i001_lv1_a90","lv":1,"name" :"住居A",          "description":"住居+5人","item":"res/h_001.png","map_chip":"res/h_i001_lv1_a90.png","food":0, "maxFood":0,  "house":5,  "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"h_i002_lv1_a90","lv":1,"name" :"住居B",          "description":"住居+10人","item":"res/h_002.png","map_chip":"res/h_i002_lv1_a90.png","food":0, "maxFood":0,  "house":10,  "safe":0, "amount":200,"maxAmount" : 0},
	{"id":"h_i003_lv1_a90","lv":1,"name" :"住居C",          "description":"住居+15人","item":"res/h_003.png","map_chip":"res/h_i003_lv1_a90.png","food":0, "maxFood":0,  "house":15,  "safe":0, "amount":300,"maxAmount" : 0},
	{"id":"h_i004_lv1_a90","lv":1,"name" :"","description":"","item":"res/h_004.png","map_chip":"res/h_i004_lv1_a90.png","food":0, "maxFood":0,  "house":0,  "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"h_i005_lv1_a90","lv":1,"name" :"","description":"","item":"res/h_005.png","map_chip":"res/h_i005_lv1_a90.png","food":0, "maxFood":0,  "house":0,  "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"h_i006_lv1_a90","lv":1,"name" :"","description":"","item":"res/h_006.png","map_chip":"res/h_i006_lv1_a90.png","food":0, "maxFood":0,  "house":0,  "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"h_i007_lv1_a90","lv":1,"name" :"","description":"","item":"res/h_007.png","map_chip":"res/h_i007_lv1_a90.png","food":0, "maxFood":0,  "house":0,  "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"h_i008_lv1_a90","lv":1,"name" :"","description":"","item":"res/h_008.png","map_chip":"res/h_i008_lv1_a90.png","food":0, "maxFood":0,  "house":0,  "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"h_i009_lv1_a90","lv":1,"name" :"","description":"","item":"res/h_009.png","map_chip":"res/h_i009_lv1_a90.png","food":0, "maxFood":0,  "house":0,  "safe":0, "amount":100,"maxAmount" : 0},

	{"id":"s_i001_lv1_a90","lv":1,"name" :"みはり台",      "description":"最大出撃P+1","item":"res/s_001.png","map_chip":"res/s_i001_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":1, "amount":100,"maxAmount" : 0},
	{"id":"s_i002_lv1_a90","lv":1,"name" :"ものみやぐらA",   "description":"最大出撃P+3","item":"res/s_002.png","map_chip":"res/s_i002_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":3, "amount":200,"maxAmount" : 0},
	{"id":"s_i003_lv1_a90","lv":1,"name" :"ものみやぐらB",   "description":"最大出撃P+6","item":"res/s_003.png","map_chip":"res/s_i003_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":6, "amount":300,"maxAmount" : 0},
	{"id":"s_i004_lv1_a90","lv":1,"name" :"ものみやぐらB",   "description":"治安+30","item":"res/s_004.png","map_chip":"res/s_i004_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":0, "amount":300,"maxAmount" : 0},
	{"id":"s_i005_lv1_a90","lv":1,"name" :"","description":"","item":"res/s_005.png","map_chip":"res/s_i001_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":0, "amount":100,"maxAmount" : 0},
	{"id":"s_i006_lv1_a90","lv":1,"name" :"","description":"","item":"res/s_006.png","map_chip":"res/s_i001_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":0, "cost":5, "amount":100,"maxAmount" : 0},
	{"id":"s_i007_lv1_a90","lv":1,"name" :"","description":"","item":"res/s_007.png","map_chip":"res/s_i001_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":0, "cost":5, "amount":100,"maxAmount" : 0},
	{"id":"s_i008_lv1_a90","lv":1,"name" :"","description":"","item":"res/s_008.png","map_chip":"res/s_i001_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":0, "cost":5, "amount":100,"maxAmount" : 0},
	{"id":"s_i009_lv1_a90","lv":1,"name" :"","description":"","item":"res/s_009.png","map_chip":"res/s_i001_lv1_a90.png","food":0, "maxFood":0,  "house":0,   "safe":0, "cost":5, "amount":100,"maxAmount" : 0},
];

CONFIG.REWARD_LIST = [
	{
        id: 1,
        title: "住民の数を30人にする",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 2,
        title: "住民の数を50人にする",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 3,
        title: "住民の数を100人にする",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 4,
        title: "住民の数を500人にする",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 5,
        title: "住民の数を1000人にする",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 6,
        title: "建物を10個建築する",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 7,
        title: "建物を50個建築する",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 8,
        title: "建物を100個建築する",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 9,
        title: "建物を300個建築する",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 10,
        title: "敵を10体倒す",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 11,
        title: "敵を50体倒す",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 12,
        title: "敵を100体倒す",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    }, {
        id: 13,
        title: "敵を300体倒す",
        isCleared: 0,
        reward: 100,
        image: "icon_reward.png"
    },
];

CONFIG.MONTHLY_MESSAGE  = [
	'{0}年{1}月になりました....................',
	'',
	'祟鬼の討伐数 x{2} <ポイント*10>',
	'収穫した食料 x{3} <ポイント*2>',
	'増加した人口 x{4} <ポイント*10>',
	'死亡した人口 x{5} <ポイント*-10>',
	'',
	'獲得したボーナス {6}',
].join("\n");

CONFIG.TUTORIAL_TITLE_001 = "";
CONFIG.TUTORIAL_MESSAGE_001  = [
	[
		'ここは戦乱の地、「邪馬台国」である。',
		'私はこの土地に生まれ、この土地を統治する',
		'運命にある者...',
		'名を......卑弥呼という.',
		'',
		'',
		'',
	].join("\n"),
	[
		'邪馬台国は稲穂の豊かに実る場所...',
		'今は見ての通り、わずかな人々が暮らす国だが、',
		'私はこの豊かな場所に、作物を育て、住処を作り、',
		'家族と共に安心して暮らすことができる',
		'大国を築きたいと思っている.',
		'',
		'',
	].join("\n"),
	[
		'今はまだ、わずかな力しか無いが',
		'この国の発展と共に集められる',
		'莫大な大地のエネルギーによって',
		'強大な力を得ることができると思っている.',
		'',
		'',
		'',
	].join("\n"),
	[
		'それまでは',
		'この国に住む民のためにも、わらわのためにも',
		'そなたの力を貸して欲しい.....',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'いま、この地は、安定して食料を得ることができず',
		'民たちは、日々、飢餓と戦っている.',
		'田を作ることができれば、民たちは今のように',
		'食料に困ることはなくなるはずじゃ',
		'',
		'',
		'',
	].join("\n"),
	[
		'右下にある建設メニューから「水田」を選んで',
		'住居の近くに設置してほしい.',
		'水田を設置後、すこし時間がたてば「稲穂」が実り、',
		'住民たちが収穫を行い、食料となるだろう.',
		'住民は住居の遠くまでは歩かない故',
		'なるべく住居の近くに水田を置いて欲しい.',
		'',
	].join("\n"),
	[
		'食料が溜まったら次の指示をする.',
		'頼んだぞ...',
		'',
	].join("\n"),
];

CONFIG.TUTORIAL_TITLE_002 = "水田の作成と住民の収穫";
CONFIG.TUTORIAL_MESSAGE_002  = [
	[
		'稲穂が実り、住民が作物を収穫することが',
		'できたようじゃな..',
		'',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'さて、食料がある程度確保できたら、',
		'次は住民を増やしたいと思っている.',
		'住居を選択して、「住民を増やす」ボタンを',
		'何度か押して、住民を5人まで増やして欲しい',
		'',
		'',
		'',
	].join("\n"),
	[
		'住民を増やすには「食料」が必要じゃ.',
		'足りなくなったら水田を増やして食料を',
		'確保しながら住民を増やすようにしてほしい.',
		'...頼んだぞ....',
		'',
		'',
	].join("\n"),
];

CONFIG.TUTORIAL_TITLE_003 = "住民を5人にする";
CONFIG.TUTORIAL_MESSAGE_003  = [
	[
		'なんとか住民を5人まで増やすことが',
		'できたようじゃな..',
		'',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'さて、今の住居の数では',
		'すこし手狭になってきてしまったようじゃ.',
		'次は「住居」を建設してくれぬか',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'右下の建設メニューから',
		'「住居」を選択して、好きな場所に設置してほしい...',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'住居を作ったら、次の指示を出す.',
		'頼んだぞ...',
		'',
		'',
		'',
		'',
		'',
	].join("\n"),
];

CONFIG.TUTORIAL_TITLE_004 = "住居をつくる";
CONFIG.TUTORIAL_MESSAGE_004  = [
	[
		'住居の建設が終わったようじゃな.',
		'住居の容量を超えて、住民を住まわせると',
		'ストレスになってしまう.',
		'住民の数よりもすこし多めの',
		'住居を確保しておくとよいじゃろう.',
		'',
		'',
	].join("\n"),
	[
		'さて、次は高床式倉庫を建設してもらおう',
		'倉庫は食料を貯めておくうえで',
		'重要な施設になるのじゃ.',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'右下の建設メニューから',
		'高床式倉庫を選択して',
		'好きな場所に設置してくれ.',
		'',
		'',
		'',
		'',
	].join("\n"),
];

CONFIG.TUTORIAL_TITLE_005 = "高床式倉庫をつくる";
CONFIG.TUTORIAL_MESSAGE_005  = [
	[
		'立派な高床式倉庫が建設されたようじゃ',
		'食料は今後も色々な用途に使うことが',
		'ある.',
		'余裕のあるうちに、食料を蓄えることは',
		'とても大事じゃ.',
		'',
		'',
	].join("\n"),
	[
		'.........',
		'.........',
		'.........',
		'.........',
		'.........',
		'',
		'',
	].join("\n"),
	[
		'困ったな...',
		'マップ上に「祟鬼」が現れてしまったようじゃ.',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'「祟鬼」とは、病や災いを呼ぶ魔物.',
		'触れた住民は、即死または',
		'その他にひどい災いが訪れるという...',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'「祟鬼」を討伐するためには',
		'邪馬台国の戦士を向わせる必要がある...',
		'建設メニューの「治安」から、',
		'見張り台を1つ選んで設置してくれぬか',
		'',
		'',
		'',
	].join("\n"),
	[
		'見張り台はいわゆる',
		'戦士たちの出撃場所になる場所じゃ.',
		'建物を建てた後、',
		'この場所から戦士たちが出撃していくことになる',
		'戦士たちが徒歩で歩ける距離はそう遠くはない故、',
		'村の中心の近くにつくるか、',
		'祟鬼の近くにつくるのが良いじゃろう.',
	].join("\n"),
];

CONFIG.TUTORIAL_TITLE_006 = "見張り台をつくる";
CONFIG.TUTORIAL_MESSAGE_006  = [
	[
		'見張り台が建設されたようじゃな',
		'それではいよいよ「祟鬼」の討伐隊を',
		'出撃させてくれ.',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'祟鬼を選択し、',
		'出撃ボタンを押すと、見張り台から、',
		'戦士が出撃していくじゃろう.',
		'あまりにも遠いと',
		'途中で戦士たちは帰ってしまう故、',
		'十分にひきつけてから向わせるのが良いじゃろう.',
		'',
	].join("\n"),
	[
		'戦士の出撃には、その数に応じて「食料」と',
		'出撃ポイントが消費されるから注意が必要.',
		'となるから、十分に貯めてから',
		'挑むのが良いじゃろう.',
		'',
		'',
		'',
	].join("\n"),
	[
		'出撃ポイントは右上の緑色のバーで',
		'表示され、兵士が出撃されると減っていく.',
		'時の経過と共に、出撃パワーは',
		'満タンに戻るが、すぐには戻らないから',
		'敵を討伐するにも優先順位をつけねば',
		'ならないぞ',
		'',
	].join("\n"),
];

CONFIG.TUTORIAL_TITLE_007 = "祟鬼を討伐する";
CONFIG.TUTORIAL_MESSAGE_007  = [
	[
		'祟鬼を無事撃破することができたようじゃな..',
		'',
		'',
		'',
		'',
		'',
		'',
	].join("\n"),
	[
		'さて、一通りの操作については',
		'これまで説明してきた通りじゃ.',
		'住民たちの幸福を第一に考え、時には',
		'祟鬼などの災いと戦いながら',
		'この国を大国へと導いて欲しい.',
		'',
		'',
	].join("\n"),
	[
		'頼んだぞ....',
		'',
		'',
		'',
		'',
		'',
		'',
	].join("\n"),
];
