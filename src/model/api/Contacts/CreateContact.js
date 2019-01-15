"use strict";

import { getJWT } from '../../dataStorage/AStorage';

const BASE_URL = 'https://familink-api.cleverapps.io/';
const CONTACTS_URI = 'secured/users/contacts';
let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
};

export default async function CreateContact(user) {
    
    return getJWT().then(jwt => {
        headers.Authorization = `Bearer: ${jwt}`;
        console.log('sending ' + JSON.stringify(user));
        return fetch(BASE_URL + CONTACTS_URI, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user)
        }).then((response) => response.json())
            .then(json => {
                if (json.message) {
                    console.error('error while creating contact : ' + json.message);
                    return json.message;
                }
                else {
                    return json;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });
}