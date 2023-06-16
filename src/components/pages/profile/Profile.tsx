import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Breadcrumb } from "react-bootstrap";
import { MyProfile } from "./MyProfile";
import { OtherProfile } from "./OtherProfile";

export function Profile() {
    const { id } = useParams()
    const isMyProfile = useCallback(() => {
        return !id
    }, [ id ])

    return (<Container className="mb-5">
        <Row className="mt-3">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={ Link } linkProps={{ to: "/" }}>
                    Главная
                </Breadcrumb.Item>
                <Breadcrumb.Item linkAs={ Link } linkProps={{ to: "/profile" }} active>
                    Профиль
                </Breadcrumb.Item>
            </Breadcrumb>
        </Row>

        { isMyProfile() ? <MyProfile /> : <OtherProfile userId={ Number(id) } /> }
    </Container>)
}