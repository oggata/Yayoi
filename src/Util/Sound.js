//
//  Sound.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var playBGM = function(storage){
    if(storage.bgmVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.stopMusic();
        audioEngine.playMusic(res.BGM_001_mp3,true); //BGM
    }
};

var playClearBGM = function(storage){
    //BGM_clear_mp3
    if(storage.bgmVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.stopMusic();
        audioEngine.playMusic(res.BGM_clear_mp3,false); //BGM
    }
};

var stopBGM = function(storage){
    var audioEngine = cc.audioEngine;
    audioEngine.stopMusic();
};

var playSE_Button = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_001_mp3,false);
    }
};

var playSE002_Button = function(storage){
    //if(storage.seVolume != 0)
    //{
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_002_mp3,false);
    //}
};

var playSE003_Button = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_003_mp3,false);
    }
};

var playSE004_Button = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_004_mp3,false);
    }
};

var playSE005_Button = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_005_mp3,false);
    }
};


var playSE_Fail = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_Fail_mp3,false);
    }
};

var playSE_Feaver = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_Feaver_mp3,false);
    }
};

var playSE_Sheep = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_Sheep_mp3,false);
    }
};

var playSE_Rotate = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_Rotate_mp3,false);
    }
};

var playSE_Item = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.playEffect(res.SE_Item_mp3,false);
    }
};
