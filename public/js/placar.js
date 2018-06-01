function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody"); // Esse .find() busca o parâmetro recebido dentro de onde é chamado.
    var usuario = "Default Name";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha); // A prepend() adiciona no início da tabela o novo elemento, ao contrário do append().
}

function novaLinha(usuario,palavras){
    /* Assim se cria um elemento HTML com jQuery, usando-se $("<nome da tag>") */
    var linha = $("<tr>"); // Criando a linha.
    var colunaUsuario = $("<td>").text(usuario); // Criando o elemento usuário a ser inserido na linha.
    var colunaPalavras = $("<td>").text(palavras); // Criando o elemento nr de palavras a ser inserido na linha.
    var colunaRemover = $("<td>"); // Criando o botão a ser inserido na linha.

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td> botão
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){
  console.log("entrei");
    event.preventDefault(); // Impede que o scroll pule para o topo da página após o click no botão.
    /* Estamos tentando usar funções javascript num elemento html. Para funcionar, usamos o '$'. Além disso, se não inserirmos
        o parent(), iremos deletar apenas o botão de delete e não a linha inteira, que é o pai do elemento botão. */
    $(this).parent().parent().remove();
  }
