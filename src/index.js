const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['DirectMessages', 'DirectMessageReactions' , 'Guilds', 'GuildBans', 'GuildMessageTyping', 'GuildEmojisAndStickers', 'GuildIntegrations', 'GuildPresences', 'GuildScheduledEvents', 'GuildVoiceStates', 'GuildWebhooks', 'GuildMessageReactions' , 'GuildMessages' , 'MessageContent', '']
});
const CONFIG = require('./config.json');
const {messageLink, parseResponse} = require("discord.js");
const {create} = require("discord.js/src/WebSocket");
const { EmbedBuilder } = require('discord.js');
const prefix = '!';

///Mensaje canal bot encendido
client.on('ready', () => {
    client.channels.cache.get('[REDACTED]').send('Bot encendido :)')
});

///Hora USA y ESP
client.on('messageCreate', timemsg => {
    if (timemsg.content === prefix+'time'){
        let d = new Date();
        let time = d.toLocaleTimeString('en-US', { timeZone: 'America/New_York'});
        timemsg.reply({
            content: `The time is ${time}`,
        })
    }
})
client.on('messageCreate', horamsg => {
    if (horamsg.content === prefix+'hora'){
        let d = new Date();
        let time = d.toLocaleTimeString('en-UK', { timeZone: 'Europe/Madrid'});
        horamsg.reply({
            content: `Son las ${time}`,
        })
    }
})

///Mensaje consola conectado
client.login(CONFIG.token).then(() => console.log(`${client.user.username} se ha conectado.`));

///Mensaje consola prefijo
client.on('ready', () => {
   console.log(`El prefijo es ${prefix}`);
});

///uwu
client.on('messageCreate', uwu => {
    let canal = uwu.channelId
    if(uwu.content === `${prefix}uwu`) {
        client.channels.cache.get(canal).send('https://tenor.com/view/uwu-smug-anime-stare-gif-17603924')    }
});

///Tq
client.on('messageCreate', tq => {
    if (tq.author.bot === false && tq.content === 'tq') {
        let canal = tq.channelId
        client.channels.cache.get(canal).send('Yo si que te quiero bb')
    }
});

///Convertidor mi km
client.on('messageCreate', mk => {
    if (mk.author.bot === false && mk.content === `${prefix}mi`) {
        let convertido = false
        let canal = mk.channelId
        client.on("messageCreate", mi => {
            if(mi.author.bot === false && !convertido) {
                let miles = mi.content
                let fmiles = parseFloat(miles)
                let km = fmiles*1.60934
                mi.reply(`${mi} miles = ${km} km`)
                client.channels.cache.get(canal).send("Fun fact:" + "```fix" + "\n16 km =~ 10 mi" + "\n```")
                convertido = true
            }
        })
    }
    if (mk.author.bot === false && mk.content === `${prefix}km`) {
        let convertido = false
        let canal = mk.channelId
        client.on("messageCreate", km => {
            if(km.author.bot === false && !convertido) {
                let kilometros = km.content
                let fkilometros = parseFloat(kilometros)
                let mi = fkilometros*0.621371192
                km.reply(`${km} km = ${mi} miles`)
                client.channels.cache.get(canal).send("Fun fact:" + "```fix" + "\n16 km =~ 10 mi" + "\n```")
                convertido = true
            }
        })
    }
});

///Convertidor ºC ºF
client.on('messageCreate', cf => {
    if (cf.author.bot === false && cf.content === `${prefix}F`) {
        let convertido = false
        let canal = cf.channelId
        client.on("messageCreate", F => {
            if(F.author.bot === false && !convertido) {
                let fahrenheit = F.content
                let ffahrenheit = parseFloat(fahrenheit)
                let C = (ffahrenheit-32)*5/9
                F.reply(`${F} ºF = ${C} ºC`)
                client.channels.cache.get(canal).send("Fun fact:" + "```fix" + "\n32 ºF = 0 ºC" + "\n```")
                convertido = true
            }
        })
    }
    if (cf.author.bot === false && cf.content === `${prefix}C`) {
        let convertido = false
        let canal = cf.channelId
        client.on("messageCreate", C => {
            if(C.author.bot === false && !convertido) {
                let celsius = C.content
                let fcelsius = parseFloat(celsius)
                let F = (fcelsius*9/5)+32
                C.reply(`${C} ºC = ${F} ºF`)
                client.channels.cache.get(canal).send("Fun fact:" + "```fix" + "\n32 ºF = 0 ºC" + "\n```")
                convertido = true
            }
        })
    }
});

///Tiempo
let ciudadesreg = {
    "Boston": [
        {
            "la": 42.37,
            "lo": -71.02,
        }
    ],
    "Leon": [
        {
            "la": 42.60,
            "lo": -5.57,
        }
    ]
}
client.on("messageCreate", tiempo =>{
    if(tiempo.author.bot===false && tiempo.content===`${prefix}tiempo`) {
        let flag = false
        let canal = tiempo.channelId
        client.on("messageCreate", ciudad => {
            if(ciudad.author.bot===false && flag===false) {
                let nomCiu = ciudad.content
                for (const ej in ciudadesreg)
                    if(ej === nomCiu) {
                        let laC = ciudadesreg[nomCiu][0].la
                        let loC = ciudadesreg[nomCiu][0].lo
                        fetch(`[INTODUCE API KEY] https://api.open-meteo.com`)
                            .then((response)=>response.json())
                            .then((data)=>{
                                client.channels.cache.get(canal).send(`Hace ${data.current_weather.temperature} ºC en ${nomCiu}`)
                            })
                    }
                else {}
            }
            flag = true
        })
    }
    if(tiempo.author.bot===false && tiempo.content===`${prefix}weather`) {
        let flag = false
        let canal = tiempo.channelId
        client.on("messageCreate", ciudad => {
            if(ciudad.author.bot===false && flag===false) {
                let nomCiu = ciudad.content
                for (const ej in ciudadesreg)
                    if(ej === nomCiu) {
                        let laC = ciudadesreg[nomCiu][0].la
                        let loC = ciudadesreg[nomCiu][0].lo
                        fetch(`[INTODUCE API KEY] https://api.open-meteo.com`)
                            .then((response)=>response.json())
                            .then((data)=>{
                                client.channels.cache.get(canal).send(`It's ${data.current_weather.temperature} ºF in ${nomCiu}`)
                            })
                    }
                    else {}
            }
            flag = true
        })
    }
})