const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {

 let kayityetkili = '784786426578599937' //YETKİLİ İD                 
let ver = '784786386834161694' //VERİLİCEK ROL İD
let al = '784786389111537684' //ALINICAK ROL İD
let isimön = 'TAG ・ ' // TAG

  if(!message.member.roles.cache.has(kayityetkili))  
  return message.channel.send(`**Üzgünüm Bu Komudu Sadece Ayarlanmış Yetkililer Kullanabilir!**`);
  let member = message.mentions.members.first()
  let isim = args[1]
  let yaş = args[2] 
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)        
  let toplamaisim = `${isimön} ${isim}`
  if (!member) return message.channel.send('** Lütfen Bir Üye Etiketleyiniz!**')
  if (!isim) return message.channel.send('** Lütfen Bir İsim Yazınız!**')
 
      setTimeout(function(){
  member.roles.add(ver)
  },800)
  setTimeout(function(){
  member.setNickname(`${isimön} ${isim}`)
  },1000)
  setTimeout(function(){
  member.roles.remove(al)
  },2000)


let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) + 1 || '0'

  if(kayıtlımı !== 'evet') {             
  db.add(`kayıte_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}` , 1) 
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)                      
  db.add(`toplamik_${member.id}`, 1)  
  let embed = new Discord.MessageEmbed()
  .setTitle('Bu İşlem Başarılı')
  .setDescription(`
  **Kayıt Edilen Kullanıcı ・ ${member}** 
 **Verilen Rol ・ **<@&${ver}>  \n
   **Kayıt Eden Yetkili ・** <@!${message.author.id}>
 **Bu Yetkili Toplamda ・ ${toplam} Kişi Kayıt Etmiş**
`)
message.channel.send(embed)
  }  
  if(kayıtlımı === 'evet'){
  db.set(`kayıtlıisim_${member}`, toplamaisim)                   
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)           
    let embed = new Discord.MessageEmbed()
    .setTitle('Uyarı')
  .setDescription(` **Bu Kişi Daha Öncedende Kayıt Edilmiş?**                 
                      
**Eski Adı ・ ** \`${eskiismi}\``)
message.channel.send(embed)
  }
};  

exports.conf = {                 
  enabled: true,
  guildOnly: true,
    aliases: ['Kayıt'],
  permLevel: 0
}
exports.help = {
  name: 'kayıt',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}