//
//  Introduction.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Introduction = cc.Node.extend({
    ctor: function(game) {
        this._super();
        this.tutorialIsVisible = false;
        this.pageNum = 1;
        this.game = game;
        this.storage = this.game.storage;

        this.bgLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.6), 640, 1400);
        this.addChild(this.bgLayer);

        this.himikoSprite = cc.Sprite.create(res.Himiko_png);
        this.addChild(this.himikoSprite);
        this.himikoSprite.setPosition(400, this.game.viewSize.height / 2 - 100);

        this.messageSprite = cc.Sprite.create(res.Himiko_Message_png);
        this.addChild(this.messageSprite);
        this.messageSprite.setPosition(320, this.game.viewSize.height / 2 - 150);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 20);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.messageLabel.setAnchorPoint(0, 1);
        this.messageLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.messageSprite.addChild(this.messageLabel);
        this.messageLabel.setPosition(50, 220);
        this.visibleStrLenght = 0;
        this.messageTime = 0;
        this.messages = [];

        var nextButton = new cc.MenuItemImage(res.Info_Ok_Button_png, res.Info_Ok_Button_On_png, function() {
            if (this.messages.length > 1) {
                this.visibleStrLenght = 0;
                this.messages.splice(0, 1);
            } else {
                this.visibleStrLenght = 0;
                this.messages.splice(0, 1);
                this.game.storage.tutorialNum = Math.ceil(this.game.storage.tutorialNum + 1);
                this.game.storage.saveLastUpdateTime();
                this.visibleStrLenght = 0;
                this.setVisible(false);
            }
        }, this);
        nextButton.setPosition(280, -50);
        var menu = new cc.Menu(nextButton);
        menu.x = 0;
        menu.y = 0;
        this.messageSprite.addChild(menu, 1);
    },

    update: function() {

        if (this.storage.tutorialNum == 2) {
            this.game.header.missionLabel.setString("田の設置と住民が収穫するまで");
        }
        if (this.storage.tutorialNum == 3) {
            this.game.header.missionLabel.setString("倉庫の設置を行い食料の上限を増やす");
        }
        if (this.storage.tutorialNum == 4) {
            this.game.header.missionLabel.setString("住居の設置を行い移住者を迎え入れる");
        }
        if (this.storage.tutorialNum == 5) {
            this.game.header.missionLabel.setString("災いから住民を守る監視塔の設置");
        }
        if (this.storage.tutorialNum == 6) {
            this.game.header.missionLabel.setString("邪馬台国の目標人数30人");
        }
        if (this.storage.tutorialNum == 7) {
            this.game.header.missionLabel.setString("邪馬台国の目標人数50人");
        }
        if (this.storage.tutorialNum == 8) {
            this.game.header.missionLabel.setString("邪馬台国の目標人数80人");
        }
        if (this.storage.tutorialNum == 9) {
            this.game.header.missionLabel.setString("");
        }
        if (this.storage.tutorialNum >= 10) {
            this.game.header.missionLabel.setString("");
        }

        //tutorial 1
        if (this.game.storage.tutorialNum == 1 && this.messages.length == 0) {
            this.setVisible(true);
            this.messages = [
                "ここは戦乱の地、「邪馬台国」である。\n" + "私はこの土地に生まれ、この土地を統治する\n運命にある者。\n" + "名を......卑弥呼という。\n" + "",

                "邪馬台国は稲穂の豊かに実る場所...\n" + "今は見ての通り、わずかな人々が暮らす国だが、\n" + "私はこの豊かな場所に、作物を育て、住処を作り、\n" + "家族を作り、子を産み...安心し暮らすことができる\n" + "大きな国をつくりたいと思っている.",

                "今、私には何の力もがないが\n" + "この国の発展と共に、\n" + "大地のエネルギーを集め、神に祈ることで、\n" + "まじないの力を取り戻すことができるはずじゃ.\n" + "",

                "それまでそなたの助けを借りたいと思っているが\n" + "この国に住む民のためにも、わらわのためにも\n" + "力を貸して欲しい.....\n" + "",

                "さっそくだが、\n" + "いま、この地は、安定的に食料を得ることができず\n" + "民たちは、日々困っている.\n" + "水田を作ることができれば、\n食料を得ることができると思うのだが、\n" + "住民のために田を作って欲しい.",

                "右下の建物建築用のメニューから\n" + "「食料」のタブに入っている「田」を一つ選んで\n" + "住民が収穫しやすいように住居の近くに\n" + "設置してほしい.\n"
            ];
            this.game.mapManager.amount += 50;
        }

        //tutorial 2
        if (this.game.storage.tutorialNum == 2 && this.messages.length == 0 && this.game.mapManager.food >= 1) {
            this.setVisible(true);
            this.messages = [
                "水田の設置完了し、無事収穫を終えたようじゃな.\n",

                "収穫することで食料をえることが\n" + "できるようになったが、十分な倉庫がなければ\n" + "大切な穀物を保管しておくことができない.\n",

                "右下の建物建築用のメニューから\n" + "「食料」のタブに入っている「倉庫」を一つ選んで\n" + "設置してほしい."
            ];
            this.game.mapManager.amount += 100;
        }

        if (this.game.storage.tutorialNum == 3 && this.messages.length == 0 && this.game.mapManager.maxFood >= 3) {
            this.setVisible(true);
            this.messages = [
                "貯蔵庫の設置完了したようじゃな.\n",

                "食料が安定的に確保できるようになったら\n" + "次は住居じゃ.\n" + "近隣の村から邪馬台国に移り住んでくるから\n" + "常に住居の確保が必要になってくる.\n",

                "右下の建物建築用のメニューから\n" + "「住居」のタブに入っている建物を一つ選んで\n" + "設置してほしい."
            ];
            this.game.mapManager.amount += 100;
        }

        if (this.game.storage.tutorialNum == 4 && this.messages.length == 0 && this.game.mapManager.maxHouse >= 11) {
            this.setVisible(true);
            this.messages = [
                "住居を設置完了したようじゃな.\n",

                "最近では、病気や盗賊など治安を脅かす脅威が\n" + "邪馬台国で起きているようじゃ\n" + "脅威に脅かされたときに\n" + "治安を平定することは必要じゃ.\n",

                "右下の建物建築用のメニューから\n" + "「治安」のタブに入っている建物を一つ選んで\n" + "設置してほしい."
            ];
            this.game.mapManager.amount += 100;
        }


        if (this.game.storage.tutorialNum == 5 && this.messages.length == 0 && this.game.mapManager.safe >= 1) {
            this.setVisible(true);
            this.messages = [
                "「治安」の設置が完了したようじゃな.\n",

                "これまで食料、住居、治安と3つの\n" + "建物をつくってもらったが、住民の移住に伴い\n" + "これらを必要なときに、必要なだけ確保せなばならない.\n",

                "上手にバランスをとることで\n" + "住民たちの幸福度は上がり、\n" + "邪馬台国で生活していく人々も増えるじゃろう.\n",

                "さぁ、次は邪馬台国で暮らす人々が\n" + "30人を超えるように工夫をしてみて欲しい.\n" + "頼んだぞ.....\n"
            ];
            this.game.mapManager.amount += 100;
        }

        if (this.game.storage.tutorialNum == 6 && this.messages.length == 0 && this.game.mapManager.population >= 30) {
            this.setVisible(true);
            this.messages = [
                "住民が30人に増えたようじゃな.\n",

                "まだ大国というには程遠い人数ではあるが、\n" + "最初の難関を突破し、もっとこの国を\n" + "成長させる段階に突入したといえよう.\n",

                "次は住民の数が\n" + "50人を超えることが目標じゃ.\n" + "頼んだぞ.....\n"
            ];
            this.game.mapManager.amount += 100;
        }

        if (this.game.storage.tutorialNum == 7 && this.messages.length == 0 && this.game.mapManager.population >= 50) {
        }

        if (this.game.storage.tutorialNum == 8 && this.messages.length == 0 && this.game.mapManager.population >= 80) {
        }

        if (this.game.storage.tutorialNum == 9 && this.messages.length == 0 && this.game.mapManager.population >= 100) {
        }

        if (this.messages.length >= 1) {
            this.messageTime++;
            if (this.messageTime >= 1) {
                this.messageTime = 0;
                this.visibleStrLenght++;
            }
            if (this.visibleStrLenght >= this.messages[0].length) {
                this.visibleStrLenght = this.messages[0].length;
            }
            var _visibleString = this.messages[0].substring(0, this.visibleStrLenght);
            this.messageLabel.setString(_visibleString);
        }
    },
});