const qtdMinimaPorPagina = 6;

exports.pagination= ( dogs, pagina )=>{
    const start = qtdMinimaPorPagina * pagina; 
    const qtd = dogs.length/6;

    const object = {
        qtdPaginas:Math.ceil(qtd),
        dogs:dogs.slice(start-6,start)

    }
    return object;
}