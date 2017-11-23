
import moment, { months } from 'moment';

let auth_token;

if (process.env.NODE_ENV === 'production') {
    auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZTQ0OWQzODI0NjEwMDAwNGYzNDgzMSIsImlhdCI6MTUwODEzMzMzMSwiZXhwIjozMzA2NTczMzMzMSwiYXVkIjoib3BlbjMxMSJ9.3-a02oah-lmHFdqw1wMkbxIVa2qdA_D7ZTo0bGQQ_zE';
} else {
    auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMGFkNDQwNWVmMjI1MDUxYTJiMGE0OCIsImlhdCI6MTUxMDY1OTEzNywiZXhwIjozMzA2ODI1OTEzNywiYXVkIjoib3BlbjMxMSJ9.5j59O2WV1fRnGY11sKoeaDZWh6zmvXyVVkiOE9pq2aI';
}

const header = new Headers({
    'Authorization': `Bearer ${auth_token}`
});

function prepareDates(start, end) {
    if (start && end) {
        let startDate = moment(new Date(start)).utc().startOf('date');
        let endDate = moment(new Date(end)).utc().startOf('date');
        const diff = endDate.diff(startDate, 'months');
        if (diff >= 3) {
            return [startDate.toDate(), endDate.toDate()];
        } else {
            startDate = endDate.subtract(3, months).startOf('date');
            return [startDate.toDate(), endDate.toDate()];
        }
    }
}

export default {
    // Get all service requests
    getSR({ limit = 1, page = 0, services, jurisdictions, statuses, startDate, endDate }) {
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
        query.createdAt = {}; // initialize createdAt query param
        if (startDate) {
            //there is startDate set
            query.createdAt['$gte'] = startDate.toDate();
        }
        if (endDate) {
            //There is endDate set
            query.createdAt['$lte'] = endDate.toDate();
        }
        if (!Object.keys(query.createdAt).length) {
            //No start or end date set so reset createdAt query param
            query.createdAt = undefined;
        }

        return fetch(`${url}&query=${JSON.stringify(query)}&limit=${limit}&page=${page}`, { headers: header })
            .then(res => res.json())
            .then(data => {
                return fetch(`${url}&query=${JSON.stringify(query)}&limit=${data.count}&page=${page}`, { headers: header })
                    .then(res => res.json());
            });
    },
    /**
     * Search SR by using ticket Number
     * @param {String} ticketNum 
     */
    findSRByTicketNum(ticketNum) {
        const query = { code: ticketNum };
        const url = `api/servicerequests?query=${JSON.stringify(query)}`;
        return fetch(url, { headers: header })
            .then(res => res.json());
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
    },
    /**
     * Calculate report overviews
     * 
     * @param {any} start  Start Date
     * @param {any} end  End Date
     * @returns 
     */
    getSRSummary(start, end) {
        const dates = prepareDates(start, end);
        const query = { createdAt: {} };
        query.createdAt['$gte'] = dates[0];
        query.createdAt['$lte'] = dates[1];
        const url = 'api/reports/overviews?';
        return fetch(`${url}query=${JSON.stringify(query)}`, { headers: header })
            .then(res => res.json());
    }
};