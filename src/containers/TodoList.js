import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { deleteItem, getAllItemsWithApi, getItem, updateItem } from "../redux/modules/crud/actions";
import { itemsSelector } from "../redux/modules/crud/selectors";

function TodoList() {
    const dispatch = useDispatch()
    const items = useSelector((state) => itemsSelector(state))
    const [columns, setColumns] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [form, setForm] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        dispatch(getAllItemsWithApi())
    }, [])

    useEffect(() => {
        const mappedItems = items.length 
            ? 
                [...items?.map?.(item => {
                    return {
                        ...item,
                        id: item.id.toString()
                    }
                })]
            : []

        setColumns({
            toDo: {
                name: "To do",
                items: [...mappedItems?.filter?.(item => {
                    return !item.status
                }).sort((a,b) =>  new Date(a.createdAt) - new Date(b.createdAt))]
            },
            done: {
                name: "Done",
                items: [...mappedItems?.filter?.(item => {
                    return item.status
                }).sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt))]
            }
        })
    }, [items])

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateItem({
            params: {
                ...selectedItem,
                ...form,
                id: selectedItem.id.toString(),
            },
            callback: () => {
                setShowModal(false)
            }
        }))
    }

    const handleDelete = () => {
        dispatch(deleteItem({
            params: {
                id: selectedItem.id.toString(),
            },
            callback: () => {
                setShowModal(false)
            }
        }))
    }
  
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const id = result.draggableId;
            dispatch(updateItem({
                params: {
                    ...items.find(item => item.id.toString() === id.toString()),
                    id: id.toString(),
                    status: destination.droppableId === "done" ? 1 : 0,
                }
            }))
        }
    };

    const handleShowModal = (id) => {
        setSelectedItem({...items.find(item => item.id.toString() === id.toString()),})
        dispatch(getItem({
            params: {
                id,
            },
            callback: (data) => {
                setForm({
                    title: data.item.title,
                    description: data.item.description
                })
            }
        }))
        setShowModal(true)
    }
  
    return (
        <div>
            <div className="d-flex justify-content-center flex-wrap"
            >
                <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                {Object.entries(columns)?.map?.(([columnId, column], index) => {
                    return (
                    <div
                        className="d-flex flex-column align-items-center"
                        key={columnId}
                    >
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                            return (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500
                                }}
                                >
                                {column.items.map((item, index) => {
                                    return (
                                    <Draggable
                                        key={item.id+index}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {
                                        return (
                                            <div 
                                            onClick={() => handleShowModal(item.id)}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                userSelect: "none",
                                                padding: 16,
                                                margin: "0 0 8px 0",
                                                minHeight: "50px",
                                                backgroundColor: snapshot.isDragging
                                                ? "#263B4A"
                                                : "#396EB0",
                                                color: "white",
                                                ...provided.draggableProps.style
                                            }}
                                            >
                                                <div className="mb-2">
                                                    {item.title}
                                                </div>
                                                <div className="fs-07">{item.createdAt}</div>
                                            </div>
                                        );
                                        }}
                                    </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                </div>
                            );
                            }}
                        </Droppable>
                        </div>
                    </div>
                    );
                })}
                </DragDropContext>
            </div>
            <Modal backdrop={true} showModal={showModal} handleShowModal={setShowModal}>
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
                        <Row>
                            <Col xs={6}>
                                <Button variant="success" type="submit" className="w-100">
                                    Save
                                </Button>
                            </Col>
                            <Col xs={6}>
                                {
                                    selectedItem.status === 0
                                        ?
                                        <Button onClick={handleDelete} variant="danger" type="button" className="w-100">
                                            Delete
                                        </Button>
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

export default TodoList;