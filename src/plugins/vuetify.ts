/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#4750d5',
          secondary: '#dedff7',
          'grey-text': '#757575',
          'grey-hover': '#383c44',
          'grey-border': '#dbdbdb',
          'box-shadow': '#000000', // a: 0.2
          warning: '#df8620',
          danger: '#d5474c',
          background: '#ffffff',
          success: '#2bbb6e',
          backgroundDeep: '#f6f6f6',
          backgroundSurface: '#ffffff',
          textNormal: '#7a8294',
          textActive: '#ffffff',
          textHover: '#20232a',
          subtitleSide: '#7a8294',
          paginationActive: '#999999',
          dashboardClick: '#367ff3',
          dashboardSpent: '#f1b932',
          dashboardImpression: '#65c54b',
          dashboardConversion: '#ff584f',
          flash: '#E17575', // a: 0.6
          primaryLight: '#ffc4c4',
          primarySuperLight: '#E17575', // a: 0.05
          secondaryDarken: '#2793da',
          primaryHover: '#ff6868',
          'blue-dark': '#4750d5',
          'blue-light': '#2f8dfa',
          'turquoise-dark': '#049587',
          'turquoise-light': '#1fd0bf',
          'green-dark': '#14532d',
          'green-light': '#4ade80',
          yellow: '#f8c753',
          'purple-dark': '#55008c',
          'purple-light': '#9d4edd',
          magenta: '#a93790',
          'pink-dark': '#d54761',
          'pink-light': '#eb648b',
          orange: '#eb7e30',
          brown: '#8b572a',
          'on-secondary': '#4750d5',
        },
      },
    },
  },
});
