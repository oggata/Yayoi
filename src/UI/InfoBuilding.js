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

        this.positionWindow = cc.Sprite.create(res.Window_Positioning_png);
        this.positionWindow.setAnchorPoint(0.5,0);
        this.positionWindow.setPosition(320,350 - 30);
        this.addChild(this.positionWindow,99999999999);

        this.positionNameLabel = cc.LabelTTF.create("xxxx", "Arial", 22);
        this.positionNameLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.positionNameLabel.setAnchorPoint(0,0);
        this.positionWindow.addChild(this.positionNameLabel);
        this.positionNameLabel.setPosition(50,30);

        this.positionDetailLabel = cc.LabelTTF.create("xxxxxxxxxxx", "Arial", 18);
        this.positionDetailLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.positionDetailLabel.setAnchorPoint(0,0);
        this.positionWindow.addChild(this.positionDetailLabel);
        this.positionDetailLabel.setPosition(50,10);

        this.positionAmountLabel = cc.LabelTTF.create("xxxx", "Arial", 22);
        this.positionAmountLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.positionAmountLabel.setAnchorPoint(0,0);
        this.positionWindow.addChild(this.positionAmountLabel);
        this.positionAmountLabel.setPosition(320-40,20);
    },

    update : function () 
    {

    },

    setInfo : function(title,description)
    {
        this.positionNameLabel.setString(title);
        this.positionDetailLabel.setString(description);
        this.positionAmountLabel.setString("");
    }
});
