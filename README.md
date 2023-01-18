# Playcanvas Typescript Template

This template allows for the use of TypeScript in Playcanvas projects. It can be used to write ScriptComponents in either TypeScript or JavaScript, and it works as a one-way pipeline from Git to the Playcanvas Editor. Git and Playcanvas Editor branches are synced based on their names. If you are in different branches then sync won't be done.

# Why should you write your code with the repo?

The limitations of the Editor include the following:

-   No offline coding, so you cannot work in your own environment.
    -   No ability to use your favorite IDE, and the included version of VS Code has limitations.
    -   Only pure JavaScript is supported. You have to write code according to your .
    -   No type safety or TypeScript support.
-   No MR pipeline, which means:
    -   No reviews.
    -   The ability to overwrite code without anyone noticing.
    -   Potentially difficult conflicts and unexpected code overwriting.
-   It is easy to accidentally modify the global scope, which can lead to:
    -   Name collisions.
    -   High coupling.
-   No modules or require/import/export statements, so:
    -   You cannot use the NPM ecosystem or ScriptComponents written by the Playcanvas team.
    -   You have to break the DRY principle by copying and pasting repeating logic/utils/libs.
-   No unit tests or linting.
-   The possibility that someone else may change your code without you or anyone else knowing.

# Features of the repository

- TypeScript/Modern JavaScript.
- Git and Playcanvas Editor branches are synced based on their names.
- Github Actions.
- ESLint.
- Github Codespace (TODO: improve configs).

# Install

Since Github allows to have only one fork per account and it's suggested to have one git repo for one Playcanvas project. Suggested solution:
1. [Create a new empty repository](https://github.com/new)
2. `git clone https://github.com/<username>/<repo>.git`
3. `cd <repo>`
4. `git remote add upstream https://github.com/querielo/playcanvas-typescript-template.git`
5. `git pull upstream master`
6. Resolve the previous command
7. `git push origin master`


8. Copy `pcconfig.sample.json` and rename to `pcconfig.json`:
    - **PLAYCANVAS_API_KEY**: Copy API key (API token) from your PlayCanvas account page ([playcanvas.com/account](https://playcanvas.com/account)). Paste it into _pcconfig.json_ as **PLAYCANVAS_API_KEY**.
    - **PLAYCANVAS_PROJECT_ID**: Open your project in _Playcanvas Editor_. Open the browser console. Copy `config.project.id`. Paste it into _pcconfig.json_ as **PLAYCANVAS_PROJECT_ID**.
    - NOTE: `pcconfig.json` is in `.gitignore`, so it won't be committed to the repository.
9. Run `npm ci`.
10. Run `npm run watch`. Start development.

## Github Actions

To have your code automatically updated by [GitHub Actions](https://github.com/features/actions) after committing and merging on GitHub, you can set the following secrets for your project:

- **PLAYCANVAS_API_KEY**
- **PLAYCANVAS_PROJECT_ID**

[Github instruction](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository):
1. Go to your project's settings on GitHub.
2. Under "Secrets" -> "Actions", click "New repository secret".
3. Type in a name for the secret and the value of the secret.
4. Click "Add secret" to save the secret.

It is highly recommended to use this feature as it can help automate your workflow and ensure that your code in Playcanvas Editor is always up-to-date. Read more about [Billing for Github Actions](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions). Free accounts have about 2000 CI/CD minutes/month (read [here](https://github.com/pricing)) 


# Suggested development pipeline

1. Create a fork of the master branch in the Playcanvas Editor.
2. In git, create a fork of the main branch with the same name as the fork in the Playcanvas Editor.
3. Run `npm run watch` to begin development.
4. Once development is complete, create a merge request (MR) into the main branch in Github. Once the MR is approved, merge the branch in the Playcanvas Editor into _master_, and then merge the corresponding branch in Github into the _main_ branch. Go to the step 1.
