const fse = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const PLAYCANVAS_SYNC_PATH = path.join(__dirname, "..", "node_modules", "playcanvas-sync");
const OVERWRITE_PATH = path.join(__dirname, ".", "assets", "playcanvas-sync");

fse.copy(OVERWRITE_PATH, PLAYCANVAS_SYNC_PATH, (err) => {
    if (err) {
        console.error(chalk.bgRed.white("Something went wrong while postinstall"), err);
    }

    console.log("Postinstall script finished");
});
