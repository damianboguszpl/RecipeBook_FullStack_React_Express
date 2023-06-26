import React from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState} from 'react';
import { FormGroup, Label, Col, Button } from 'reactstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa';

function CreateRecipe() {
    const [listOfCategories, setListOfCategories] = useState([]);
    const [listOfIngredients, setListOfIngredients] = useState([{ ingredient: "" }]);
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Dodawanie przepisu"
        axios.get("http://localhost:3001/categories").then((response) => {
            setListOfCategories(response.data)
        })
    }, [])

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const initialValues = {
        name: '',
        recipe_category_id: 1,
        recipe_description: '',
        prepare_time: '',
        cook_time: '',
        rating: '1',
        publishing_status: 'none',
        visibility: 'PRIVATE',
        marked: 0
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Nazwa musi mieć co najmniej 3 znaki!")
            .max(40, "Nazwa może mieć co najwyżej 40 znaków!")
            .required("Nazwa jest wymagana!"),
        recipe_description: Yup.string()
            .min(1, "Instrukcje muszą mieć co najmniej 1 znak!")
            .max(255, "Instrukcje mmogą mieć co najwyżej 255 znaków!")
            .required("Instrukcje są wymagane!"),
        prepare_time: Yup.string()
            .min(3, "Czas przygotowania musi mieć co najmniej 3 znaki!")
            .max(10, "Czas przygotowania może mieć co najwyżej 10 znaków!")
            .required("Czas przygotowania jest wymagany!"),
        cook_time: Yup.string()
            .min(3, "Czas przyrządzenia musi mieć co najmniej 5 znaki!")
            .max(10, "Czas przyrządzenia może mieć co najwyżej 10 znaków!")
            .required("Czas przyrządzenia jest wymagany!"),
        rating: Yup.string()
            .min(1, "Ocena musi być liczbą z zakresu 1-6!")
            .max(1, "Ocena musi być liczbą z zakresu 1-6!")
            .required("Ocena jest wymagana!"),
        visibility: Yup.string()
            .required("Wybór widoczności jest wymagany!"),
        marked: Yup.boolean()
            .required("Pole 'Dodaj do ulubionych' jest wymagane!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/recipes", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
            .then((response) => {
                const id = response.data.id
                for (const elem of listOfIngredients) {
                    axios
                        .post("http://localhost:3001/ingredients", {
                            name: elem.ingredient,
                            RecipeId: id,
                        },
                            {
                                headers: {
                                    accessToken: localStorage.getItem("accessToken"),
                                },
                            });
                }
                navigate(`/`);
            })
    };

    const handleIngredientAdd = () => {
        setListOfIngredients([...listOfIngredients, { ingredient: "" }]);
    };

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...listOfIngredients];
        list[index][name] = value;
        setListOfIngredients(list);
    };

    const handleIngredientRemove = (index) => {
        const list = [...listOfIngredients];
        list.splice(index, 1);
        setListOfIngredients(list);
    };

    return (
        <div className='createRecipePage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <FormGroup row className='recipe-create-form-row'>
                        <Label sm={3} className="create-recipe-label">Nazwa: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" name="name" placeholder="np. placki ziemniaczane" />
                        </Col>
                        <ErrorMessage name='name' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Kategoria: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" as="select" name="recipe_category_id">
                                {listOfCategories.map((value, key) => {
                                    return (
                                        <option key={value.id} value={value.id}>{value.name}</option>
                                    );
                                })}
                            </Field>
                        </Col>
                        <ErrorMessage name='recipe_category_id' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Czas przygotowania: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" name="prepare_time"
                                placeholder="np. 15 min" />
                        </Col>
                        <ErrorMessage name='prepare_time' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Czas przyrządzenia: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" name="cook_time"
                                placeholder="np. 10 min" />
                        </Col>
                        <ErrorMessage name='cook_time' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>

                    <FormGroup row className=''>
                        <Label sm={3} className="create-recipe-label">Składniki: </Label>
                        <Col sm={12} className='ingredients-all-rows'>
                            <div className="form-field ingredients-list">
                                {listOfIngredients.map((singleIngredient, index) => (
                                    <div key={index}>
                                        <div className="row ingredient-row">
                                            <Col sm={9} className="">
                                                {index + 1}.&nbsp;
                                                <input
                                                    name="ingredient"
                                                    type="text"
                                                    id="ingredient"
                                                    className="ingredient-input"
                                                    value={singleIngredient.ingredient}
                                                    onChange={(e) => handleIngredientChange(e, index)}
                                                    required
                                                />

                                            </Col>
                                            <Col className="second-division">
                                                {listOfIngredients.length !== 1 && (
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleIngredientRemove(index)}
                                                        className="btn btn-secondary elem-delete-button"
                                                    >
                                                        <FaTrash className='comment-delete-icon' />
                                                    </Button>
                                                )}
                                            </Col>

                                        </div>
                                        <div className="row ingredient-row">
                                            <Col>
                                                {listOfIngredients.length - 1 === index && listOfIngredients.length < 20 && (
                                                    <Button
                                                        type="button"
                                                        onClick={handleIngredientAdd}
                                                        className="button-1"
                                                    >
                                                        Dodaj składnik
                                                    </Button>
                                                )}
                                            </Col>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Instrukcje: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" name="recipe_description"
                                component="textarea" rows="10" autoComplete="off"
                                placeholder="instrukcje wykonania" />
                        </Col>
                        <ErrorMessage name='recipe_description' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Ocena: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" as="select" name="rating">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </Field>
                        </Col>
                        <ErrorMessage name='rating' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Widoczność przepisu: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" as="select" name="visibility">
                                <option value="PRIVATE">prywatny</option>
                                <option value="PUBLIC">publiczny</option>
                            </Field>
                        </Col>
                        <ErrorMessage name='visibility' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} className="create-recipe-label">Dodaj do ulubionych: </Label>
                        <Col sm={9}>
                            <Field id="inputCreateRecipe" as="select" name="marked">
                                <option value="1">tak</option>
                                <option value="0">nie</option>
                            </Field>
                        </Col>
                        <ErrorMessage name='marked' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>

                    <Button type='submit'>Dodaj przepis</Button>
                </Form>
            </Formik>

        </div>
    )
}

export default CreateRecipe