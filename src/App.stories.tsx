import type {Meta, StoryObj} from '@storybook/react';

import App from './App';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof App> = {
    component: App,
};

export default meta;
type Story = StoryObj<typeof App>;

export const FirstStory: Story = {
    parameters: {
        flags: {devTestFlag: 'test1'}
    },
};
