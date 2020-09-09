
// script

$(document).ready(function ciao () {
    //invio messaggio
    $("#input-send").click(sendMessage);

        $("#input-chat").keyup(function(e) {
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
});
   


















//array risposte casuali
var risposte = [
    "Sei un grande!",
    "Ottima idea",
    "Ok",
    "Certo",
    "Bene",
    "Capito",
    "Ciao!",
    "Molto bene",
    "Benissimo",
    "Sì, tranquillo",
    "Grande!",
    "Sicuramente",
    "Sono d'accordo",
    "Stai scherzando?",
    "Ci sentiamo più tardi, ok?"
  ];








///////////funzioni/////////
    //funzione invio messaggio
    function sendMessage() {
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
            templateSend.find("#time-message").text(getTime);
            //aggiunta messaggio in storico chat            
            templateSend.appendTo(".message-history");
            // svuoto campo input per prossimo messaggio
            $("#input-chat").val("");

            getReply();
         }
    };

    //risposta automatica
    function getReply() {
        //aggiorno stato in sta scerivendo
        var status = $(".message-name .name p").text();
        $(".message-name .name p").text("Sta scrivendo...");
        setTimeout(function(){
            //clono div messaggio completo
            var templateSend = $(".row-message.send.message-template").clone();
            //rimuovo classe templeate e send
            templateSend.removeClass("message-template send");
                
            //scrivo testo casuale nel messaggio vuoto
                var rand = Math.floor(Math.random() * risposte.length);
                var risposta = risposte[rand];
            templateSend.find("#text-message").text(risposta);
            //scrivo ora nel messaggio 
            templateSend.find("#time-message").text(getTime);
            //aggiunta messaggio in storico chat            
            templateSend.appendTo(".message-history");
            //reimposto ultimo accesso
            $(".message-name .name p").text(status);
      
        },1000);
    };
        
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

 
