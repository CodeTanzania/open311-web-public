module.exports = () => {
    const faker = require('faker');
    const data = { issues: [] }
    // Create 1000 users
    for (let i = 0; i < 10; i++) {
        for (let k = 0; k < 10; k++) {
            const service = {
                "jurisdiction":
                {
                    "code": "I",
                    "name": "Ilala",
                    "phone": "255714999887",
                    "email": "N/A",
                    "domain": "ilala.dawasco.org",
                    "_id": "592029e6e8dd8e00048c1850",
                    "longitude": 0,
                    "latitude": 0,
                    "uri": "https://dawasco.herokuapp.com/jurisdictions/592029e6e8dd8e00048c1850"
                },
                "group":
                {
                    "code": "N",
                    "name": "Non Commercial",
                    "color": "#960F1E",
                    "_id": "592029e6e8dd8e00048c184d",
                    "uri": "https://dawasco.herokuapp.com/servicegroups/592029e6e8dd8e00048c184d"
                },
                "service":
                {
                    "code": "LK",
                    "name": "Water Leakage",
                    "color": "#D31DBB",
                    "_id": "592029e6e8dd8e00048c1853",
                    "uri": "https://dawasco.herokuapp.com/services/592029e6e8dd8e00048c1853"
                },
                "call":
                {
                    "startedAt": "2017-09-22T11:55:26.286Z",
                    "endedAt": "2017-09-22T11:56:37.760Z",
                    "duration":
                    {
                        "years": 0,
                        "months": 0,
                        "days": 0,
                        "hours": 0,
                        "minutes": 1,
                        "seconds": 11,
                        "milliseconds": 71474,
                        "human": "1m 11s"
                    }
                },
                "reporter":
                {
                    "name": "Lally Elias",
                    "phone": "0714095061"
                },
                "operator":
                {
                    "name": "Lally Elias",
                    "phone": "255714095061",
                    "_id": "592029e6e8dd8e00048c185d",
                    "email": "lallyelias87@gmail.com",
                    "uri": "https://dawasco.herokuapp.com/parties/592029e6e8dd8e00048c185d"
                },
                "code": faker.random.alphaNumeric(9),
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "address": faker.address.streetAddress(),
                "method": "Call",
                "status":
                {
                    "name": "Open",
                    "weight": -5,
                    "color": "#0D47A1",
                    "_id": "592029e5e8dd8e00048c180d",
                    "createdAt": "2017-05-20T11:35:01.059Z",
                    "updatedAt": "2017-05-20T11:35:01.059Z",
                    "uri": "https://dawasco.herokuapp.com/statuses/592029e5e8dd8e00048c180d"
                },
                "priority":
                {
                    "name": "Low",
                    "weight": 0,
                    "color": "#1B5E29",
                    "_id": "592029e5e8dd8e00048c1816",
                    "createdAt": "2017-05-20T11:35:01.586Z",
                    "updatedAt": "2017-07-29T19:12:40.178Z",
                    "uri": "https://dawasco.herokuapp.com/priorities/592029e5e8dd8e00048c1816"
                },
                "attachments": [],
                "_id": "59c4fa7779c97500048ad383",
                "createdAt": "2017-09-22T11:56:39.585Z",
                "updatedAt": "2017-09-22T11:56:40.344Z",
                "latitude": parseFloat(`-6.8${i}6330`),
                "longitude": parseFloat(`39.2${k}6638`),
                "wasOpenTicketSent": true,
                "wasResolveTicketSent": false,
                "uri": "https://dawasco.herokuapp.com/servicerequests/59c4fa7779c97500048ad383"
            }
            data.issues.push(service)
        }
    }
    return data
}