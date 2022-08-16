//CODED BY: Jonathan Lopes Justino de Souza UFV-Florestal
var numero; // numero recebido pela API

function requisicao(){
var url = "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send(); // toda a requisição para o link
let a = xhttp.responseText.slice(9) //retirar o valor após os 2 pontos
this.numero = a.substring(0, a.length - 2);//remover a chave no final 
//console.log(xhttp.responseText) apenas para facilitar os testes, descomentar caso necessário
document.getElementById("display1").style.visibility="visible"; 
document.getElementById("display2").style.visibility="hidden"; 
document.getElementById("display3").style.visibility="hidden"; 
document.getElementById('display1').setAttribute("class","num-"+0);
document.getElementById("dicaMaior").style.display="none"
document.getElementById("dicaMenor").style.display="none"
document.getElementById("certo").style.display="none"
document.getElementById("newGame").style.display="none"
document.getElementById("erro").style.display="none"
document.getElementById("display2").style.display="none" 
document.getElementById("display3").style.display="none"
//o código acima serve para sumir com os componentes que não são necessários no começo de jogo, como o botão de nova partida e os dois displays adicionais
this.nGame=false;  
if(xhttp.responseText.includes("StatusCode")){ //tratamento caso a requisição retorne 502
    this.erro()
}
}

function verificaNumero(){ //função que confere o chute, converte o valor tentado e o numero recebido para int
    let tentativa = document.getElementById('chute').value
    let intTentativa = parseInt(tentativa)
    let numero = parseInt(this.numero)
    if(numero-intTentativa==0){ // se a diferença for 0 ele acertou, chama uma função especifica para tratar acerto
        this.acerto(tentativa)
    }
    else{
        this.changeDisplay(tentativa) // caso contrário função comum para preencher o display
        let dif = numero-intTentativa < 0? this.dicaMenor(): this.dicaMaior() // operador ternário, se a diferença for menor que zero significa que tentativa é maior
        // logo dar dica que o numero é menor caso contrário dar dica de maior
    }
    document.getElementById('chute').value="" //zerando o input
}
function acerto(tentativa){ //essa função preenche o display da mesma forma, porém com um num-a que indica que é acerto e preenche o display de verde
    //toda a função é explicada na changeDisplay, essa é extremamente similar
    document.getElementById("dicaMaior").style.visibility="hidden";
    document.getElementById("dicaMaior").style.display="none" 
    document.getElementById("dicaMenor").style.visibility="hidden";
    document.getElementById("dicaMenor").style.display="none" 
    document.getElementById("certo").style.display="flex" 
    document.getElementById("certo").style.visibility="visible";
    //exibo a dica de acerto, e escondo as dicas anteriores
    let disp = tentativa.toString();
    if(tentativa<10){
        document.getElementById("display1").style.visibility="visible"; 
        document.getElementById("display2").style.visibility="hidden";
        document.getElementById("display2").style.display="none" 
        document.getElementById("display3").style.visibility="hidden"; 
        document.getElementById("display3").style.display="none" 
        document.getElementById('display1').setAttribute("class","num-a"+disp[0]);
        document.getElementById("newGame").style.display="flex"
    
    }
    else if(tentativa<100){
        document.getElementById("display1").style.visibility="visible"; 
        document.getElementById("display2").style.visibility="visible";
        document.getElementById("display2").style.display="flex"  
        document.getElementById("display3").style.visibility="hidden";
        document.getElementById("display3").style.display="none"  
        document.getElementById('display1').setAttribute("class","num-a"+disp[0]);
        document.getElementById('display2').setAttribute("class","num-a"+disp[1]);
        document.getElementById("newGame").style.display="flex"

    }
    else if(tentativa<301){
        document.getElementById("display1").style.visibility="visible"; 
        document.getElementById("display2").style.visibility="visible";
        document.getElementById("display2").style.display="flex"  
        document.getElementById("display3").style.visibility="visible";
        document.getElementById("display3").style.display="flex"  
        document.getElementById('display1').setAttribute("class","num-a"+disp[0]);
        document.getElementById('display2').setAttribute("class","num-a"+disp[1]);
        document.getElementById('display3').setAttribute("class","num-a"+disp[2]);
        document.getElementById("newGame").style.display="flex";  

    }
}
function erro(){ // assim como a função de acerto serve para preencher o display com vermelho.
    document.getElementById("display1").style.visibility="visible"; 
    document.getElementById("display2").style.visibility="visible"; 
    document.getElementById("display2").style.display="flex"  
    document.getElementById("display3").style.visibility="visible"; 
    document.getElementById("display3").style.display="flex" 
    document.getElementById("erro").style.display="flex"
    document.getElementById("erro").style.visibility="visible";   
    document.getElementById('display1').setAttribute("class","num-e5");
    document.getElementById('display2').setAttribute("class","num-e0");
    document.getElementById('display3').setAttribute("class","num-e2");
    document.getElementById("newGame").style.display="flex"
}
function dicaMaior(){ // exibe a dica de maior e esconde dicas anteriores

        document.getElementById("dicaMenor").style.visibility="hidden";
        document.getElementById("dicaMenor").style.display="none"
        document.getElementById("dicaMaior").style.visibility="visible";  
        document.getElementById("dicaMaior").style.display="flex"
    }
function dicaMenor(){ // exibe dica de menor e esconde dicas anteriores
    document.getElementById("dicaMenor").style.display="flex"
    document.getElementById("dicaMenor").style.visibility="visible"; 
    document.getElementById("dicaMaior").style.visibility="hidden";
    document.getElementById("dicaMenor").style.display="flex"
}

function changeDisplay(tentativa) { // função que modifica o display
    let disp = tentativa.toString();
    if(tentativa<10){ // se o chute for menor que 10 é necessário apenas 1 display, escondo os outros e exibo o valor
        document.getElementById("display1").style.visibility="visible"; 
        document.getElementById("display2").style.visibility="hidden"; 
        document.getElementById("display2").style.display="none" 
        document.getElementById("display3").style.visibility="hidden";
        document.getElementById("display3").style.display="none"  
        document.getElementById('display1').setAttribute("class","num-"+disp[0]); // exibo o valor no display 1
    
    }
    else if(tentativa<100){// numeros de 10-99 são necessários 2 displays, mostro o segundo se necessário e escondo o terceiro
        document.getElementById("display1").style.visibility="visible"; 
        document.getElementById("display2").style.visibility="visible";
        document.getElementById("display2").style.display="flex"  
        document.getElementById("display3").style.visibility="hidden";
        document.getElementById("display3").style.display="none"  
        document.getElementById('display1').setAttribute("class","num-"+disp[0]);//preencho com o digito das dezenas
        document.getElementById('display2').setAttribute("class","num-"+disp[1]);//preencho com o digito das unidades
    

    }
    else if(tentativa<1000){ // numeros de 100 - 999 pensei em tratar para numeros até 300 já que a API não me retorna numeros maiores que isso, porém não achei válido limitar o chute do jogador
        document.getElementById("display1").style.visibility="visible"; 
        document.getElementById("display2").style.visibility="visible";
        document.getElementById("display2").style.display="flex"  
        document.getElementById("display3").style.visibility="visible";
        document.getElementById("display3").style.display="flex"  
        document.getElementById('display1').setAttribute("class","num-"+disp[0]);//preencho com o digito das centenas
        document.getElementById('display2').setAttribute("class","num-"+disp[1]);//preencho com o digito das dezenas
        document.getElementById('display3').setAttribute("class","num-"+disp[2]);//preencho com o digito das unidades
    }

}
requisicao() // para o jogo começar automaticamente