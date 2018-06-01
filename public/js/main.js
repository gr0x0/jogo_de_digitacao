
/* Ao invés de escreveremos a função inteira jQuery, que nesse caso seria jQuery(".frase").text(), podemos utilizar o atalho $.
    Lembrar:  usa-se '#' quando acessando um elemento, e '.' porque frase é uma classe. */
var frase = $(".frase").text(); // Buscando o texto da frase no HTML.
var numPalavras = frase.split(" ").length; // Como a frase vem na forma de string, fazemos split e pegamos o tamanho do array.
$("#tamanho-frase").text(numPalavras); // Recuperamos a tag do tamanho da frase e inserimos o valor calculado.
