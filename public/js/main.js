
/* Ao invés de escreveremos a função inteira jQuery, que nesse caso seria jQuery(".frase").text(), podemos utilizar o atalho $.
    Lembrar:  usa-se '#' quando acessando um elemento, e '.' porque frase é uma classe. */

var frase = $(".frase").text(); // Buscando o texto da frase no HTML.
var numPalavras = frase.split(" ").length; // Como a frase vem na forma de string, fazemos split e pegamos o tamanho do array.
$("#tamanho-frase").text(numPalavras); // Recuperamos a tag do tamanho da frase e inserimos o valor calculado.

/* Evento de preenchimento de qtd de palavras e letras digitadas no textfield. */
var campo = $(".campo-digitacao");
campo.on("input", function() // Por ser on input, o evento ocorre a cada digitação individual.
{
  /* O texto do textfield é acessível via .val() porque é de input, as tags textarea e input. Já o .text() serve pros que são
      estáticos, como p, span e h1. */
  var qtdPalavras = campo.val().split(/\S+/).length - 1; // Com regex podemos indicar melhor o que deve ser recuperado no split.
  $("#contador-palavras").text(qtdPalavras);
  $("#contador-caracteres").text(campo.val().length);
});

/* Evento de início do timer do jogo. */
var tempoRestante = $("#tempo-digitacao").text();
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
      }

  },1000);

});
