const fs = require("fs");
const path = require("path");

const chalk = require("chalk");

const ApiClient = require("playcanvas-sync/src/api-client");

const getGitBranchName = require("./getGitBranchName");

function readPcConfig() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "pcconfig.json")));
    } catch (e) {
        // if there is no pcconfig.json, try to read environment variables
        if (process.env.PLAYCANVAS_API_KEY && process.env.PLAYCANVAS_PROJECT_ID) {
            return {
                PLAYCANVAS_API_KEY: process.env.PLAYCANVAS_API_KEY,
                PLAYCANVAS_PROJECT_ID: process.env.PLAYCANVAS_PROJECT_ID,
            };
        } else {
            console.log(
                chalk.bgRed.white.bold(`Copy pcconfig.sample.json into pcconfig.json.
You can also set environment variables: PLAYCANVAS_API_KEY, PLAYCANVAS_PROJECT_ID`)
            );
            throw e;
        }
    }
}

async function getEditorBranchId(config) {
    const api = new ApiClient("https://playcanvas.com", config.PLAYCANVAS_API_KEY);

    const branches = await api.getEditorBranches(config.PLAYCANVAS_PROJECT_ID);

    let editorBranch;
    for (const branch of branches) {
        const branchName = branch.name.toLocaleLowerCase();

        if (
            config.PLAYCANVAS_BRANCH_NAME === branchName ||
            (branchName === "master" && config.PLAYCANVAS_BRANCH_NAME === "main") ||
            (branchName === "main" && config.PLAYCANVAS_BRANCH_NAME === "master")
        ) {
            editorBranch = branch;

            break;
        }
    }

    // if we are in CI, we don't need to check if the branch is the current one
    if (process.env.CI) {
        return editorBranch && editorBranch.id;
    }

    // if the branch is the current Playcanvas branch, return the branch id else return undefined
    const editorBranchId = (await api.getCurEditorBranch(config.PLAYCANVAS_PROJECT_ID)).id;

    return editorBranch?.id === editorBranchId ? editorBranchId : undefined;
}

module.exports = async function getPlaycanvasConfig() {
    const config = readPcConfig();

    config.PLAYCANVAS_BRANCH_NAME = await getGitBranchName();

    const editorBranchId = await getEditorBranchId(config);

    return {
        PLAYCANVAS_API_KEY: config.PLAYCANVAS_API_KEY,
        PLAYCANVAS_PROJECT_ID: config.PLAYCANVAS_PROJECT_ID,
        PLAYCANVAS_BRANCH_ID: editorBranchId,
        PLAYCANVAS_TARGET_DIR: path.join(__dirname, "..", "..", "dist"),
        PLAYCANVAS_BRANCH_NAME: config.PLAYCANVAS_BRANCH_NAME,
        PLAYCANVAS_BAD_FILE_REG: "^\\.|~$",
        PLAYCANVAS_BAD_FOLDER_REG: "\\.",
    };
};
