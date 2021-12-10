const qtdMinimaPorPagina = 5;

exports.pagination= ( dogs, pagina )=>{
    const start = qtdMinimaPorPagina * pagina; 
    const qtd = dogs.length/5;

    const object = {
        qtdPaginas:Math.ceil(qtd),
        dogs:dogs.slice(start-5,start)

    }
    return object;


}