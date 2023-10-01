import { theme, type ThemeConfig } from 'antd';

export const antdDarkTheme: ThemeConfig = {
  token: {
    colorBgLayout: '#010409',
    colorBgContainer: '#0D1117',
    colorBgElevated: '#0D1117',
  },
  components: {
    Layout: {
      headerBg: '#0D1117',
      siderBg: '#0D1117',
    },
    Typography: {
      titleMarginTop: '0px',
    },
  },
  algorithm: theme.darkAlgorithm,
};

export const antdLightTheme: ThemeConfig = {
  token: {},
  components: {
    Layout: {
      headerBg: '#fff',
      siderBg: '#fff',
    },
  },
  algorithm: theme.defaultAlgorithm,
};
