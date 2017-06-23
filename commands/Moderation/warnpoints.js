const Discord = require('discord.js');
const Sequelize = require('sequelize');
const warnpoints = new Sequelize({
  dialect: 'sqlite',

  storage: './warnpoints.sqlite',

  logging: false
});

const warnList = warnpoints.define('warnList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: Sequelize.INTEGER
    },
    warnpoints: {
        type: Sequelize.INTEGER
    }
});

warnList.sync();


exports.run = async (client, msg) => {
let member = msg.mentions.users.first();
    let author = msg.author; 
    if(member && msg.member.hasPermission('BAN_MEMBERS')) {
         user = member;
    } else {
         user = author;
    }

    const userSnowflake = user.id
    warnList.find({where:{userID:userSnowflake}}).then((res) => {
        if (res === null) { 
            msg.delete(0);
            msg.reply('You have **0** warning points.');
        } else if (res === null && member) {
             msg.delete(0);
             msg.reply(`${member.user.username} has **${res.warnpoints}** warning points.`);
       } else { 
          if (res.warnpoints) {
             msg.delete(0);  
             msg.reply(`You have **${res.warnpoints}** warning points.`).catch(console.error);
        }
     }});

}


exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "warnpoints",
  description: "checks your wanrpoints.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
}; 
