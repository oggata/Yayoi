//
//  CutIn.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var CutIn = cc.Node.extend(
{
    ctor : function (game) 
    {
        this._super();
        this.effectTime = 0;
        this.game = game;
/*
        this.bgLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.2), 640, 1400);
        this.addChild(this.bgLayer);
*/
        //Himiko_png
        this.himikoSprite = cc.Sprite.create(res.Himiko_png);
        this.addChild(this.himikoSprite);
        this.himikoSprite.setPosition(600, this.game.viewSize.height / 2 - 70);

        this.messageSprite = cc.Sprite.create(res.Window_Message_png);
        this.messageSprite.setPosition(320,this.game.viewSize.height/2);
        this.addChild(this.messageSprite);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 23);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.setPosition(80,400);
        this.messageLabel.setAnchorPoint(0,1);
        this.messageLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.messageSprite.addChild(this.messageLabel);

        var button = new cc.MenuItemImage(res.Info_Ok_Button_png, res.Info_Ok_Button_On_png, function() {
            this.setVisible(false);
        }, this);
        button.setPosition(320, 50);
        var menu = new cc.Menu(button);
        menu.setPosition(0, 0);
        this.messageSprite.addChild(menu);

        this.setCutInVisible(false);

        this.tmpPosY = this.getPosition().y;
        this.spriteOpacity = 0;

        this.cutInText = "";
        this.messageTime = 0;
        this.visibleStrLenght = 0;

        this.setVisible(false);
    },

    update : function () 
    {
        if(this.isVisible() == true){
            this.messageTime++;
            if(this.messageTime >= 1)
            {
                this.messageTime = 0;
                this.visibleStrLenght++;
            }
            if(this.visibleStrLenght >= this.cutInText.length)
            {
                this.visibleStrLenght = this.cutInText.length;
            }
            var _visibleString = this.cutInText.substring(0,this.visibleStrLenght);
            this.messageLabel.setString(_visibleString);
            this.messageLabel.setAnchorPoint(0,1);
        }

        if(this.tmpPosY < this.getPosition().y && this.effectTime < 30*1.5)
        {
            this.spriteOpacity+=0.1;
            if(this.spriteOpacity >= 1)
            {
                this.spriteOpacity = 1;
            }
            this.setPosition(
                this.getPosition().x,this.getPosition().y - 5
            );
        }

        if (this.effectTime >= 30*1.5)
        {
            this.spriteOpacity-=0.1;
            if(this.spriteOpacity < 0)
            {
                this.spriteOpacity = 0;
            }
        }
        if (this.effectTime >= 30*20) 
        {
            this.setCutInVisible(false);
        }
        this.effectTime++;
        this.setOpacity(this.spriteOpacity);
    },

    setCutInText : function (text)
    {
        this.setPosition(
            this.getPosition().x,this.tmpPosY + 50
        );
        this.effectTime = 0;
        this.setCutInVisible(true);
        //this.message.setString(text);
        this.cutInText = text;
        this.spriteOpacity = 0;
        this.visibleStrLenght = 0;
    },

    setCutInVisible : function (isTrue)
    {
        if (isTrue) {
            this.setVisible(true);
        }
        else {
            this.setVisible(false);
        }
    },
});