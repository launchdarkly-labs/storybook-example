# Using LaunchDarkly with Storybook

This is an example storybook create-react-app to demonstrate how to mock the LaunchDarkly React SDK. The instructions
here are derived from the official [storybook docs](https://storybook.js.org/docs/writing-stories/build-pages-with-storybook#mocking-imports) on how to mock imports.

# Quickstart

1. At your project root dir create [`__mocks__`/launchdarkly-react-client-sdk.ts](https://github.com/launchdarkly-labs/storybook-example/blob/main/__mocks__/launchdarkly-react-client-sdk.ts):

```ts
// replace _flags with your own flags
let _flags = { devTestFlag: true };
export const useFlags = () => _flags

// @ts-ignore
export function decorator(story, {parameters}) {
    if (parameters && parameters.flags) {
        _flags = parameters.flags;
    }
    return story();
}
```

2. In [.storybook/main.ts](https://github.com/launchdarkly-labs/storybook-example/blob/main/.storybook/main.ts), use webpack aliasing to replace the real import:

```ts
export default {
    // ...your other storybook configuration

    webpackFinal: async (config) => {
        // @ts-ignore
        config.resolve.alias['launchdarkly-react-client-sdk'] = require.resolve('../__mocks__/launchdarkly-react-client-sdk.ts');
        return config;
    },
};
```

3. Add the decorator in step 1 to [.storybook/preview.ts](https://github.com/launchdarkly-labs/storybook-example/blob/main/.storybook/preview.ts):

```ts
import { Preview } from '@storybook/react';

import { decorator } from '../__mocks__/launchdarkly-react-client-sdk';

const preview: Preview = {
  decorators: [decorator],
};

export default preview;
```

4. Finally, mock flags in [App.stories.tsx](https://github.com/launchdarkly-labs/storybook-example/blob/main/src/App.stories.tsx):

```ts
import type { Meta, StoryObj } from '@storybook/react';

import App from './App';

const meta: Meta<typeof App> = {
    component: App,
};

export default meta;
type Story = StoryObj<typeof App>;

export const FirstStory: Story = {
    parameters: {
        // replace with your own flags
        flags: { devTestFlag: 'mock-value' }
    },
};
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
