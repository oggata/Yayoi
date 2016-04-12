//
//  InfoBuilding.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var InfoBuilding = cc.Node.extend(
{
    //Lose->戻る
    ctor : function (game) 
    {
        this._super();
        this.game = game;

        this.positionWindow = cc.Sprite.create(res.Positioning_png);
        this.positionWindow.setAnchorPoint(0.5,0);
        this.positionWindow.setPosition(320,150);
        this.addChild(this.positionWindow,99999999999);

        this.positionNameLabel = cc.LabelTTF.create("xxxx", "Arial", 32);
        this.positionNameLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.positionNameLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.positionNameLabel.setAnchorPoint(0,0);
        this.positionWindow.addChild(this.positionNameLabel);
        this.positionNameLabel.setPosition(50,30);

        this.positionDetailLabel = cc.LabelTTF.create("xxxxxxxxxxx", "Arial", 22);
        this.positionDetailLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.positionDetailLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.positionDetailLabel.setAnchorPoint(0,0);
        this.positionWindow.addChild(this.positionDetailLabel);
        this.positionDetailLabel.setPosition(50,10);

        this.positionAmountLabel = cc.LabelTTF.create("xxxx", "Arial", 32);
        this.positionAmountLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.positionAmountLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.positionAmountLabel.setAnchorPoint(0,0);
        this.positionWindow.addChild(this.positionAmountLabel);
        this.positionAmountLabel.setPosition(450,20);
    },

    update : function () 
    {

    }, 
});