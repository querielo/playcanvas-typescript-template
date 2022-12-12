const { exec } = require("child_process");

module.exports = async function getGitBranchName() {
    return (
        process.env.GITHUB_HEAD_REF ||
        (await new Promise((resolve, reject) => {
            exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
                if (err || typeof stdout !== "string") {
                    reject(new Error("Git branch name: Something went wrong. Check your git config."));
                }

                let branchName = stdout.trim();

                // NOTE: GitHub uses "main" as the default branch name,
                // but we use "master" in the engine
                if (branchName === "main") {
                    branchName = "master";
                }

                resolve(branchName.toLocaleLowerCase());
            });
        }))
    );
};
