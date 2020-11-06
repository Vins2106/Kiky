const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment } = require('discord.js')
const { NovelCovid } = require("novelcovid")
const track = new NovelCovid();

const width = 800
const height = 600

const chartCallback = (ChartJS) => {
  ChartJS.plugins.register({
    beforeDraw: (chartInstance) => {
      const { chart } = chartInstance
      const { ctx } = chart
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, chart.width, chart.height)
    },
  })
}

exports.run = async (client, message, args, color, prefix, serverQueue, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const m = await message.channel.send("**Loading, Please wait 1 - 3 seconds!**")
  
      const days = parseInt(args) || 30

    const url = 'https://api.covidtracking.com/v1/us/daily.json'
    let { data: results } = await axios.get(url)
    results = results.slice(0, days).reverse()

    const labels = []
    const deaths = []
    const cases = []
    const recovered = []

    for (const result of results) {
      let date = String(result.date)
      const year = date.substring(0, 4)
      const month = date.substring(4, 6)
      const day = date.substring(6, 8)
      labels.push(`${day}/${month}/${year}`)

      deaths.push(result.death)
      cases.push(result.positive)
      recovered.push(result.recovered)
    }

    const canvas = new CanvasRenderService(width, height, chartCallback)

    const configuration = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Cases',
            data: cases,
            color: '#7289d9',
            backgroundColor: '#7289d9',
            borderColor: '#7289d9',
            fill: false,
          },
          {
            label: 'Deaths',
            data: deaths,
            color: '#b32f38',
            backgroundColor: '#b32f38',
            borderColor: '#b32f38',
            fill: false,
          },
          {
            label: 'Recovered',
            data: recovered,
            color: '#592ec2',
            backgroundColor: '#592ec2',
            borderColor: '#592ec2',
            fill: false,
          },
        ],
      },
    }

    const image = await canvas.renderToBuffer(configuration)

    const attachment = new MessageAttachment(image)

    
    let corona = await track.all();

    setTimeout(function() {
      message.channel.send(`here the covid-19 stats!
**active**: \`${corona.active.toLocaleString()}\`
**cases**: \`${corona.cases.toLocaleString()}\`
**deaths**: \`${corona.deaths.toLocaleString()}\`
**recovered**: \`${corona.recovered.toLocaleString()}\`
`, attachment).then(() => {m.delete()})
    }, 3000);
  
}

exports.conf = {
    aliases: ['corona'],
    cooldown: "5"
}

exports.help = {
    name: 'covid',
    description: 'Get corona stats',
    usage: 'covid'
}