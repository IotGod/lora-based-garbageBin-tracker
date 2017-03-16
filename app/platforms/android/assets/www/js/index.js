var app = {

    initialize: function() {
        this.bindEvents();
        $(window).on("navigate", function (event, data) {          
            event.preventDefault();      
        })
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        app.pubnubInit();
    },
  
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    pubnubInit: function() {
        pubnub = PUBNUB({                          
            publish_key   : 'pub-c-913ab39c-d613-44b3-8622-2e56b8f5ea6d',
            subscribe_key : 'sub-c-8ad89b4e-a95e-11e5-a65d-02ee2ddab7fe'})
        app.subscribeStart()
    },

    containerlevel:function(p_container,level){
            var color_red ="#e12727";
            var color_orange ="#fec057";
            
            $garbage = $(p_container);
           
            if (level>=130){
                $(s1).hide();
                $(s2).hide();
                $(s3).hide();
                $(s4).hide();
                $(s5).hide();
                $(s6).hide();
                $(s7).hide();
                $(s8).hide();
                $(s9).hide();
                $(s10).hide();
            }
            else if(level<= 130 && level>=91 ){
                $(s1).hide();
                $(s2).hide();
                $(s3).hide();
                $(s4).hide();
                $(s5).hide();
                $(s6).hide();
                $(s7).hide();
                $(s8,$garbage).attr('style',"fill:"+color_orange);
                $(s9,$garbage).attr('style',"fill:"+color_orange);
                $(s10,$garbage).attr('style',"fill:"+color_orange);
            }
            else if(level<= 90&& level>=61){
                $(s1).hide();
                $(s2).hide();
                $(s3).hide();
                $(s4).hide();
                $(s5).hide();
                $(s6,$garbage).attr('style',"fill:"+color_orange);
                $(s7,$garbage).attr('style',"fill:"+color_orange);
                $(s8,$garbage).attr('style',"fill:"+color_orange);
                $(s9,$garbage).attr('style',"fill:"+color_orange);
                $(s10,$garbage).attr('style',"fill:"+color_orange);
            }
            else if(level<=60 && level>=21){
                $(s1).hide();
                $(s2).hide();
                $(s3).hide();
                $(s4,$garbage).attr('style',"fill:"+color_orange);
                $(s5,$garbage).attr('style',"fill:"+color_orange);
                $(s6,$garbage).attr('style',"fill:"+color_orange);
                $(s7,$garbage).attr('style',"fill:"+color_orange);
                $(s8,$garbage).attr('style',"fill:"+color_orange);
                $(s9,$garbage).attr('style',"fill:"+color_orange);
                $(s10,$garbage).attr('style',"fill:"+color_orange);
            }
            else if(level<=20){
                $(s1,$garbage).attr('style',"fill:"+color_red);
                $(s2,$garbage).attr('style',"fill:"+color_red);
                $(s3,$garbage).attr('style',"fill:"+color_red);
                $(s4,$garbage).attr('style',"fill:"+color_red);
                $(s5,$garbage).attr('style',"fill:"+color_red);
                $(s6,$garbage).attr('style',"fill:"+color_red);
                $(s7,$garbage).attr('style',"fill:"+color_red);
                $(s8,$garbage).attr('style',"fill:"+color_red);
                $(s9,$garbage).attr('style',"fill:"+color_red);
                $(s10,$garbage).attr('style',"fill:"+color_red);
            }
    },

    subscribeStart: function(){  
        pubnub.subscribe({                                     
            channel : "garbageApp-resp",
            message : function(message){
                        console.log(message)
                        console.log(message.level)
                        app.containerlevel("#container001",message.level);
            },            
            connect: function(){
                app.publish({"requester":"APP"})
            }
        })

    },

    publish: function(message) {
        pubnub.publish({                                    
            channel : "garbageApp-req",
            message : message,
            callback: function(m){ console.log(m) }
        })
    }
};

app.initialize();