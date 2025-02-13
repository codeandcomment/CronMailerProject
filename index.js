import axios from "axios";
import { CronJob } from "cron";
import nodemailer from 'nodemailer';


// cron job
const job = new CronJob(
        '*/10 * * * * *',
        function(){
            fetchJokeData()
            console.log('Cron executed every 5 sec')
        },
        null,
        true
)

//fetch 
const fetchJokeData = async() =>{

    const joke_data = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    const email_body = EmailTemplate(joke_data.data);
    sendmail(email_body);
}


const EmailTemplate = (joke_data) =>{
    console.log(joke_data);
    const template = `<html>
            <head><title>Joke of the Day</title></head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: blue;">😂 Joke of the Day</h2>
                <p style="font-size: 18px;">${joke_data.joke || "No joke available"}</p>
                <hr>
                <footer style="font-size: 12px; color: gray;">Enjoy your day! 😄</footer>
            </body>
        </html>`;

    return template;
}

const sendmail = async(template) =>{

    let transporter = nodemailer.createTransport({
        service: "gmail", // or use SMTP settings
        auth: {
            user: "infinityjaithra@gmail.com",
            pass: "hsbg ielj pntz syvj", // Use app password if using Gmail
        },
    });

    let info = await transporter.sendMail({
        from: '"Jokes" <jaithracoorg@gmail.com>',
        to: "jaithracoorg@gmail.com",
        subject: "Jokes",
        html: template, // HTML email body
    });

    console.log("Message sent: %s", info.messageId);
    return true;
}