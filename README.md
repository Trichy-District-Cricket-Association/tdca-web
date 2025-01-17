# Conventions

## Naming conventions:

Please refer [Airbnb Guidelines for naming.](https://github.com/airbnb/javascript/tree/master/react#naming)

### Example:

-   PascalCase for Components.
-   camelCase for Hooks.
-   snake_case for folder/directories.

## Linting Configuration:

Please refer [ESLint and Prettier for Typescript-Project](https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project)

## Miscellaneous:

-   Use TSDoc notation for comments for all `type`, `interface` and `class` used.
-   Install and use Typescript Extension Pack, `loiane.ts-extension-pack` VSCode extension.
-   Use commit messages like this: [Conventional Commits](https://dev.to/colewalker/conventional-commits-the-future-of-git-32gg)

## Custom Snippets:

Use this in a `.code-snippet` file for project-specific custom snippets(VSCode).

```
{
    "Export Functional Component -TSReact": {
        "scope": "typescript,typescriptreact",
        "prefix": "tfncmp",
        "body": ["const ${1:MyComp} =()=>", "(", "<div/>", ");", "", "export default ${1:MyComp};"],
        "description": "Create functional comp and export in TSReact"
    },
    "Create a new model": {
        "scope": "typescript,typescriptreact",
        "prefix": "tmdel",
        "body": [
            "export default class ${1:ModelName} {",
            "id: number;",
            "",
            "constructor(id: number) {",
            "this.id = id;",
            "}",
            "}"
        ],
        "description": "Create a new model"
    }
}

```

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
