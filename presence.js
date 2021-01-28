#!/bin/node

const RPC = require('discord-rpc')
const chalk = require('chalk')
const fs = require('fs')
const os = require('os')

const client = new RPC.Client({ transport: 'ipc' })

const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming' : '/.config'}`
const rawdata = fs.readFileSync(`${dir}/drpcm-options.json`)
const options = JSON.parse(rawdata)

// console.log(options);

const activity = {}
const assets = {}

if (options.largeimage !== '') {
  assets.large_image = options.largeimage
  // If you change this and some asks about this, please still give me credit :)
  assets.large_text = "Made with ThatOneCalculator's Discord RPC Maker (v1.7.1)!"
}
if (options.smallimage !== '') {
  assets.small_image = options.smallimage
  // Same applies with assets.large_text
  assets.small_text = 'https://github.com/ThatOneCalculator/DiscordRPCMaker'
}
if (assets !== {}) { activity.assets = assets }
if (options.description !== '') { activity.details = options.description }
if (options.state !== '') { activity.state = options.state }
if (options.buttons.length !== 0) { activity.buttons = options.buttons }

client.on('ready', () => {
  client.request('SET_ACTIVITY', {
    pid: process.pid,
    activity: activity
  })
  console.log(chalk`{bold.green Your Rich Presence has started!} Generated by {blue.underline https://github.com/ThatOneCalculator/DiscordRPCMaker}`)
})

client.login({ clientId: options.clientid })
