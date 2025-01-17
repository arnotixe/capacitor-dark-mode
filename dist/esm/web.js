import DarkModeBase from './base';
// eslint-disable-next-line import/prefer-default-export
export class DarkModeWeb extends DarkModeBase {
    async registerDarkModeListener() {
        // On the web, we can use a MediaQueryList listener.
        const onChange = (ev) => {
            this.update({ dark: ev.matches }).catch(console.error);
        };
        const query = this.getDarkModeQuery();
        // Some browsers do no support addEventListener
        if (query.addEventListener) {
            query.addEventListener('change', onChange);
        }
        else {
            query.addListener(onChange);
        }
        this.registeredListener = true;
        return Promise.resolve();
    }
    async isDarkMode() {
        const query = this.getDarkModeQuery();
        return Promise.resolve({ dark: query ? query.matches : false });
    }
    getDarkModeQuery() {
        if (!this.mediaQuery) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        }
        return this.mediaQuery;
    }
}
