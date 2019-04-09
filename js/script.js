/**
 * Music Creator - basic launchpad simulator
 *
 * @author Wilk Paweł
 * @mail pwilk0108@gmail.com
 * @github https://github.com/WilczekCK
 */

$(document).ready(function () {
    var musicMaker = musicMaker || {};
    musicMaker = {
        settings: {
            acceptedClicks: ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'],
            clickedButtons: {}, //hold recognize
            colors: {
                activate: '#FFCC00',
                release: '#FFAA00'
            },
            buttons: '.buttons',
            buttonsVolume : 0.3
        },

        soundKeys: {
            q: {sound:'drum', state:'disabled'},
            w: {sound:'drum2', state:'disabled'},
            e: {sound:'drum3', state:'disabled'},
            a: {sound:'clap', state:'disabled'},
            s: {sound:'clap2', state:'disabled'},
            d: {sound:'clap3', state:'disabled'},
            z: {sound:'kick', state:'disabled'},
            x: {sound:'kick2', state:'disabled'},
            c: {sound:'kick3', state:'disabled'},
        },

        loadButtons: function () {
            var x = 0;
            for(x; x<this.settings.acceptedClicks.length; x++){
                $(this.settings.buttons + ':nth-child('+(x+1)+')')
                    .addClass(this.soundKeys[this.settings.acceptedClicks[(x)]].sound) //add instrument name to buttons
                    .append('<p>' + this.settings.acceptedClicks[x] + '</p>') //display keys on buttons
            }
        },
        loadSounds: function () {
            //drums
            createjs.Sound.registerSound("sound/"+this.soundKeys.q.sound+".wav", this.soundKeys.q.sound);
            createjs.Sound.registerSound("sound/"+this.soundKeys.w.sound+".wav", this.soundKeys.w.sound);
            createjs.Sound.registerSound("sound/"+this.soundKeys.e.sound+".wav", this.soundKeys.e.sound);

            //piano
            createjs.Sound.registerSound("sound/"+this.soundKeys.a.sound+".wav", this.soundKeys.a.sound);
            createjs.Sound.registerSound("sound/"+this.soundKeys.s.sound+".wav", this.soundKeys.s.sound);
            createjs.Sound.registerSound("sound/"+this.soundKeys.d.sound+".wav", this.soundKeys.d.sound);

            //synth
            createjs.Sound.registerSound("sound/"+this.soundKeys.z.sound+".wav", this.soundKeys.z.sound);
            createjs.Sound.registerSound("sound/"+this.soundKeys.x.sound+".wav", this.soundKeys.x.sound);
            createjs.Sound.registerSound("sound/"+this.soundKeys.c.sound+".wav", this.soundKeys.c.sound);
        },
        playSound: function (activeButton) {
            switch (activeButton) {
                case 'q':
                    if(musicMaker.soundKeys.q.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.q.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }         
                    break; 
                case 'w':
                    if(musicMaker.soundKeys.w.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.w.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 'e':
                    if(musicMaker.soundKeys.e.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.e.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 'a':
                    if(musicMaker.soundKeys.a.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.a.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 's':
                    if(musicMaker.soundKeys.s.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.s.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 'd':
                    if(musicMaker.soundKeys.d.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.d.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 'z':
                    if(musicMaker.soundKeys.z.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.z.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 'x':
                    if(musicMaker.soundKeys.x.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.x.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
                case 'c':
                    if(musicMaker.soundKeys.c.state == 'disabled'){
                        var sample = createjs.Sound.play(musicMaker.soundKeys.c.sound);
                        sample.volume = musicMaker.settings.buttonsVolume;
                    }
                    break;
            }
        },
        onClick: {
            recognize: function(activeButton) {
                var x = 0;
                var settingsSC = musicMaker.settings;
                for(x; x<settingsSC.acceptedClicks.length; x++){
                    if(activeButton[settingsSC.acceptedClicks[x]] == true){
                        this.keyDown(settingsSC.acceptedClicks[x])
                    }else if(activeButton[settingsSC.acceptedClicks[x]] == false){
                        this.keyUp(settingsSC.acceptedClicks[x])
                    }
                }
            },
            keyDown: function(key){
                musicMaker.playSound(key);
                musicMaker.soundKeys[key].state = 'enabled';
                $(musicMaker.settings.buttons+'.'+musicMaker.soundKeys[key].sound).addClass('activated');
            },
            keyUp: function(key){
                musicMaker.soundKeys[key].state = 'disabled';
                $(musicMaker.settings.buttons+'.'+musicMaker.soundKeys[key].sound).removeClass('activated');
            },
        },
        //playlist script
        baseMusic:{
                settings:{
                    songList: [], //array for all song below
                    actualSong: 0,
                    playState: false,
                    tip: true,
                },
                playlist: function(){
                    var songOne    =  createjs.Sound.registerSound("sound/loops/guitar.mp3", 'Guitar');
                    var songTwo    =  createjs.Sound.registerSound("sound/loops/hiphop.mp3", 'Hip Hop');
                    var songThree  =  createjs.Sound.registerSound("sound/loops/90s.mp3", '90s');

                    this.settings.songList.push(songOne['id']);
                    this.settings.songList.push(songTwo['id']);
                    this.settings.songList.push(songThree['id']);
                },
                observer: function(){
                    $('#buttons button').on('click', function(){
                        musicMaker.baseMusic.assign(this.id);

                        if(musicMaker.baseMusic.settings.tip == true){
                            $('#tip').html('');
                            musicMaker.baseMusic.settings.tip = false;
                        };
                    })
                },
                assign: function(button){
                    switch(button){
                        case 'left':
                            button = 'left';
                            this.previousSong(button)
                            break;
                        case 'right':
                            button = 'right';
                            this.nextSong(button)
                            break;
                        case 'play':
                            button = 'play';
                            this.play(button)
                            break;
                    }
                    
                },
                nextSong: function(){
                    var tabLength = musicMaker.baseMusic.settings.songList.length-1;
                    var shortcut = musicMaker.baseMusic.settings;

                    if(tabLength >= this.settings.actualSong){
                        this.settings.actualSong++;
                    }else{
                        this.settings.actualSong = 1;
                    }

                    $('#musicSelector #screen b').html(shortcut.songList[shortcut.actualSong-1])
                },
                previousSong: function(){   
                    var tabLength = musicMaker.baseMusic.settings.songList.length;
                    var shortcut = musicMaker.baseMusic.settings;

                    if(this.settings.actualSong > 1){
                        this.settings.actualSong--;
                    }else{
                        this.settings.actualSong = tabLength;
                    }

                    $('#musicSelector #screen b').html(shortcut.songList[shortcut.actualSong-1])
                },
                play: function(){
                    var shortcut = musicMaker.baseMusic.settings;
                    if(shortcut.songList[shortcut.actualSong-1] == undefined){
                       return;
                    }

                    if(musicMaker.baseMusic.settings.playState == true){
                        createjs.Sound.stop();
                        musicMaker.baseMusic.settings.playState = false;
                        $('#buttons #play').html('Play');
                        return;
                    }else{
                        var song = createjs.Sound.play(shortcut.songList[shortcut.actualSong-1]);
                        song.loop = -1;
                        musicMaker.baseMusic.settings.playState = true;
                        $('#buttons #play').html('Stop');
                        return;
                    }
                },
                //music selector (baseMusic) init
                init: function(){
                    musicMaker.baseMusic.playlist();
                    musicMaker.baseMusic.observer();
                }
            },
        //global init - all functions
        init: function () {
            this.baseMusic.init();
            this.loadButtons();
            this.loadSounds();
        }

    }
    
   onkeydown = onkeyup = function(e){
            var settingsSC = musicMaker.settings;
            e = e || event; // IE Fix

            if (_.indexOf(settingsSC.acceptedClicks, e.key) > -1) {
                settingsSC.clickedButtons[e.key] = e.type == 'keydown';
                musicMaker.onClick.recognize(settingsSC.clickedButtons);
            }        
    }

    $(musicMaker.settings.buttons).on('click', function(){ 
        var sample = createjs.Sound.play(this.classList[1]);
        sample.volume = musicMaker.settings.buttonsVolume;
        $(musicMaker.settings.buttons+'.'+this.classList[1]).addClass('activated')

        //delay and removeClass does not work
        //workaround to the problem with timeout
        var that = this;
        setTimeout(function(){
           $(musicMaker.settings.buttons+'.'+that.classList[1]).removeClass('activated') 
        }, 150)
                                                            
    })


    musicMaker.init()
});



