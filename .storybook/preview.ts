import type { Preview } from "@storybook/react";
import {decorator} from "../__mocks__/launchdarkly-react-client-sdk";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [decorator],
};

export default preview;
