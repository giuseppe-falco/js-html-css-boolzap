
// script

$(document).ready(function ciao () {
   
    //dichiaro dataContact per cambio orario
    dataContact = 1;

    indexChatEnd = $(".chat.active").index() + 1;

   
    //invio messaggio
    $("#input-send").click(sendMessage);

    $("#input-chat").keydown(function(e) {
        if (e.which == 13 && $("#input-chat").val() != "") {
            sendMessage();
        }
    });

    //ricerca contatti
    //interamente copiato da w3school
    $("#search-input").on("input",function(){
        //acquisisco input utente
        var input = $(this).val().toLowerCase();
        //per ogni contenitore "row" 
        $(".contacts .row").each(function() {
            var name = $(this).find(".contacts-name").text().toLowerCase();
            if (name.includes(input)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
     
    //mostra opzioni messaggio
    $(document).on("click",".option-message",
        function() {
            $(this).siblings(".option-menu").toggle();
        }
    );
     
    //cancella messaggio
    $(document).on("click",".delete-message",
        function() {
            $(this).parents(".row-message").remove();
        }
    );
    
    //click active chat
    $(".row").click(
        function() {
            $(".row").removeClass("active-chat");
            $(this).addClass("active-chat");

            dataContact = $(this).attr("data-contact");

            $(".row").removeClass("active-chat");
            $(".row[data-contact=" + dataContact + "]").addClass("active-chat");
            $(".chat").removeClass("active");
            $(".chat[data-conversation=" + dataContact + "]").addClass("active");


            var img = $(this).find("img").attr("src");
            var name = $(this).find(".contacts-name").text();
            var time = $(this).find(".contacts-time").text();
            

            $(".message-name .avatar img").attr("src", img);
            $(".message-name .avatar-name").text(name);
            $(".message-name .name time").text(time);          


            indexChatEnd = $(".chat.active").index() + 1;

        }
    );       
});
//**************************************array risposte casuali***********************************//
var risposte = [
    "Sei un grande!",
    "Ottima idea",
    "Ok",
    "Certo",
    "Bene",
    "Sono d'accordo",
    "Ciao!",
    "Molto bene",
    "Capito",
    "Benissimo",
    "A dopo",
    "Sì, tranquillo",
    "Sicuramente",
    "Stai scherzando?",
    "Grande!",
];
//***************************************funzioni****************************************************//
    //funzione invio messaggio
    function sendMessage() {
        indexChatStart = $(".chat.active").index() + 1;

        //messaggio screitto dall'utente
        var inputMessage = $("#input-chat").val();
        if (inputMessage != "" && inputMessage != " ") {
            //clono div messaggio completo
            var templateSend = $(".row-message.send.message-template").clone();
            //rimuovo classe templeate        
            templateSend.removeClass("message-template");
            //scrivo testo input nel messaggio vuoto
            templateSend.find("#text-message").text(inputMessage);
            //scrivo ora nel messaggio 
            templateSend.find(".time-message").text(getTime);
            //aggiunta messaggio in storico chat            
            templateSend.appendTo(".chat.active");
            // svuoto campo input per prossimo messaggio
            $("#input-chat").val("");

            getReply();

        };
        var heightChatActive = $(".chat.active").prop("scrollHeight");
        $(".message-history").scrollTop(heightChatActive);     
    };
    //risposta automatica
    function getReply() {
        //tempo casuale per la risposta
        timeToReply = Math.floor(Math.random()*1000 + 500);      
        //salvo testo ultimo accesso 
        status = $(".message-name .name p").text();
             // $(".message-name .name p").text("Sta scrivendo...");
        //salvo numero chat corrente
        indexChatList = $(".row.active-chat").index();
             
        //dopo tempo casuale maggiore di 0.5 sec
        setTimeout(function(){
            //se sono nella stess ìa chat esce scritta sta scrivendo e poi ultimo accesso
            //se cambio chat prima che il messaggio venga stampato non succede nulla
            if (indexChatEnd != indexChatStart) {
                console.log('duversi');
                $(".message-name .name p").text(status);
                $(".message-name .name time").show();
                $(".message-name .name time").text();
                sendReply();
            }  else {
                console.log('uguale');
                $(".message-name .name time").hide();
                $(".message-name .name p").text("Sta scrivendo...");
                setTimeout(function(){
                    sendReply();
                    $(".message-name .name p").text(status);
                    $(".message-name .name time").show();
                    $(".message-name .name time").text(getTime);
                },timeToReply);
            }
        },timeToReply);
    };      

    function sendReply() {
        //clono div messaggio completo
        var templateSend = $(".row-message.send.message-template").clone();
        //rimuovo classe templeate e send
        templateSend.removeClass("message-template send");                
        //scrivo testo casuale nel messaggio vuoto
            var rand = Math.floor(Math.random() * risposte.length);
            var risposta = risposte[rand];
        templateSend.find("#text-message").text(risposta);
        //scrivo orario nel messaggio 
        templateSend.find(".time-message").text(getTime);
        //aggiorna orario ultiumo messaggio sezione laterale chat
            // $(".active-chat .contacts-time").text(getTime);
        $(".contacts-time").eq(indexChatList).text(getTime);
        //aggiunta messaggio in storico chat            
            // templateSend.appendTo(".chat.active");
        $(".chat").eq(indexChatStart).append(templateSend);
        //aggiorno messaggio chat laterale
            // $(".row[data-contact=" + dataContact + "] p").text(risposta);
        $(".row .row-text p").eq(indexChatStart-1).text(risposta);
        //scroll automatico
        var heightChatActive = $(".chat.active").prop("scrollHeight");
        $(".message-history").scrollTop(heightChatActive);

    }
    //funzione tempo
    function getTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10) {
        minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
            }
        var currentTime = hours + ":" + minutes;
   
        return currentTime;
    };

 
