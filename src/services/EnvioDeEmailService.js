exports.envioDeEmail= async (message)=>{
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service:'Gmail',
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
        from:`Deu match!- DOG LOVE <doglove364@gmail.com>`,
        to: message.emailDestinatario,
        subject: "Olá, aqui é da Dog Love",
        text:"dasdas"
    });
}

function returnTheHTML(data){

    return `<h1>DEU MATCH!!!!</h1>
    <p>Nós da equipe <a href="https://pt.stackoverflow.com/questions/236239/importar-html-nodemailer">Dog Love</a>
     informamos que sua solicitação para match entre ${data.dogName1} e ${data.dogName2} foi aceita.<br>Abaixo segue as informações de contato enviadas pelo usuário.</p> <br><br>

     <h3> Entre em contato:</h3>
     <a href="${data.contact}">${data.contact}</a>
    `



}