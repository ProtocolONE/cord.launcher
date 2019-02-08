// --- from https://css-tricks.com/svg-symbol-good-choice-icons/

const fs = require('fs')
const path = require('path')

const [iconsPath, encoding] = ['./src/assets/icons', 'utf-8']
const folder = path.resolve(global.appRoot, iconsPath)
const icons = fs.readdirSync(folder).filter(filterBySvgExtension)

function filterBySvgExtension (filePath) {
  return path.extname(filePath) === '.svg'
}

function getWrappedSvg (filePath) {
  let file = path.resolve(global.appRoot, `${ iconsPath }/${ filePath }`)
  let fileName = path.basename(file, '.svg')
  let html = fs.readFileSync(file, encoding)
  let matches = getAllSvgMatches(html)

  try {
    let viewBox = getViewBox(matches)
    let svgContent = getSvgContent(matches)
    return `
      <symbol id="${ fileName }" viewBox="${ viewBox }">
        ${ svgContent }
      </symbol>
    `
  }
  catch (error) {
    // --- skip
    console.error(error)
  }

  return ''
}

function getAllSvgMatches (html) {
  let pattern = /(<([^>]+)>)/ig
  return html.match(pattern)
}

function getSvgContent (matches = []) {
  return matches.splice(1, matches.length - 2)
}

function getViewBox (matches = []) {
  let pattern = /viewBox="([^"]*)"/
  let viewBoxes = matches[0].match(pattern)
  return (Array.isArray(viewBoxes)) ? viewBoxes[1] : ''
}

module.exports = function () {
  let html = icons.map(getWrappedSvg).join('')
  return `
    <svg xmlns="http://www.w3.org/2000/svg" hidden>
      ${ html }
    </svg>
  `
}
