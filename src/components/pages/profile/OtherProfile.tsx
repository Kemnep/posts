import React from "react";
import { Tabs, Tab, Row } from "react-bootstrap";

import { Loader } from "../../layouts/Loader/Loader";
import { Error } from "../../layouts/Error/Error";
import { useGetUserQuery } from "../../../services/usersApi";
import { UserPosts } from "./UserPosts";

interface IOtherProfileProps {
    userId: number;
}

export function OtherProfile({ userId }:IOtherProfileProps) {
    const { isLoading, error, data: user } = useGetUserQuery(userId)

    if (!user && !isLoading) {
        return <Row>
            <h1>Пользователь не найден</h1>
        </Row>
    }

    return (<Row>
        { isLoading && <Loader /> }
        { error && <Error error={ error } /> }
        { user && <>
            <h1>{ user.name }</h1>

            <Tabs
                defaultActiveKey="profile"
                id="profile-tabs"
                className="mt-3"
            >
                <Tab eventKey="profile" title="Личные данные" className="pt-2">
                    <strong>Электронная почта: </strong> { user.email }
                    <br /><strong>Телефон: </strong> { user.phone }
                    <br /><strong>Веб-сайт: </strong> { user.website ? <a href={ `https://${ user.website }` } target="_blank">{ user.website }</a> : '- Не указан -' }
                </Tab>
                <Tab eventKey="address" title="Адрес" className="pt-2">
                    <strong>Город: </strong> { user.address.city }
                    <br /><strong>Улица: </strong> { user.address.street }
                    <br /><strong>Аппартаменты: </strong> { user.address.suite }
                    <br /><strong>Почтовый индекс: </strong> { user.address.zipcode }
                </Tab>
                <Tab eventKey="company" title="Компания" className="pt-2">
                    <strong>Название компании: </strong> { user.company.name }
                    <br /><strong>Фраза: </strong> { user.company.catchPhrase }
                </Tab>
            </Tabs>

            <UserPosts userId={ String(userId) } />
        </> }
    </Row>)
}