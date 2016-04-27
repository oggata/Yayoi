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
/*
        this.bgLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.6), 640, 1400);
        this.addChild(this.bgLayer);
*/
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
        this.isStartSendMessage = false;

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
            }
        }, this);
        nextButton.setPosition(280, -50);
        var menu = new cc.Menu(nextButton);
        menu.x = 0;
        menu.y = 0;
        this.messageSprite.addChild(menu, 1);
        this.setPosition(500,0);
    },

    update: function() {

        if(this.messages.length > 0){
            this.setPosition(this.getPosition().x - 30,0);
            this.setVisible(true);
            if(this.getPosition().x <= 0)
            {
                this.setPosition(0,0);
                this.isStartSendMessage = true;
            }
        }else{
            this.setPosition(this.getPosition().x + 30,0);
            if(this.getPosition().x >= 500)
            {
                this.setVisible(false);
            }
        }

        if(this.isVisible() == false)
        {
            this.setPosition(500,0);
            this.isStartSendMessage = false;
        }

        if (this.game.storage.tutorialNum == 1 && this.messages.length == 0
            ) {
            this.messages = CONFIG.TUTORIAL_MESSAGE_001;
            this.game.mapManager.amount += 50;
        }
        if (this.game.storage.tutorialNum == 2 && this.messages.length == 0
            && this.game.mapManager.food >= 3) {
            this.messages = CONFIG.TUTORIAL_MESSAGE_002;
            this.game.mapManager.amount += 50;
        }
        if (this.game.storage.tutorialNum == 3 && this.messages.length == 0
            && this.game.mapManager.maxHouse >= 6) {
            this.messages = CONFIG.TUTORIAL_MESSAGE_003;
            this.game.mapManager.amount += 50;
        }
        if (this.game.storage.tutorialNum == 4 && this.messages.length == 0
            && this.game.mapManager.maxFood >= 10) {
            this.messages = CONFIG.TUTORIAL_MESSAGE_004;
            this.game.mapManager.amount += 50;
        }
        if (this.game.storage.tutorialNum == 5 && this.messages.length == 0
            && this.game.mapManager.maxSafe >= 3) {
            this.messages = CONFIG.TUTORIAL_MESSAGE_005;
            this.game.mapManager.amount += 50;
        }
        if (this.game.storage.tutorialNum == 6 && this.messages.length == 0
            && this.game.mapManager.killedEnemyCount >= 1) {
            this.messages = CONFIG.TUTORIAL_MESSAGE_006;
            this.game.mapManager.amount += 50;
        }

        if (this.game.storage.tutorialNum == 1){
            this.game.header.missionLabel.setString(CONFIG.TUTORIAL_TITLE_001);
        }
        if (this.game.storage.tutorialNum == 2){
            this.game.header.missionLabel.setString(CONFIG.TUTORIAL_TITLE_002);
        }
        if (this.game.storage.tutorialNum == 3){
            this.game.header.missionLabel.setString(CONFIG.TUTORIAL_TITLE_003);
        }
        if (this.game.storage.tutorialNum == 4){
            this.game.header.missionLabel.setString(CONFIG.TUTORIAL_TITLE_004);
        }
        if (this.game.storage.tutorialNum == 5){
            this.game.header.missionLabel.setString(CONFIG.TUTORIAL_TITLE_005);
        }
        if (this.game.storage.tutorialNum == 6){
            this.game.header.missionLabel.setString(CONFIG.TUTORIAL_TITLE_006);
        }

        if (this.messages.length >= 1 && this.isStartSendMessage == true) {
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