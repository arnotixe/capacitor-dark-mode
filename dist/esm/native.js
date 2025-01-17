import DarkModeBase from './base';
// eslint-disable-next-line import/prefer-default-export
export class DarkModeNative extends DarkModeBase {
    constructor(capProxy) {
        super();
        this.setNativeDarkModeListener = capProxy.setNativeDarkModeListener;
        this.isDarkMode = capProxy.isDarkMode;
    }
    async registerDarkModeListener() {
        /*
          On native platforms we use two listeners:
    
          - A listener for dynamic appearance changes within the app.
          - A resume listener to check if the appearance has changed since the app was suspended.
        */
        const onChange = (data) => {
            this.update(data).catch(console.error);
        };
        await this.setNativeDarkModeListener({}, onChange);
        this.registeredListener = true;
    }
    // @native(promise)
    async isDarkMode() {
        // Never called, but we have to satisfy TS
        return Promise.resolve({ dark: false });
    }
}
