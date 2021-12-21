import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/modules/crud/actions'

function AddTodo() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        title: '',
        description: ''
    })

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addItem({
            params: form,
            callback: () => {
                setForm({
                    title: '',
                    description: ''
                })
            }
        }))    
    }

    return (
        <div className="d-flex justify-content-center my-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Enter title..." value={form.title} onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Enter description..." value={form.description} onChange={handleInput} required />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100">
                    Add
                </Button>
            </Form>
        </div>
    )
}

export default AddTodo
