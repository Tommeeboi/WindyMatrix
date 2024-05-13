# WindyMatrix
A silly program that was created to organise Football teams fairly

Was originally going to be a website, but made into a simple command-line app for ease of use (and because I couldn't be bothered)

## How To Use
Navigate to the latest release (or click [here](https://github.com/Tommeeboi/WindyMatrix/releases)) and download the corresponding file:

- Windows: `windyMatrix.exe`
- MacOS: `windyMatrixMac`
- Linux: `windyMatrixLinux` (untested, use at your own risk)

Then simply double-click the file and it SHOULD open up in the terminal

## Source Code
**THIS IS NOT NEEDED IF YOU JUST WANT THE BASE APP**

If the compiled versions don't work for you, or you want to look at/modify the code, then you can download the source code through Code -> Download ZIP

**Install node.js if you haven't already!**

To use the default file, first install prompt-sync (`npm i prompt-sync`). Then just run `node windyMatrix`

To compile the source code, install pkg (`npm i -g pkg`), then compile with `pkg windyMatrix.js`

If you just want to compile for a specific platform, then run `pkg -t [PLATFORM] windyMatrix.js`. Replace [PLATFORM] with the corresponding value:

- Windows: `node??-win`
- macOS: `node??-macos`
- Linux: `node??-linux`

(Replace "??" with the first part of your node version, e.g. v18.15.0 would be `node20`)

**i have no idea what else to put here**