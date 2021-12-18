exports.envioDeEmail= async (message)=>{
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
        });
        
    const html = returnTheHTML(message);
    await transporter.sendMail({
        from:`Deu match!- DOG LOVE<doglove364@gmail.com>`,
        to: message.emailDestinatario,
        subject: "Olá, meu nome é: "+ message.nameOrEmail,
        text:"Essa é uma mensagem automática do sistema DOG LOVE",
        html:html
    });
}

function returnTheHTML(data){

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://doglove-api.herokuapp.com/css/envioDeEmail.css">
    <title>Document</title>
</head>
<body>
    <section class="conteiner">
    <div class="match_conteiner">
        <div class="match_content">
            <div class="deu_match">
                <h1>DEU MATCH!</h1>
            </div>            
            <div class="dogs_Matching">

                <div class="dog_conteiner" id="dog_conteiner1">
                    <div class="conteiner_content">

                        <div class="dog_image">
                            <img src="http://doglove-api.herokuapp.com/dogs/ce263085b1369fc489c017c3c2c355b3.png" alt="">
                        </div>
                            
                        <div class="dog_basic_info">
                            <div class="text_div">
                                <p class="dog_name">$ {dogDono.nome}</p>
                                <p class="dog_local">$ {dogDono.sexo}</p> 
                            </div>
                        </div>
                    </div>
                </div>

                    <h1 class="mais">+</h1>
                <div class="dog_conteiner" id="dog_conteiner2">
                    <div class="conteiner_content">

                        <div class="dog_image">
                            <img src="http://doglove-api.herokuapp.com/dogs/ce263085b1369fc489c017c3c2c355b3.png" alt="">
                        </div>
                        
                        <div class="dog_basic_info">
                            <div class="text_div">
                                <p class="dog_name">$ {dogInteressado.nome}</p>
                                <p class="dog_local">$ {dogInteressado.sexo}</p> 
                            </div>
                        </div>

                    </div>
                </div>

            </div>    
            <div class="matchBtns">
            </div>
        </div>
    </div>
    </section>
    
</body>
</html>
    `



}