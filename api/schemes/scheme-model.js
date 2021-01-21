// scheme-model
const db = require("../../data/db-config");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    const schemeObj = db('schemes').where('id', id).first();

    if (!schemeObj) {
        return Promise.resolve(null);
    } else {
        return schemeObj;
    }
}

function findSteps(id) {
    return db('schemes as sc')
        .join('steps as st', 'sc.id', 'st.scheme_id')
        .select('sc.id', 'scheme_name', 'step_number', 'instructions')
        .where('sc.id', id)
        .orderBy('step_number');
}

function add(scheme) {
    return db('schemes').insert(scheme)
        .then(([id]) => {
            return db('schemes').where('id', id).first();
        });
}

function update(changes, id) {
    const schemeObj = db('schemes').where('id', id).first();

    if (!schemeObj) {
        return Promise.resolve(null);
    } else {
        return db('schemes').where('id', id).update(changes)
            .then(([id]) => {
                return db('schemes').where('id', id).first();
            });
    }
}

function remove(id) {
    const schemeObj = db('schemes').where('id', id).first();

    if (!schemeObj) {
        return Promise.resolve(null);
    } else {
        return db('schemes').where('id', id).del()
        // .then(([id]) => {
        //     return db('schemes').where('id', id).first();
        // });
    }
}