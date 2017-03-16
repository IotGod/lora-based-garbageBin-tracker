/*************************************************************************************************
                       GARBAGE BIN MOBILE APP
**************************************************************************************************/
var app = {
/*************************************************************************************************
    FUNCTION NAME : initialize()
    DESCRIPTION   : initialize the app with events
**************************************************************************************************/
    initialize: function() {
        this.bindEvents();
        $(window).on("navigate", function (event, data) {          
            event.preventDefault();      
        })
    },
/**************************************************************************************************
    FUNCTION NAME : bindEvents()
    DESCRIPTION   : Initialize Pubnub and adds device ready eventListner to app 
****************************************************************************************************/ 
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        app.pubnubInit();
    },
/**************************************************************************************************
    FUNCTION NAME : onDeviceReady()
    DESCRIPTION   : pass device ready id to received event 
****************************************************************************************************/   
    onDeviceReady: function() {
        app.receivedEvent('deviceready'); 
    },
/**************************************************************************************************
    FUNCTION NAME : receivedEvent()
    DESCRIPTION   : on Deviceready loads the app displaying main page
****************************************************************************************************/ 
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },
/**************************************************************************************************
    FUNCTION NAME : pubnubInit()
    DESCRIPTION   : initialize pubnub keys and set app to default function 
****************************************************************************************************/ 
    pubnubInit: function() {
        pubnub = PUBNUB({                          
            publish_key   : 'pub-c-913ab39c-d613-44b3-8622-2e56b8f5ea6d',
            subscribe_key : 'sub-c-8ad89b4e-a95e-11e5-a65d-02ee2ddab7fe'})
        app.subscribeStart()
    },
/**************************************************************************************************
    FUNCTION NAME : containerlevel()
    DESCRIPTION   : sets the container height with appropriate input garbage level 
****************************************************************************************************/ 
    containerlevel:function(p_container,level){
            var color_red ="#e12727";
            var color_orange ="#fec057";
            
            $garbage = $(p_container);
           
            if (level>=24){
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
            else if(level<= 23 && level>= 19){
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
            else if(level<= 18 && level>= 11){
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
            else if(level<= 10 && level>= 5){
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
            else if(level<= 4){
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
/**************************************************************************************************
    FUNCTION NAME : subscribeStart()
    DESCRIPTION   : subscribes to server response and provides the container item data 
                    (containerId,weight)
****************************************************************************************************/
    subscribeStart: function(){  
        pubnub.subscribe({                                     
            channel : "garbageApp-resp",
            message : function(message){
                        app.containerlevel("#container001",message.level);
            },            
            connect: function(){
                app.publish({"requester":"APP"})
            }
        })

    },
/**************************************************************************************************
    FUNCTION NAME : publish()
    DESCRIPTION   : publish the data to server 
****************************************************************************************************/
    publish: function(message) {
        pubnub.publish({                                    
            channel : "garbageApp-req",
            message : message,
            callback: function(m){ console.log(m) }
        })
    }
};
/**************************************************************************************************
    DESCRIPTION   : app initializing function
****************************************************************************************************/
app.initialize();

//End of the Program