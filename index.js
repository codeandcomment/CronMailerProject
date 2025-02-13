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

    const joke_data = await axios.get("https://v2.jokeapi.dev/joke/any");
    console.log(joke_data.data);
    const email_body = EmailTemplate(news.data);

}


const EmailTemplate = (joke_data) =>{

    const template = `<html>
    <title>Jokes</title>
    <body>
        <h2>${joke_data.joke}</h2>
    </body>
    </html>`;

    return template;
}

