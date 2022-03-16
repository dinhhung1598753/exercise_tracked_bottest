var assert = require('assert');
const fetch = require("cross-fetch");
var func = async  () => {
    const url = "https://boilerplate-project-exercisetracker.dinhhung1598753.repl.co";
    const res = await fetch(url + '/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    if (res.ok) {
        const { _id, username } = await res.json();
        const expected = {
            username,
            description: 'test',
            duration: 60,
            _id,
            date: new Date().toDateString()
        };
        const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `description=${expected.description}&duration=${expected.duration}`
        });
        if (addRes.ok) {
            const logRes = await fetch(url + `/api/users/${_id}/logs`);
            if (logRes.ok) {
                const { log } = await logRes.json();
                const exercise = log[0];
                // assert.isString(exercise.date);
                console.log("exercise.date", exercise.date);
                console.log("expected.date", expected.date);
                assert.equal(exercise.date, expected.date);
            } else {
                throw new Error(`${logRes.status} ${logRes.statusText}`);
            }
        } else {
            throw new Error(`${addRes.status} ${addRes.statusText}`);
        };
    } else {
        throw new Error(`${res.status} ${res.statusText}`);
    };
};

func()