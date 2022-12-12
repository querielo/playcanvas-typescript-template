#!/usr/local/bin/node

const { exec } = require("child_process");

const chalk = require("chalk");

const getPlaycanvasConfig = require("./utils/getPlaycanvasConfig");

(async function () {
    const envVariables = await getPlaycanvasConfig();

    if (envVariables.PLAYCANVAS_BRANCH_ID) {
        const watchProcess = exec(
            `node "node_modules/playcanvas-sync/pcwatch" -f`,
            {
                env: envVariables,
            },
            function (err) {
                if (err) {
                    console.error(chalk.bgRed.white(`Cannot watch the ${envVariables.PLAYCANVAS_BRANCH_NAME} branch.`));

                    return;
                }

                console.log("Everything is fine. Assets are watched successfully");
            }
        );

        watchProcess.stdout.pipe(process.stdout);
        watchProcess.stderr.pipe(process.stderr);
    } else {
        const errorMessage = `The Editor branch is not ${envVariables.PLAYCANVAS_BRANCH_NAME}.
Switch the branch in PlayCanvas Editor.`;
        console.error(chalk.bgRed.white(errorMessage));
        process.exit(1);
    }
})();
