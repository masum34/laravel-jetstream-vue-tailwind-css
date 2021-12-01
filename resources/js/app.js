require('./bootstrap');

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import moment from 'moment';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({ el, app, props, plugin }) {
        const JetstreamVue = createApp({ render: () => h(app, props) })
        .use(plugin)
        .mixin({ methods: { route } })
        JetstreamVue.config.globalProperties.$moment = {
            FormNow(created){
                return moment(created).fromNow();
            },
            DayMonthYear(time){
                return moment(time).calendar('DD/MM/YYYY');
            }
        };
        JetstreamVue.mount(el);
        return JetstreamVue;
    },
});

InertiaProgress.init({ color: '#4B5563' });
