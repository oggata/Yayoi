//
//  ButtonSprite.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var ButtonSprite = cc.Node.extend(
{
    ctor : function (title, w, h, execute, current, pTag) 
    {
        this._super();
        var tag = pTag || 1;
        //this.back = cc.Scale9Sprite.create(s_button001_scale9);
        //this.addChild(this.back);
        //this.back.setPosition(0,0);
        //this.back.setContentSize(w,h);
        // new game
        this.label = cc.LabelTTF.create(title, "Arial", 14);
        this.label.setFontFillColor(cc.c4b(255, 255, 255, 255));
        //this.label.enableStroke(cc.c4b(0,0,0,255),2,true);
        this.button = cc.MenuItemLabel.create( this.label, execute, current );
        this.button.setPosition(0, 0);
        this.button.setTag(tag);
        var menu = cc.Menu.create( this.button );
        menu.setPosition(0, 0);
        this.addChild(menu);
    },
    set_visible : function (isVisible)
    {
        this.back.setVisible(isVisible);
        this.button.setVisible(isVisible);
    }
});

var ImageButtonSprite = cc.Node.extend(
{
    ctor : function (title, w, h, execute, current, stageNum, opacity) 
    {
        this._super();
        //var tag = pTag || 1;
        var titleButton = new cc.MenuItemImage( res.Stage_png, res.StageOn_png, function () 
        {
            current.goToTown(stageNum);
        }, current);
        //titleButton.setPosition(0,0);
        titleButton.setAnchorPoint(0.5, 0.5);
        titleButton.setOpacity(opacity);
        //this.titleLabel = cc.LabelTTF.create(title, "Arial", 25);
        this.titleLabel = cc.LabelTTF.create(stageNum, "Arial", 100);
        this.titleLabel.setAnchorPoint(0.5, 0.5);
        this.titleLabel.setPosition(120,50);
        this.titleLabel.setFontFillColor(new cc.Color(250, 250, 250, 255));
        this.titleLabel.enableStroke(new cc.Color(169, 169, 169, 255), 5, true);
/*
        this.gaugeLabel.setFontFillColor(new cc.Color(250, 250, 250, 255));
        this.gaugeLabel.setAnchorPoint(1, 0);
        this.gaugeLabel.setPosition(500, 0);
        this.gaugeLabel.enableStroke(new cc.Color(255, 0, 0, 255), 5, true);
*/
        this.titleLabel.setOpacity(opacity);
        titleButton.addChild(this.titleLabel);
        var menu = new cc.Menu( titleButton );
        menu.setPosition(0, 0);
        this.addChild(menu);
    },
    set_visible : function (isVisible)
    {
        this.back.setVisible(isVisible);
        this.button.setVisible(isVisible);
    }
});
var nextButtonSprite = cc.Node.extend(
{
    ctor : function (title, w, h, execute, current, stageNum) 
    {
        this._super();
        //var tag = pTag || 1;
        var titleButton = new cc.MenuItemImage( res.TitleBase_png, res.TitleBase_png, function () 
        {
            current.goToGameLayer(stageNum);
        }, current);
        titleButton.setPosition(0, 0);
        this.titleLabel = cc.LabelTTF.create(title, "Arial", 30);
        this.titleLabel.setAnchorPoint(0, 0.5);
        this.titleLabel.setPosition(120, 50);
        titleButton.addChild(this.titleLabel);
        var menu = new cc.Menu( titleButton );
        this.addChild(menu);
    },
    set_visible : function (isVisible)
    {
        this.back.setVisible(isVisible);
        this.button.setVisible(isVisible);
    }
});