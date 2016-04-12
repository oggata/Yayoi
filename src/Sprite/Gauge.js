//
//  Gauge.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Gauge = cc.Node.extend({
    ctor: function(width, height, color) {
        this._super();
        this.width = width;
        this.height = height;
        var rectBase = cc.LayerColor.create(new cc.Color(0, 0, 0, 255), this.width, this.height);
        rectBase.setPosition(0, 0);
        this.addChild(rectBase, 1);
        var rectBack = cc.LayerColor.create(new cc.Color(169, 169, 169, 255), this.width - 1, this.height - 1);
        rectBack.setPosition(1, 1);
        this.addChild(rectBack, 2);
        var colorCode = new cc.Color(255, 255, 255, 255);

        if (color == "food") {
            colorCode = new cc.Color(255, 20, 147, 255);
        }
        if (color == "house") {
            colorCode = new cc.Color(0, 191, 255, 255);
        }
        if (color == "safe") {
            colorCode = new cc.Color(0, 255, 0, 255);
        }

        if (color == "red") {
            colorCode = new cc.Color(255, 0, 0, 255);
        }
        if (color == "blue") {
            colorCode = new cc.Color(0, 0, 255, 255);
        }
        if (color == "lime") {
            colorCode = new cc.Color(0, 255, 0, 255);
        }
        if (color == "white") {
            colorCode = new cc.Color(255, 250, 250, 255);
        }
        this.rectBar = cc.LayerColor.create(colorCode, this.width - 2, this.height - 2);
        this.rectBar.setPosition(2, 2);
        this.addChild(this.rectBar, 3);
        this.rectBar.setAnchorPoint(0, 0);
    },
    init: function() {},
    update: function(scaleNum) {
        this.rectBar.setScale(scaleNum, 1);
    },
});