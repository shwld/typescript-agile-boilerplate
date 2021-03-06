const fs = require('fs');

const models = fs
  .readdirSync('src/models')
  .filter((name) => name !== 'shared' && !/\.ts/.test(name))
  .map((it) => ({ name: it, value: it }));

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('aggregate', {
    description: 'aggregate',
    prompts: [
      {
        type: 'list',
        name: 'name',
        message: 'model name please',
        choices: models,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/aggregates/factories/{{camelCase name}}Factory.ts',
        templateFile: 'plop-templates/aggregates/factory.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/aggregates/repositoryInterfaces/{{pascalCase name}}Repository.ts',
        templateFile: 'plop-templates/aggregates/repository.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/aggregates/factories/index.ts',
        pattern: /[;]/,
        template: "export * from './{{camelCase name}}Factory';",
      },
      {
        type: 'append',
        path: 'src/aggregates/repositoryInterfaces/index.ts',
        pattern: /import.*[;]/,
        template:
          "import type { {{pascalCase name}}Repository } from './{{pascalCase name}}Repository';",
      },
      {
        type: 'append',
        path: 'src/aggregates/repositoryInterfaces/index.ts',
        pattern: /export interface Aggregates {/,
        template: '  {{camelCase name}}: {{pascalCase name}}Repository;',
      },
    ],
  });
  plop.setGenerator('model', {
    description: 'model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'model name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/models/{{camelCase name}}/{{pascalCase name}}Entity.ts',
        templateFile: 'plop-templates/models/entity.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{camelCase name}}/{{pascalCase name}}Entity.test.ts',
        templateFile: 'plop-templates/models/entity.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/models/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{camelCase name}}/{{camelCase name}}Validator.ts',
        templateFile: 'plop-templates/models/validator.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/models/index.ts',
        pattern: /'.\/.*;/,
        template: "export * from './{{camelCase name}}';",
      },
    ],
  });
};
