import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import {preset} from 'vue-cli-plugin-vuetify-preset-reply/preset';

Vue.use(Vuetify);

export default new Vuetify({
    preset,
    theme: {
        themes: {
            light: {
                primary: colors.teal.lighten3,
                secondary: colors.teal.lighten5,
                accent: colors.amber.accent4,
                error: '#f44336',
                warning: '#ffc107',
                info: '#00bcd4',
                success: '#4caf50'
            }

        }
    },
});
