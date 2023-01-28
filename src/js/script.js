
var text = `once you have finished typing this lesson, look away from the computer for a few short seconds before looking at the results.`;

initialMarginWidth = $(".cursor").outerWidth();
initialMarginHeight = $(".word").outerHeight();
marginWidth = 0;
lineTop = initialMarginHeight - 5;
charCheck = 0;
resetMargin = 1;
lineNum = 0;
width = [];
totalChars = [];
startTime = 0;

totalCorrectEntry = 0;
totalWrongEntry = 0;

text.split(" ").forEach(w => { 
    var strng = "";
    for(i in w){    
      strng = strng + '<span class="letter">'+w[i]+'</span>\n'
    }    
    strng = '<span class="word">\n'+strng+'<span class="letter">&nbsp;</span>\n</span>\n';
});

let blackListKeys = ['Alt', 'Control', 'Shift', 'Meta'];

//Calculate all line width
const line = $('.line');
for(i = 0; i < line.length; i++){
    lineWidth = 0;
    Array.from(line[i].children).forEach( function(child) {
        lineWidth += child.clientWidth;
    });
    width.push(lineWidth);
}

//Calculate all characters
for(i = 0; i < line.length; i++){
    chars = 0;
    Array.from(line[i].children).forEach( function(child) {
        chars += child.children.length;        
    });
    totalChars.push(chars);
}

$("body").on('keydown', (e) => {
    
    if( e.originalEvent.repeat || blackListKeys.indexOf(e.key) != -1 ){
        return;
    }    
    
    startTimer();
    
    //Updating cursor location
    if(resetMargin >= totalChars[lineNum]){
        margin = 0;
        lineNum += 1;
        resetMargin = 0;
        marginWidth = 0;
        lineTop += initialMarginHeight;
        $(".cursor").css('top', lineTop);
        $(".cursor").css('marginLeft', marginWidth);
    }
    else{
        marginWidth += initialMarginWidth;    
        $(".cursor").css('marginLeft', marginWidth);
    }
    
    //Highlight correct and incorrect letters.
    if(e.key == text[charCheck]){        
        $('.status:first').addClass("correct");
        $('.status:first').removeClass("status");
        totalCorrectEntry += 1;
    }
    else{
        $('.status:first').addClass("wrong");
        $('.status:first').removeClass("status");
        totalWrongEntry += 1;
    }

    //After completion
    if(charCheck == text.length - 1){
        $(".cursor").css('display', 'none');
        
        endTimer();
        elapsed = (endTime - startTime) / 60000;

        accuracy = Math.round((totalCorrectEntry/ text.length)*100);
        speed = Math.round(((totalCorrectEntry+totalWrongEntry)/5)/elapsed);
        
        console.log(accuracy, speed);
        $("#speedValue").html(speed+"wpm");
        $("#accuracyValue").html(accuracy+"%");

        $(".modal").show();
    }    
    
    charCheck += 1;
    resetMargin += 1;
});

$("#closeModalBtn").on('click', () => { 
    $(".modal").hide(); 
    window.location.reload();
});

isStart = true;
isEnd = true;

startTimer = () => {
    if(isStart){
        startTime = Date.now();
    }
    isStart = false;
}

endTimer = () => {
    if(isEnd){
        endTime = Date.now();
    }
    isEnd = false;
}
