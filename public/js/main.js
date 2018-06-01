
/* Ao invés de escreveremos a função inteira jQuery, que nesse caso seria jQuery(".frase").text(), podemos utilizar o atalho $.
    Lembrar:  usa-se '#' quando acessando um elemento, e '.' porque frase é uma classe. */

var frase = $(".frase").text(); // Buscando o texto da frase no HTML.
var numPalavras = frase.split(" ").length; // Como a frase vem na forma de string, fazemos split e pegamos o tamanho do array.
$("#tamanho-frase").text(numPalavras); // Recuperamos a tag do tamanho da frase e inserimos o valor calculado.

var campo = $(".campo-digitacao"); // Recuperando o que foi escrito no textfield.
campo.on("input", function() // Por ser on input, o evento ocorre a cada digitação individual.
{
  /* O texto do textfield é acessível via .val() porque é de input, as tags textarea e input. Já o .text() serve pros que são
      estáticos, como p, span e h1. */
  var qtdPalavras = campo.val().split(/\S+/).length - 1; // Com regex podemos indicar melhor o que deve ser recuperado no split.
  $("#contador-palavras").text(qtdPalavras);
  $("#contador-caracteres").text(campo.val().length);
});
