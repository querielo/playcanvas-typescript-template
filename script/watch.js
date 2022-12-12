#!/usr/local/bin/node

const { exec } = require("child_process");

const chalk = require("chalk");

const getPlaycanvasConfig = require("./utils/getPlaycanvasConfig");
const sleep = require("./utils/sleep");

(async function () {
    const envVariables = await getPlaycanvasConfig();

    if (envVariables.PLAYCANVAS_BRANCH_ID) {
        console.log(chalk.bgWhite.blue(`Watching the ${envVariables.PLAYCANVAS_BRANCH_NAME} branch.`));
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
        const errorMessage = `The Editor branch is not ${chalk.bold(envVariables.PLAYCANVAS_BRANCH_NAME)}.
Switch the branch in PlayCanvas Editor.`;
        console.error(chalk.bgRed.white(errorMessage));
        process.exit(1);
    }

    while (true) {
        await sleep(100);
        const currentEnvVariables = await getPlaycanvasConfig();
        if (currentEnvVariables.PLAYCANVAS_BRANCH_ID !== envVariables.PLAYCANVAS_BRANCH_ID) {
            const errorMessage = `The working branch has been changed.
Switch the branch in PlayCanvas Editor to ${chalk.bold(currentEnvVariables.PLAYCANVAS_BRANCH_NAME)}.`;
            console.error(chalk.bgRed.white(errorMessage));
            process.exit(1);
        }
    }
})();
