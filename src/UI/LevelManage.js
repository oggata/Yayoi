//
//  LevelManage.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var LevelManage = cc.Node.extend(
{
    ctor : function (calledLayer) 
    {
        this._super();

        this.calledLayer = calledLayer;

        this.settingLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.8), 640, 1136);
        this.addChild(this.settingLayer);

        this.settingWindow = cc.Sprite.create(res.Window_Setting_png);
        this.settingWindow.setPosition(320,1136/2);
        this.addChild(this.settingWindow);
    },

    update : function () 
    {

    },
});