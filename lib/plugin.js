const fs = require('fs');
const _ = require('lodash');
const http = require('http');
const { ContainershipPlugin, ApiBuilder } = require('@containership/containership.plugin');

class ContainershipNtpPlugin extends ContainershipPlugin {

    constructor() {
        super({
            name: 'ntp',
            description: 'A plugin to set the host time via ntp.',
            types: ['core']
        });
    };

    startLeader(host) {
        super.startLeader(host);

        console.log("Start Leader in Ntp.");

        const api = host.getApi();
        const applicationName = 'containership-ntp';

        api.createApplication({
            id: applicationName,
            image: 'jeremykross/ntp',
            cpus: 0.1,
            memory: 16,
            privileged: true,
            tags: {
                constraints: {
                    per_host: '1'
                },
                metadata: {
                    plugin: applicationName,
                    ancestry: 'containership.plugin'
                },
            },
        }, (err, result) => {
            console.log("In Ntp plugin: " + err + "  " + result);
        });

    }

}

module.exports = ContainershipNtpPlugin;
