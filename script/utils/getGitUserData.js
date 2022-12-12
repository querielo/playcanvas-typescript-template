const os = require("os");

const { exec } = require("child_process");

module.exports = async function getGitUserData() {
    return await new Promise((resolve, reject) => {
        exec("git config --list", (err, stdout) => {
            if (err || typeof stdout !== "string") {
                reject(new Error("Git user data: Something went wrong. Check your git config."));
            }

            const configList = stdout.split(os.EOL).map((line) => line.split("="));
            const userData = {};

            for (const line of configList) {
                if (line[0] === "user.email") {
                    userData["email"] = line[1];
                } else if (line[0] === "user.name") {
                    userData["name"] = line[1];
                }
            }

            resolve(userData);
        });
    });
};
