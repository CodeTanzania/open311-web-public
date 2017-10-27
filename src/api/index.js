const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZTQ0OWQzODI0NjEwMDAwNGYzNDgzMSIsImlhdCI6MTUwODEzMzMzMSwiZXhwIjozMzA2NTczMzMzMSwiYXVkIjoib3BlbjMxMSJ9.3-a02oah-lmHFdqw1wMkbxIVa2qdA_D7ZTo0bGQQ_zE';

export default {
    // Get all service requests
    getAllSR() {
        return fetch('api/servicerequests?select={"operator": 0, "attachments": 0, "changelogs": 0, "wasOpenTicketSent": 0, "wasResolveTicketSent": 0, "ttr": 0, "resolvedAt": 0, "call": 0, "method": 0, "group": 0, "description": 0}&query={"location":{"$ne":null}}&limit=10', {
            headers: new Headers({
                'Authorization': `Bearer ${auth_token}`
            })
        })
            .then(res => {
                return res.json();
            });
    }
};