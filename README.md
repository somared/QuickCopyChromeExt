# Quick Copy chrome extension overview

Quickly copy configured text to clipboard with two clicks. Sync configured text across devices.

![Promo Tile](docs/publish/screenshots/img_2.png)
#### [Chrome webstore link](https://chrome.google.com/webstore/detail/quick-copy/llemocbeniphffbfjifkpkdkheicomdf)

#### [Microsoft Edge Add-ons link](https://microsoftedge.microsoft.com/addons/detail/quick-copy/giodfegjpbcahiaegpmccclhgolnpldc) 

&nbsp;

# Configuring and running the project

## Installation
1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository
3. Run `npm install` from root directory of the project

&nbsp;

## Troubleshooting
If you encounter dependency-related errors when running `npm start` or building the project:

1. Clear the npm cache and reinstall dependencies:
   ```bash
   npm cache clean --force
   npm install
   ```

2. If you still see errors about missing modules (like 'ajv/dist/compile/codegen'):
   ```bash
   npm install ajv ajv-keywords
   ```

3. For persistent issues, try reinstalling with the legacy peer deps flag:
   ```bash
   npm install --legacy-peer-deps
   ```

&nbsp;

## Development and Production Modes

The extension automatically detects whether it's running in development or production mode:

### Development Mode
- Automatically uses test data from `testData.json`
- Doesn't attempt to access Chrome storage APIs
- Shows a red "DEVELOPMENT MODE" banner in the UI
- Logs development-specific messages to the console
- Activated when running with `npm start` or when Chrome APIs aren't available

### Production Mode
- Uses Chrome storage for persistence
- No development indicators in the UI
- Activated when built and running as an extension

&nbsp;

## Running the extension on chrome (or edge) in developer mode
1. Build the project using following command from root directory  
`npm run-script build-no-embed-script`
2. A `build` directory will be created at root of project. 
3. Follow the instructions at this [link](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) and load the `build` directory as extension 

&nbsp;

## Running on web browser (not as extension)
You can run the app directly in a browser (not as an extension) for faster UI development:

1. Simply run `npm start` from the root directory
2. The app will automatically run in development mode with test data
3. A browser window will open with the application running

The app now automatically detects it's not running as an extension and will use test data from `testData.json`.

&nbsp;

# Contribution
Check out [Issues](https://github.com/somared/QuickCopyChromeExt/issues) on Github of this project and send pull request for bug fix or enhancement.