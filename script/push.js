#!/usr/local/bin/node

const { exec } = require("child_process");

const chalk = require("chalk");

const getPlaycanvasConfig = require("./utils/getPlaycanvasConfig");

(async function () {
    const envVariables = await getPlaycanvasConfig();

    if (envVariables.PLAYCANVAS_BRANCH_ID) {
        const pushProcess = exec(
            'node "node_modules/playcanvas-sync/pcsync.js" pushAll -y',
            {
                env: envVariables,
            },
            function (err) {
                if (err) {
                    console.error(
                        chalk.bgRed.white(`Cannot upload the ${envVariables.PLAYCANVAS_BRANCH_NAME} branch.`)
                    );

                    return;
                }

                console.log("Everything is fine. Assets are uploaded successfully");
            }
        );

        pushProcess.stdout.pipe(process.stdout);
        pushProcess.stderr.pipe(process.stderr);
    } else {
        const errorMessage = `The Editor branch is not ${envVariables.PLAYCANVAS_BRANCH_NAME}.
Switch the branch in PlayCanvas Editor.`;
        console.error(chalk.bgRed.white(errorMessage));
    }
})();
