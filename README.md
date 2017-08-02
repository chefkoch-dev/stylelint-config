##Installation
Install the required dependencies into your project:

```
npm install --save-dev stylelint git+ssh://git@jira.chefkoch.de:7999/geist/chefkoch-style-linting.git
```

Create a `.stylelintrc` configuration file in your project root directory with following content:

```
{
  "extends": "chefkoch-style-linting"
}
```

##CLI Usage
You are now able to call the command line interface of stylelint:
```
node_modules/.bin/stylelint <path to sccs files>
```