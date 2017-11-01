let auth_token;

if (process.env.NODE_ENV === 'production') {
    auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZTQ0OWQzODI0NjEwMDAwNGYzNDgzMSIsImlhdCI6MTUwODEzMzMzMSwiZXhwIjozMzA2NTczMzMzMSwiYXVkIjoib3BlbjMxMSJ9.3-a02oah-lmHFdqw1wMkbxIVa2qdA_D7ZTo0bGQQ_zE';
} else {
    auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NjhiNjQyNDhkZmMyMjRiYjQ3NzRhNSIsImlhdCI6MTUwOTQzNzE2NywiZXhwIjoxNTEwMDQxOTY3LCJhdWQiOiJvcGVuMzExIn0.oEiObV_S3BYSPGkjTJUtD3rhUxm2fNUk0dmgYXd0de4';
}

const header = new Headers({
    'Authorization': `Bearer ${auth_token}`
});

export default {
    // Get all service requests
    getSR({ limit = 10, page = 0 }) {
        const url = `api/servicerequests?select={"operator": 0, "attachments": 0, "changelogs": 0, "wasOpenTicketSent": 0, "wasResolveTicketSent": 0, "ttr": 0, "resolvedAt": 0, "call": 0, "method": 0, "group": 0, "description": 0}&query={"location":{"$ne":null}}&limit=${limit}&page=${page}`;


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