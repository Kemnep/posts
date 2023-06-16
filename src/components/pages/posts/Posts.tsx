import React, { useCallback, useEffect, useMemo, useState } from "react";
import {Form, Row, Col, Container, Accordion, Pagination, InputGroup, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useDebounce from "../../../hooks/debounce";
import { getCountPages, getPagesArray } from "../../../utils/pagination";
import { mergePostsWithUsers } from "../../../utils/posts";
import { getError, getLoading, getPagination, getPosts } from "../../../redux/posts/selectors";
import { fetchPostsAction} from "../../../redux/posts/actions";
import { getUsers } from "../../../redux/users/selectors";
import { Error } from "../../layouts/Error/Error";
import { Loader } from "../../layouts/Loader/Loader";
import { PostItem } from "./PostItem";
import { TSort } from "../../../redux/posts/slice";

import "./Posts.scss";

export function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(getPosts)
    const users = useAppSelector(getUsers)
    const isLoading = useAppSelector(getLoading)
    const error = useAppSelector(getError)
    const pagination = useAppSelector(getPagination)
    const [ searchQuery, setSearchQuery ] = useState(searchParams.get('search') || '')
    const debouncedSearchValue = useDebounce(searchQuery, 300)
    const [ sort, setSort ] = useState<TSort>(() => {
        const sortParam = searchParams.get('sort')
        return (sortParam === 'asc' || sortParam === 'desc' || sortParam === "") ? sortParam : ''
    })

    //Pages
    const pages = useMemo(() => {
        return getPagesArray(getCountPages(pagination.perPage, pagination.count))
    }, [ pagination.perPage, pagination.count ])

    const posts = useMemo(() => {
        return mergePostsWithUsers(allPosts, users)
    }, [allPosts, users])

    const handleChangePage = useCallback((e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        const page = target.getAttribute("data-page")

        searchParams.set('page', String(page))
        setSearchParams(searchParams)
    }, [searchParams])

    //Search
    const handleChangeSearchQuery = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement

        searchParams.delete('page')
        setSearchQuery(target.value)
    }

    const handleClearSearchQuery = () => {
        searchParams.delete('page')
        setSearchQuery('')
    }

    useEffect(() => {
        if (searchQuery === '') {
            searchParams.delete('search')
        } else {
            searchParams.set('search', searchQuery)
        }

        setSearchParams(searchParams)
    }, [ debouncedSearchValue ])

    //Sort
    const handleChangeSort = (e: React.ChangeEvent) => {
        const target = e.target as HTMLSelectElement

        if (target.value === "") {
            setSort(target.value)
            searchParams.delete('sort')
            setSearchParams(searchParams)
        } else if (target.value === 'asc' || target.value === 'desc') {
            setSort(target.value)
            searchParams.set('sort', target.value)
            setSearchParams(searchParams)
        }
    }

    //Fetch posts
    useEffect(() => {
        dispatch(fetchPostsAction({
            page : Number(searchParams.get('page')) || 1,
            searchQuery : searchQuery,
            sort : sort
        }))
    }, [searchParams])

    return (<>
        <Container>
            <Row className="my-4">
                <Col xs={ 9 }>
                    <Form.Group>
                        <Form.Label>Поиск по заголовку</Form.Label>
                        <InputGroup>
                            <Form.Control placeholder="Поиск по заголовку" value={ searchQuery }  onChange={ handleChangeSearchQuery } />
                            <Button variant="" className="posts__close-button btn-primary-outline border-secondary-subtle" onClick={ handleClearSearchQuery } />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Сортировка</Form.Label>
                        <Form.Select aria-label="Сортировка" defaultValue={ sort } onChange={ handleChangeSort }>
                            <option value="">По умолчанию</option>
                            <option value="asc">По алфавиту</option>
                            <option value="desc">Против алфавита</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3 mb-5">
                { isLoading && <Loader /> }
                { error ? <Error error={ error } /> : null }

                { (!isLoading && posts) && <>
                    <Accordion defaultActiveKey="0">
                        { posts.map((post) => {
                            return <PostItem { ...post } key={ post.id }/>
                        }) }
                    </Accordion>

                    <div className="d-flex justify-content-center mt-4">
                        <Pagination size="lg">
                            { pages.map((page) => {
                                return <Pagination.Item
                                    key={ page }
                                    active={ page === pagination.currentPage }
                                    data-page={ page }
                                    onClick={ handleChangePage }
                                >
                                    { page }
                                </Pagination.Item>
                            }) }
                        </Pagination>
                    </div>
                </> }
            </Row>
        </Container>
    </>)
}