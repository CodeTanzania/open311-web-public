const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZTQ0OWQzODI0NjEwMDAwNGYzNDgzMSIsImlhdCI6MTUwODEzMzMzMSwiZXhwIjozMzA2NTczMzMzMSwiYXVkIjoib3BlbjMxMSJ9.3-a02oah-lmHFdqw1wMkbxIVa2qdA_D7ZTo0bGQQ_zE';

export default {
    // Get all service requests
    getAllSR() {
        return fetch('api/servicerequests?query={"location":{"$ne":null}}&limit=500', {
            headers: new Headers({
                'Authorization': `Bearer ${auth_token}`
            })
        })
            .then(res => {
                return res.json();
            });
    }
};