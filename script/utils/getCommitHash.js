const { exec } = require("child_process");

module.exports = async function getCommitHash() {
    return await new Promise((resolve, reject) => {
        exec("git rev-parse HEAD", (err, stdout) => {
            if (err || typeof stdout !== "string") {
                reject(new Error("Get commit hash: Something went wrong. Check your git config."));
            }

            resolve(stdout.trim());
        });
    });
};
