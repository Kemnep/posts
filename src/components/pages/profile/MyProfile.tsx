import React from "react";
import { Row } from "react-bootstrap";

import { MyProfile as MyProfileData } from "../../../data/profile"
export function MyProfile() {

    return (<Row className="mt-5">
        <h1>Мой профиль «{ MyProfileData.name }»</h1>

        <p>
            <span className="fw-medium">Город:</span> { MyProfileData.town }
            <br /><span className="fw-medium">Возраст:</span> { MyProfileData.age }
            <br /><span className="fw-medium">Электронный адрес:</span> <a href={ `emailto:${ MyProfileData.email }` } target="_blank">{ MyProfileData.email }</a>
            <br /><span className="fw-medium">Языки программирования:</span> { MyProfileData.languages.join(', ') }
        </p>
    </Row>)
}