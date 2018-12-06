const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
   console.log("Estoy listo!");
});
var prefix = config.prefix;

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;
  
  //if (message.content.startsWith(prefix + "invite")) {
   // message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=515312834574549003&permissions=0&scope=bot");
 // } else
  if (message.content.startsWith(prefix +"invite")) {
    message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=515312834574549003&permissions=0&scope=bot");
  }
  if (message.content.startsWith(prefix + "test")) {
      message.channel.send("test..")
  }
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let texto = args.join(" ");
if(command === 'decir'){
    if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
    message.channel.send(texto);
    
}

if (command === 'ping') {
    let ping = Math.floor(message.client.ping);

    message.channel.send(":ping_pong: Pong!")
    .then(m => {
         const embed = new Discord.RichEmbed()
         .setDescription(`:incoming_envelope: Ping Mensajes: \`${m.createdTimestamp - message.createdTimestamp} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``)
         .setColor(0x00AE86)
                    
         m.edit({embed});
    
    });
    
  }
  if(command === 'avatar'){

    let img = message.mentions.users.first()
    if (!img) {

        const embed = new Discord.RichEmbed()
        .setImage(`${message.author.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
        message.channel.send({ embed });

    } else if (img.avatarURL === null) {

        message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

    } else {

        const embed = new Discord.RichEmbed()
        .setImage(`${img.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embed });

    };

}

if(command === 'ban'){
    
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if(!razon) return message.channel.send('Escriba un razón, `-ban @username [razón]`');
    if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
    

    message.guild.member(user).ban(razon);
    message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);

}
if(command === 'server'){

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });

  }

  if(command === 'user'){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
  }
  if(command === 'addrol'){

    let miembro = message.mentions.members.first();
    let nombrerol = args.slice(1).join(' ');

    let role = message.guild.roles.find("name", nombrerol);
    let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
     
    if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
    if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `-addrol @username [rol]`');
    if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
    miembro.addRole(role).catch(console.error);
    message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);

  }
  if(command === 'removerol'){

    let miembro = message.mentions.members.first();
    let nombrerol = args.slice(1).join(' ');

    let role = message.guild.roles.find("name", nombrerol);
    let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
     
    if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
    if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover, `-removerol @miembro [rol]`');
    if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
    miembro.removeRole(role).catch(console.error);
    message.channel.send(`El rol **${role.name}** del miembro **${miembro.user.username}** fue removido  correctamente.`);

  }
if(command === 'amor'){
    let users = message.mentions.users.map(m => m.username).join(' y ');
if(!users) return message.channel.send('Mencione a dos usuarios para calcular');
    
const random = Math.floor(Math.random() * 100);
let heard = "";
 
    if(random < 50){
        heard=':broken_heart:';

    }else if(random < 80){
        heard=':sparkling_heart: ';
        
    }else if(random < 101){
        heard=':heart:';

    }
            
const embed = new Discord.RichEmbed()
    .setAuthor('El porcentaje de amor de '+users+' es:')
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(0xff4d4d)

message.channel.send({embed});

}
if(command === 'pescar'){
    let rollfish = Math.floor(Math.random() * 7) +1;
if(rollfish === 1){
    message.channel.send('Felicitaciones, ' + message.author.username + '! pescaste: :tropical_fish:');

}else if(rollfish === 2){
    message.channel.send('Felicitaciones, ' + message.author.username + '! pescaste: :fish:');

}else {
     
    message.channel.send('Felicitaciones, ' + message.author.username + '! pescaste: :mans_shoe:  ');
}
}
if(command === 'encuesta'){
    if(!args) return message.channel.send('Agrege una pregunta para la encuesta.')

const embed = new Discord.RichEmbed()
      .setAuthor('Pregunta:')
      .setDescription('**'+args+'**\n▔▔▔▔▔▔▔▔▔▔▔')
      .addField('Opcion 1', '1\u20e3 Si')
      .addField('Opcion 2', '2\u20e3 No')
      .setColor(0xff4d4d)
      .setTimestamp()

message.channel.send({embed})
.then(m => {
        m.react("1\u20e3");
        m.react("2\u20e3");

});
}

});
client.on("ready", () => {
    console.log("Estoy listo!");
    
    client.user.setPresence( {
        status: "online",
        game: {
            name: "playing",
            type: "PLAYING"
        }
    } );
 
 });
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.login(process.env.TOKEN) 