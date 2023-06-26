import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card, CardTitle, CardBody, CardText, Row, Col, Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaThumbsUp, FaRegClock } from 'react-icons/fa';
import CheckBox from "../components/CheckBox"

function Home() {
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfRecipes, setListOfRecipes] = useState([]);
  const [listOfFilteredRecipes, setListOfFilteredRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  let navigate = useNavigate();

  const [Filters, setFilters] = useState({
    categories: []
  })

  useEffect(() => {
    document.title = "Strona główna"
    axios.get("http://localhost:3001/categories").then((response) => {
      setListOfCategories(response.data)
    })
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/login');
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    
    axios.get("http://localhost:3001/auth/auth", {
      headers: { accessToken: localStorage.getItem("accessToken") }
    })
    .then ((response) => {
      if(response.data.error)
      {
        navigate("/login")
      }
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    axios
    .get("http://localhost:3001/recipes", {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      setListOfRecipes(response.data.listOfRecipes.filter((recipe) => {
        return recipe.visibility === "PUBLIC"
      })
      );
      setListOfFilteredRecipes(response.data.listOfRecipes.filter((recipe) => {
        return recipe.visibility === "PUBLIC"
      })
      );

      setLikedRecipes(
        response.data.likedRecipes.map((like) => {
          return like.RecipeId;
        })
      );
    })
    .then(() => {

    });
  }, [])

  const likeARecipe = (recipeId) => {
    axios.post("http://localhost:3001/likes",
      { RecipeId: recipeId },
      {
        headers:
          { accessToken: localStorage.getItem("accessToken") }
      })
      .then((response) => {
        setListOfRecipes(
          listOfRecipes.map((recipe) => {
            if (recipe.id === recipeId) {
              if (response.data.liked) {
                return { ...recipe, Likes: [...recipe.Likes, 0] }
              }
              else {
                const likeArray = recipe.Likes
                likeArray.pop()
                return { ...recipe, Likes: likeArray }
              }
            }
            else {
              return recipe;
            }
          })
        );
        setListOfFilteredRecipes(
          listOfFilteredRecipes.map((recipe) => {
            if (recipe.id === recipeId) {
              if (response.data.liked) {
                return { ...recipe, Likes: [...recipe.Likes, 0] }
              }
              else {
                const likeArray = recipe.Likes
                likeArray.pop()
                return { ...recipe, Likes: likeArray }
              }
            }
            else {
              return recipe;
            }
          })
        );

        if (likedRecipes.includes(recipeId)) {
          setLikedRecipes(likedRecipes.filter((id) => {
            return id !== recipeId;
          })
          );
        }
        else {
          setLikedRecipes([...likedRecipes, recipeId])
        }
      });
  };

  const showFilteredResults = (filters) => {
    setListOfFilteredRecipes(listOfRecipes.filter((recipe) => {
      return filters["categories"].includes(recipe.recipe_category_id)
    })
    )
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }
    newFilters[category] = filters

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  return (

    <Container>
      <Row className='align-content-center card filter-bar'>
        <CheckBox
          list={listOfCategories}
          handleFilters={filters => handleFilters(filters, "categories")}
        />
      </Row>

      <Row className='align-content-center'>
        {listOfFilteredRecipes.map((value, key) => {
          // var date = new Date(value.createdAt);

          // var hour = date.getHours();
          // var minutes = date.getMinutes();
          // var mon = date.getMonth() + 1;
          // var day = date.getDate();
          // if (hour < 10) { hour = '0' + hour }
          // if (minutes < 10) { minutes = '0' + minutes }
          // if (mon < 10) { mon = '0' + mon }
          // if (day < 10) { day = '0' + day }

          return (
            <Card key={value.id} className="card-home col-sm-6 col-lg-4">
              <div>
                <CardBody>
                  <CardTitle tag="h5"
                    onClick={() => {
                      navigate(`/recipe/${value.id}`)
                    }}>
                    {value.name}
                  </CardTitle>

                </CardBody >
                {<img
                      onClick={() => { navigate(`/recipe/${value.id}`) }}
                      alt="" width="90%"
                      src={listOfCategories[value.recipe_category_id-1].pic_url}
                    />
                }
                <CardBody>
                  <CardText className="text-muted">
                    {value.recipe_description}
                  </CardText>
                  <Row>
                    <Col>
                      Autor: &nbsp;
                      <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
                    </Col>
                    <Col>
                      <FaThumbsUp className={likedRecipes.includes(value.id) ? 'elem-like-button' : 'elem-unlike-button'} onClick={() => { likeARecipe(value.id) }} />
                      <b>{value.Likes.length}</b>
                    </Col>
                    <Col className='prep_time_on_card'>
                      <FaRegClock /> {value.prepare_time}
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Card>
          );
        })}

      </Row>
    </Container>
  )
}

export default Home