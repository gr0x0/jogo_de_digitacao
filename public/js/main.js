
/* Ao invés de escreveremos a função inteira jQuery, que nesse caso seria jQuery(".frase").text(), podemos utilizar o atalho $.
    Lembrar:  usa-se '#' quando acessando um elemento, e '.' porque frase é uma classe. */

var tempoInicial = $("#tempo-digitacao").text(); // Pegando o valor do timer.
var campo = $(".campo-digitacao"); // Pegando o textfield.
var frase = $(".frase").text(); // Pegando a frase a ser digitada.

$(function() // Importante fazer isso, declarando as funções para que funcionem bem.
{
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    /* Os eventos de click, blur(evento de sair de um campo), dblclick (clique duplo), por serem tão comuns, têm funções próprias
    no jQuery. Elas evitam que precisemos usar a função on(), permitindo que invoquemos diretamente seus métodos. */
    $("#botao-reiniciar").click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);
});;

/*-----------------------------------------------------------------*/
/*-----------------------------Funções-----------------------------*/
/*-----------------------------------------------------------------*/

function atualizaTamanhoFrase() {
    var frase = $(".frase").text(); // Buscando o texto da frase no HTML.
    var numPalavras  = frase.split(" ").length; // Como a frase vem na forma de string, fazemos split e pegamos o tamanho do array.
    $("#tamanho-frase").text(numPalavras); // Recuperamos a tag do tamanho da frase e inserimos o valor calculado.
}

function inicializaContadores() {

  /* Evento de preenchimento de qtd de palavras e letras digitadas no textfield. */
  campo.on("input", function() // Por ser on input, o evento ocorre a cada digitação individual.
  {
    /* O texto do textfield é acessível via .val() porque é de input, as tags textarea e input. Já o .text() serve pros que são
        estáticos, como p, span e h1. */
    var qtdPalavras = campo.val().split(/\S+/).length - 1; // Com regex podemos indicar melhor o que deve ser recuperado no split.
    $("#contador-palavras").text(qtdPalavras);
    $("#contador-caracteres").text(campo.val().length);
  });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();

    /* Evento de início do timer do jogo. */
    campo.one("focus", function() // Por ser on focus, o evento starta com foco - só que uma única vez pq é 'one'.
    {
      /* setInterval recebe como 1o parâmetro o que fazer, e como segundo a cada quanto tempo deve fazê-lo (em milisegundos) */
      var timerID = setInterval(function() // Guardamos o id do setInterval para pará-lo mais adiante.
      {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);

        if (tempoRestante < 1){
            campo.attr("disabled", true); // Se acabar o tempo, desabilita o textarea.
            clearInterval(timerID); // Zera o timer.
            campo.toggleClass("campo-desativado"); // Pinta o fundo da textarea de cinza via classe do CSS.
            inserePlacar();
          }

      },1000);

    });
}

function reiniciaJogo(){
    /* Evento de click no botão de reinício. */
    campo.attr("disabled", false); // Habilitando novamente o textfield.
    campo.val(""); // Limpando o textfield.
    $("#contador-palavras").text("0"); // Zerando o contador de palavras.
    $("#contador-caracteres").text("0"); // Zerando o contador de letras.
    $("#tempo-digitacao").text(tempoInicial); // Reiniciando o timer.
    inicializaCronometro();

    campo.toggleClass("campo-desativado"); // Pinta o fundo da textarea de branco via classe do CSS.
    campo.removeClass("campo-errado"); // Pinta borda de preto.
    campo.removeClass("campo-correto"); // Pinta borda de preto.
}

function inicializaMarcadores() {
    campo.on("input", function() {
        var digitado = campo.val(); // O que já foi digitado.
        var comparavel = frase.substr(0 , digitado.length); // O pedaço da frase-resposta do tamanho do que foi digitado.

        if(digitado == comparavel) {
            campo.addClass("campo-correto"); // Se estiver tudo correto até aí, pinta a borda do textfield de verde.
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado"); // Se houver erro, pinta a borda do textfield de vermelho.
            campo.removeClass("campo-correto");
        }
    });
}
