const fs = require('fs')

const channel = (process.env.CHANNEL || 'stable')
const files = fs.readdirSync('dist/electron/Packaged')

const input = 'dist/electron'
const output = `dist/releases/${channel}`

if (!fs.existsSync('dist/releases')) {
  fs.mkdirSync('dist/releases')
}

if (!fs.existsSync(output)) {
  fs.mkdirSync(output)
}

for (let i = 0, len = files.length; i < len; i += 1) {
  let file = files[i]
  let filePath = `${input}/Packaged/${file}`
  let fileInfo = fs.lstatSync(filePath)
  if (!fileInfo.isDirectory()) {
    let newPath = `${output}/${file}`
    fs.copyFileSync(filePath, newPath, error => {
      if (error) throw error
      else console.info(`${file} copied`)
    })
  }
}
