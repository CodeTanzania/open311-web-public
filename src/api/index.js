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
    getSR({ limit = 2000, page = 0, services }) {
        let url = `api/servicerequests?select={"operator": 0, "attachments": 0, "changelogs": 0, "wasOpenTicketSent": 0, "wasResolveTicketSent": 0, "ttr": 0, "resolvedAt": 0, "call": 0, "method": 0, "group": 0, "description": 0}&limit=${limit}&page=${page}`;
        const query = { location: { '$ne': null } };
        if (services) {
            query.service = { '$in': services };
        }
        url = `${url}&query=${JSON.stringify(query)}`;


        return fetch(url, { headers: header })
            .then(res => {

                return res.json();
            });
    },
    /**
     * Query all services
     * 
     * @returns 
     */
    getServices() {
        const url = 'api/services?query={"isExternal":true}';
        return fetch(url, { headers: header })
            .then(res => {
                return res.json();
            });
    }
};