# Playcanvas Typescript Template

This template allows for the use of TypeScript in Playcanvas projects. It can be used to write ScriptComponents in either TypeScript or JavaScript, and it works as a one-way pipeline from Git to the Playcanvas Editor. Git and Playcanvas Editor branches are synced based on their names. If you are in different branches then sync won't be done.


## TypeScript ScriptComponent

```ts
import { attribute, createScript } from "../utils/scriptDecorators";

@createScript("myAwesomeScript")
export class MyAwesomeScript extends pc.ScriptType {
    @attribute({
        type: "string",
    })
    public stringAttribute?: string;

    @attribute({
        type: "number",
        default: 0,
    })
    public numberAttribute: number = 0;

    public initialize() {}

    public postInitialize(): void {}

    public update(dt: number) {}

    public postUpdate(): void {}

    public swap(): void {}
}
```

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

# Project structure

-   `src/` --- source code. Write your code here. (ScriptComponents, ScriptSystems, utils, React/Vue/Svelte and so on)
    -   `src/components/` --- ScriptComponents.
    -   `src/index.ts` --- entry point. You should import all your code here.
-   `dist/` --- compiled code. The directory is uploaded to your Playcanvas project. This folder is ignored by git.
-   `pcconfig.sample.json` --- sample config file. Copy it to `pcconfig.json` and fill in the values. `pcconfig.json` is ignored by git. Read more about pcconfig in [Local Install](#local-install).
-   `script/` --- scripts for syncing with Playcanvas Editor.

# Features of the repository

-   TypeScript/Modern JavaScript.
-   Git and Playcanvas Editor branches are synced based on their names.
-   Github Actions.
-   ESLint.
-   Github Codespace (TODO: improve configs).

# Setup

## Create a repo for your Playcanvas project

Since

1. Github allows to have only one fork per account
2. it is suggested to have one git repo for one Playcanvas project.

you can create a fork repo manually:

1. [Create a new empty repository on Github](https://github.com/new)
2. `git clone https://github.com/<username>/<repo>.git` --- clone the new repository
3. `cd <repo>` --- navigate to the repository
4. `git remote add upstream https://github.com/querielo/playcanvas-typescript-template.git` --- add the upstream repository
5. `git pull upstream main --allow-unrelated-histories` --- pull upstream main
6. Resolve any conflicts that may have arisen from the previous command
7. `git push origin main` --- push origin main
8. Change license in `LICENSE` file if needed.

## Local Install

1. Fork and clone the repository
2. Copy `pcconfig.sample.json` and rename to `pcconfig.json`:
    - **PLAYCANVAS_API_KEY**: Copy API key (API token) from your PlayCanvas account page ([playcanvas.com/account](https://playcanvas.com/account)). Paste it into _pcconfig.json_ as **PLAYCANVAS_API_KEY**.
    - **PLAYCANVAS_PROJECT_ID**: Open your project in _Playcanvas Editor_. Open the browser console. Copy `config.project.id`. Paste it into _pcconfig.json_ as **PLAYCANVAS_PROJECT_ID**.
    - NOTE: `pcconfig.json` is in `.gitignore`, so it won't be committed to the repository.
3. Run `npm ci`.
4. Run `npm run watch`. Start development.

## NPM Scripts

-   `npm run watch` --- watch for changes in `src/` and compile them to `dist/`. It also syncs the code with the Playcanvas Editor. It is recommended to run this command while developing.
-   `npm run watch:dev` --- similar to `npm run watch`, but it builds the code in `src/` to `dist/` without minification. It's useful for debugging.
-   `npm run build` --- compile the code in `src/` to `dist/`.
-   `npm run push` --- push the code in `dist/` to the Playcanvas Editor.
-   `npm run lint` --- run ESLint.
-   `npm run lint:fix` --- run ESLint and fix errors.

## Github Actions

To have your code automatically updated by [GitHub Actions](https://github.com/features/actions) after committing and merging on GitHub, you can set the following secrets for your project:

-   **PLAYCANVAS_API_KEY**
-   **PLAYCANVAS_PROJECT_ID**

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
