# Reverse Polish Notation Calculator

This app resolves reverse polish expression, a notation where operators are pass in after their inputs.

I have opted to use reducers and reducer-middlewares as my state management tool to keep the core module `client/core/rpn.js` focused, testable and framework agnostic. This strategy allows for extra functionality like error management and logging to be layered over an existing solution with little concern for integration. Taking a TDD approach becomes less taxing as reducers have a stable interface and predictable outcomes. They have little to no need for mocking and setup/teardown logic. The React framework integrates well with this plan; providing 1st party support via the `useReducer` hook. 

The caveat of this strategy is the exported function must be pure to ensure composability, and the interface of `action`s tends to be bulky for small apps, both of which can negatively impact readability. 

Future iterations of this app can easily implement more operators, variables, strings-values, and commands. This can push the app to align closely with the programming language [Forth](https://en.wikipedia.org/wiki/Forth_(programming_language)). The History Middleware can evolve into and Undo-Redo Middleware, to give the user some slack should they perform and unintended actions. However, the codebase does not handle the concept of arity all too well; having all operators consume 2 opcodes is not too flexible, and that needs to be addressed. 

## Important Files

- `client/core/rpn.js` - The Full Implemenation of a RPN Calculator
- `client/__tests__/rpn.js` - Test suite demonstating the caclulator 
- `client/component/App.jsx` - The Root React.js component

## Live App

https://rpn-calculator-20538.herokuapp.com/

## Build Instruction

Requires Node.JS 12.x

### Running with NPM

```bash
$ npm install
$ npm run build
$ PORT=8080 npm start
```

### Running with Yarn

```bash
$ yarn
$ yarn build
$ PORT=8080 yarn start
```
