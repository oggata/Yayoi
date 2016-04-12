//
//  Tutorial.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Tutorial = cc.Node.extend(
{
    ctor : function () 
    {
        this._super();
        this.tutorialIsVisible = false;
        this.pageNum = 1;

        this.settingLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.8), 640, 1500);
        this.addChild(this.settingLayer);
        this.settingLayer.setPosition(-320,-1136/2);
        this.settingLayer.setAnchorPoint(0.5,0.5);

        this.tutorial_001 = cc.Sprite.create(res.Tutorial_Page_001);
        this.tutorial_001.setPosition(320,600);
        this.settingLayer.addChild(this.tutorial_001);

        this.tutorial_002 = cc.Sprite.create(res.Tutorial_Page_002);
        this.tutorial_002.setPosition(320,600);
        this.settingLayer.addChild(this.tutorial_002);

        this.tutorial_003 = cc.Sprite.create(res.Tutorial_Page_003);
        this.tutorial_003.setPosition(320,600);
        this.settingLayer.addChild(this.tutorial_003);

        this.tutorial_004 = cc.Sprite.create(res.Tutorial_Page_004);
        this.tutorial_004.setPosition(320,600);
        this.settingLayer.addChild(this.tutorial_004);

        this.tutorial_005 = cc.Sprite.create(res.Tutorial_Page_005);
        this.tutorial_005.setPosition(320,600);
        this.settingLayer.addChild(this.tutorial_005);

        this.tutorial_006 = cc.Sprite.create(res.Tutorial_Page_006);
        this.tutorial_006.setPosition(320,600);
        this.settingLayer.addChild(this.tutorial_006);

        var backButton = new cc.MenuItemImage( res.Tutorial_Left_Button, res.Tutorial_Left_Button, function () 
        {
            this.pageBack();
        }, this);
        backButton.setPosition(320-60, 210);

        var closeButton = new cc.MenuItemImage( res.Tutorial_Close_Button, res.Tutorial_Close_Button, function () 
        {
            this.pageVisible();
        }, this);
        closeButton.setPosition(320, 210);

        var nextButton = new cc.MenuItemImage( res.Tutorial_Right_Button, res.Tutorial_Right_Button, function () 
        {
            this.pageNext();
        }, this);
        nextButton.setPosition(320 + 60, 210);

        var menu = new cc.Menu(nextButton,backButton);
        menu.x = 0;
        menu.y = 0;
        this.settingLayer.addChild(menu, 1);

        this.tutorial_001.setVisible(true);
        this.tutorial_002.setVisible(false);
        this.tutorial_003.setVisible(false);
        this.tutorial_004.setVisible(false);
        this.tutorial_005.setVisible(false);
        this.tutorial_006.setVisible(false);
    },

    update : function () {


    },

    pageNext : function()
    {
        this.pageNum++;
        if(this.pageNum>=6)
        {
            this.pageNum = 6;
        }

        if(this.pageNum == 1)
        {
            this.tutorial_001.setVisible(true);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 2)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(true);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 3)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(true);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 4)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(true);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 5)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(true);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 6)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(true);
        }
    },

    pageBack : function()
    {
        this.pageNum--;
        if(this.pageNum<=1)
        {
            this.pageNum = 1;
        }

        if(this.pageNum == 1)
        {
            this.tutorial_001.setVisible(true);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 2)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(true);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 3)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(true);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 4)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(true);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 5)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(true);
            this.tutorial_006.setVisible(false);
        }
        if(this.pageNum == 6)
        {
            this.tutorial_001.setVisible(false);
            this.tutorial_002.setVisible(false);
            this.tutorial_003.setVisible(false);
            this.tutorial_004.setVisible(false);
            this.tutorial_005.setVisible(false);
            this.tutorial_006.setVisible(true);
        }
    },

    pageVisible : function()
    {
        if(this.tutorialIsVisible == true)
        {
            this.tutorialIsVisible = false;
        }else{
            this.tutorialIsVisible = true;
        }
        this.setVisible(this.tutorialIsVisible);
    }
});
