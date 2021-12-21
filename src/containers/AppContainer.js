import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

function AppContainer() {
    return (
        <Container>
            <Header />
            <AddTodo />
            <TodoList />
        </Container>
    )
}

export default AppContainer
