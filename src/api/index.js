let auth_token;

if (process.env.NODE_ENV === 'production') {
    auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NjhiNjQyNDhkZmMyMjRiYjQ3NzRhNSIsImlhdCI6MTUwOTYxMjUyOSwiZXhwIjoxNTEwMjE3MzI5LCJhdWQiOiJvcGVuMzExIn0.361O52glvQ-bWvgRT00Iv2ExbFBfl1uYre7TEXX_sCk';
} else {
    auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NjhiNjQyNDhkZmMyMjRiYjQ3NzRhNSIsImlhdCI6MTUwOTQzNzE2NywiZXhwIjoxNTEwMDQxOTY3LCJhdWQiOiJvcGVuMzExIn0.oEiObV_S3BYSPGkjTJUtD3rhUxm2fNUk0dmgYXd0de4';
}

const header = new Headers({
    'Authorization': `Bearer ${auth_token}`
});

export default {
    // Get all service requests
    getSR({ limit = 1, page = 0, services, jurisdictions, statuses }) {
        let url = 'api/servicerequests?select={"operator": 0, "attachments": 0, "changelogs": 0, "wasOpenTicketSent": 0, "wasResolveTicketSent": 0, "ttr": 0, "resolvedAt": 0, "call": 0, "method": 0, "group": 0, "description": 0}';
        const query = { location: { '$ne': null } };
        if (services && services.length) {
            query.service = { '$in': services };
        }
        if (jurisdictions && jurisdictions.length) {
            query.jurisdiction = { '$in': jurisdictions };
        }
        if (statuses && statuses.length) {
            query.status = { '$in': statuses };
        }


        return fetch(`${url}&query=${JSON.stringify(query)}&limit=${limit}&page=${page}`, { headers: header })
            .then(res => res.json())
            .then(data => {
                return fetch(`${url}&query=${JSON.stringify(query)}&limit=${data.count}&page=${page}`, { headers: header })
                    .then(res => res.json());
            });
    },
    /**
     * Query all services
     * 
     * @returns 
     */
    getServices() {
        const url = 'api/services?query={"isExternal":true}&limit=100';
        return fetch(url, { headers: header })
            .then(res => {
                return res.json();
            });
    },
    /**
     * Get all jurisdictions
     * 
     * @returns 
     */
    getJurisdictions() {
        const url = 'api/jurisdictions?limit=100';
        return fetch(url, { headers: header })
            .then(res => {
                return res.json();
            });
    },

    getStatuses() {
        const url = 'api/statuses?limit=100';
        return fetch(url, { headers: header })
            .then(res => {
                return res.json();
            });
    }
};