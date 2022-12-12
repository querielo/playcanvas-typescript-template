const { exec } = require("child_process");

module.exports = async function getGitBranchName() {
    return (
        process.env.GITHUB_HEAD_REF ||
        (await new Promise((resolve, reject) => {
            exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
                if (err || typeof stdout !== "string") {
                    reject(new Error("Git branch name: Something went wrong. Check your git config."));
                }

                resolve(stdout.trim().toLocaleLowerCase());
            });
        }))
    );
};
