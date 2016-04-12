//
//  Header.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Header = cc.Node.extend(
{
    //Lose->戻る
    ctor : function (game) 
    {
        this._super();
        this.game = game;
        this.header = cc.Sprite.create(res.Header150_png);
        this.header.retain();
        this.addChild(this.header);

        this.missionLabel = cc.LabelTTF.create("", "Arial", 18);
        this.missionLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.missionLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        this.missionLabel.setAnchorPoint(1,0);
        this.header.addChild(this.missionLabel);
        this.missionLabel.setPosition(620, 57);

        this.populationLabel = cc.LabelTTF.create("", "Arial", 18);
        this.populationLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.populationLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        this.populationLabel.setAnchorPoint(1,0);
        this.header.addChild(this.populationLabel);
        this.populationLabel.setPosition(170, 57);

        this.amountLabel = cc.LabelTTF.create("", "Arial", 18);
        this.amountLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.amountLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        this.amountLabel.setAnchorPoint(1,0);
        this.header.addChild(this.amountLabel);
        this.amountLabel.setPosition(170, 28);

        this.dokiLabel = cc.LabelTTF.create("", "Arial", 18);
        //this.dokiLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        //this.dokiLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        //this.dokiLabel.setAnchorPoint(1,0);
        //this.header.addChild(this.dokiLabel);
        //this.dokiLabel.setPosition(170, -200);

        this.cycleLabel = cc.LabelTTF.create("50", "Arial", 18);
        this.cycleLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.cycleLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        this.header.addChild(this.cycleLabel,99999);
        this.cycleLabel.setPosition(320, 160);
/*
        this.happyRateLabel = cc.LabelTTF.create("50", "Arial", 28);
        this.happyRateLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.happyRateLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.header.addChild(this.happyRateLabel);
        this.happyRateLabel.setPosition(600, 120);
*/
        //ゲージ
        this.foodGauge = new Gauge(150, 18, 'food');
        this.foodGauge.setAnchorPoint(0, 0);
        this.foodGauge.setPosition(10 + 30, 110);
        this.header.addChild(this.foodGauge);

        this.foodLabel = cc.LabelTTF.create("xxxx", "Arial", 20);
        this.foodLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.foodLabel.enableStroke(new cc.Color(0, 0, 0, 0), 1, false);
        this.foodLabel.setAnchorPoint(1,0);
        this.foodGauge.addChild(this.foodLabel,99999);
        this.foodLabel.setPosition(10 + 140, -10);

        this.houseGauge = new Gauge(150, 18, 'house');
        this.houseGauge.setAnchorPoint(0, 0);
        this.houseGauge.setPosition(10 + 200 + 10+ 30, 110);
        this.header.addChild(this.houseGauge);

        this.houseLabel = cc.LabelTTF.create("xxxx", "Arial", 20);
        this.houseLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.houseLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        this.houseLabel.setAnchorPoint(1,0);
        this.houseGauge.addChild(this.houseLabel,99999);
        this.houseLabel.setPosition(10 + 140, -10);

        this.safeGauge = new Gauge(150, 18, 'safe');
        this.safeGauge.setAnchorPoint(0, 0);
        this.safeGauge.setPosition(10 + 200 + 200 + 10 + 10+ 30, 110);
        this.header.addChild(this.safeGauge);

        this.safeLabel = cc.LabelTTF.create("xxxx", "Arial", 20);
        this.safeLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.safeLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        this.safeLabel.setAnchorPoint(1,0);
        this.safeGauge.addChild(this.safeLabel,99999);
        this.safeLabel.setPosition(10+ 140, -10);

        this.header2 = cc.Sprite.create(res.Header150_over_png);
        this.addChild(this.header2,99999);
    },

    update : function () 
    {

    }, 
});
