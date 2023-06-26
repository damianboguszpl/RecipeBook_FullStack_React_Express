import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { AuthContext } from '../helpers/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa';

let cat_id = 0

function Recipe() {
    let { id } = useParams();
    const [recipeObject, setRecipeObject] = useState({});
    const [listOfIngredients, setIngredients] = useState([]);
    const [categoryObject, setCategoryObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Sczegóły przepisu"
        axios.get(`http://localhost:3001/recipes/id/${id}`).then((response) => {
            setRecipeObject(response.data);
            cat_id = response.data.recipe_category_id
        })
            .then(() => {
                axios.get(`http://localhost:3001/categories/id/${cat_id}`).then((response) => {
                    setCategoryObject(response.data)
                })
            });
        axios.get(`http://localhost:3001/comments/recipe/${id}`).then((response) => {
            setComments(response.data)
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        axios.get(`http://localhost:3001/ingredients/recipeid/${id}`).then((response) => {
            setIngredients(response.data)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const addComment = () => {
        axios
            .post("http://localhost:3001/comments", {
                text: newComment,
                RecipeId: id,
            },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                }
                else {
                    const commentToAdd = { text: newComment, username: response.data.username }
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                )
            })
    }

    const deleteRecipe = (id) => {
        axios
            .delete(`http://localhost:3001/recipes/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            })
            .then(() => {
                navigate(`/`)
        });
    };

    const editRecipe = (id) => {
        navigate(`/editrecipe/${id}`);
    }

    return (
        <Container>
            <Container className="recipe-details">
                <Col className='recipe-details-container'>
                    <Row className='recipe-details-row-title'>
                        <Col  className="bg-light border recipe-details-title">
                            <b>{recipeObject.name}</b>
                        </Col>
                        {authState.username === recipeObject.username && (
                            <Col sm={3} className="bg-light border">
                                <div className='btn btn-secondary recipe-delete-button'
                                    onClick={() => { deleteRecipe(recipeObject.id) }}>Usuń
                                </div>
                                <div className='btn btn-secondary recipe-edit-button'
                                    onClick={() => { editRecipe(recipeObject.id) }}>Edytuj
                                </div>
                            </Col>
                            
                        )}
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Kategoria
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {categoryObject.name}
                        </Col>
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Notatki
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {recipeObject.recipe_description}
                        </Col>
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Czas przygotowania
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {recipeObject.prepare_time}
                        </Col>
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Czas przyrządzenia
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {recipeObject.cook_time}
                        </Col>
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Składniki
                        </Col>
                        <Col sm={8} className="bg-light border ingredients-list">
                            {listOfIngredients &&
                                listOfIngredients.map((singleIngredient, index) => (
                                    <ul key={index} className="ingredients-ul">
                                        {singleIngredient.name && <li>{singleIngredient.name}</li>}
                                    </ul>
                                ))}
                        </Col>
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Ocena
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {recipeObject.rating}/6
                        </Col>
                    </Row>
                    <Row className='recipe-details-row'>
                        <Col sm={4} className="bg-light border rec-title">
                            Widoczność przepisu
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {recipeObject.visibility === "PUBLIC" ? 'publiczny' : 'prywatny'}
                        </Col>
                    </Row>
                    <Row className='recipe-details-row recipe-details-row-last'>
                        <Col sm={4} className="bg-light border rec-title">
                            Dodany do ulubionych
                        </Col>
                        <Col sm={8} className="bg-light border t-a-l">
                            {recipeObject.marked === '1' ? 'tak' : 'nie'}
                        </Col>
                    </Row>
                </Col>
            </Container>

            <Container>
                <Col className="recipe-comment-container">
                    <Row className='recipe-details-row'>
                        <Col sm={12} className="bg-light border">
                            <FormGroup className='new-comment-form'>
                                <Label for="exampleText">
                                    Nowy komentarz
                                </Label>
                                <Input
                                    value={newComment}
                                    onChange={(event) => { setNewComment(event.target.value) }}
                                    id="exampleText" name="text" type="textarea" placeholder='Treść komentarza'
                                />
                                <Button onClick={addComment} className="comment-add-button">
                                    Dodaj komentarz
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Container>

            <Container>
                <Col sm={12} className="recipe-comments-container">
                    {comments.length > 0 && (
                        <Row className='comment-details-row-title'>
                            <Col sm={12} className="bg-light border">
                                <div className='comment-details-title'>Komentarze</div>
                            </Col>
                        </Row>
                    )}
                    {comments.map((comment, key) => {
                        return (
                            <Row key={key} className='bg-light border comment-details-row'>
                                <Col sm={2} md={2} className="bg-light comment-user">
                                    {comment.username}:
                                </Col>
                                <Col sm={9} md={9} className="bg-light comment-text">
                                    {comment.text}
                                </Col>
                                <Col sm={1} md={1} className="bg-light comment-buttons">
                                    {authState.username === comment.username && (
                                        <div className='btn btn-secondary elem-delete-button'
                                            onClick={() => { deleteComment(comment.id) }}>
                                            <FaTrash className='comment-delete-icon' />
                                        </div>
                                    )}
                                </Col>
                            </Row>

                        )
                    })}
                </Col>
            </Container>

        </Container>
    )
}

export default Recipe