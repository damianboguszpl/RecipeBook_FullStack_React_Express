import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, CardTitle, CardBody, Col, Row, CardText, Container } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom'
import { FaThumbsUp, FaRegClock } from 'react-icons/fa';
import { AuthContext } from '../helpers/AuthContext'
// const { verify } = require("../../../server/jsonwebtoken")

function Profile() {
  let { id } = useParams()
  const [username, setUsername] = useState("")
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfPublicRecipes, setListOfPublicRecipes] = useState([])
  const [listOfPrivateRecipes, setListOfPrivateRecipes] = useState([])
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  // try {
  //   const token = localStorage.getItem("accessToken")
  //   const validToken = verify(token, "34qwereawdq4we3w3eqf7y6uhesecerttoken");
  //   // req.user = validToken;
  //   if (!validToken) {
  //       navigate("/login")
  //   }
  // } catch (err) {
  //     console.log("error")
  // }

  useEffect(() => {
    document.title = "Profil"
    axios.get("http://localhost:3001/categories").then((response) => {
      setListOfCategories(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/info/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/recipes/userid/${id}`).then((response) => {
      setListOfPrivateRecipes(response.data.filter((recipe) => {
        return recipe.visibility === "PRIVATE"
      }))
      setListOfPublicRecipes(response.data.filter((recipe) => {
        return recipe.visibility === "PUBLIC"
      }))
    })

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const likeARecipe = (recipeId) => {
    axios.post("http://localhost:3001/likes",
      { RecipeId: recipeId },
      {
        headers:
          { accessToken: localStorage.getItem("accessToken") }
      })
      .then((response) => {
        if (!listOfPublicRecipes.includes(recipeId)) {
          setListOfPrivateRecipes(
            listOfPrivateRecipes.map((recipe) => {
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
        }
        if (!listOfPrivateRecipes.includes(recipeId)) {
          setListOfPublicRecipes(
            listOfPublicRecipes.map((recipe) => {
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
        };

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


  return (
    <div className='profile-page-container'>
      {authState.status && (
        <>
          <div className='profile-recipes'>

            {listOfPrivateRecipes.length > 0 && authState.username === username && (
              <div>
                <div>
                  <h4 className="mb-4 mt-1 text-align-left">Przepisy prywatne: {listOfPrivateRecipes.length}</h4>
                </div>
                <Container>
                  <Row className='align-content-center'>
                    {listOfPrivateRecipes.map((value, key) => {
                      var date = new Date(value.createdAt);

                      var hour = date.getHours();
                      var minutes = date.getMinutes();
                      var mon = date.getMonth() + 1;
                      var day = date.getDate();
                      if (hour < 10) { hour = '0' + hour }
                      if (minutes < 10) { minutes = '0' + minutes }
                      if (mon < 10) { mon = '0' + mon }
                      if (day < 10) { day = '0' + day }

                      return (
                        <Card key={value.id} className="card-home-profile col-sm-6 col-lg-4">
                          <div>
                            <CardBody>
                              <CardTitle tag="h5"
                                onClick={() => {
                                  navigate(`/recipe/${value.id}`)
                                }}>
                                {value.name}
                              </CardTitle>
                            </CardBody >
                              <img
                                onClick={() => { navigate(`/recipe/${value.id}`) }}
                                alt="" width="90%"
                                src={listOfCategories[value.recipe_category_id-1].pic_url}
                              />
                            <CardBody>
                              <CardText>
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
              </div>
            )}
            <div>
              <h4 className="mb-4 mt-4 text-align-left">
                {authState.username !== username && (
                  <p>Przepisy publiczne użytkownika <b>{username}</b>: {listOfPublicRecipes.length} </p>
                )}
                {authState.username === username && (
                  <p>Przepisy publiczne: {listOfPublicRecipes.length}</p>
                )}

              </h4>
            </div>
            <Container>
              <Row className='align-content-center'>
                {listOfPublicRecipes.map((value, key) => {
                  var date = new Date(value.createdAt);

                  var hour = date.getHours();
                  var minutes = date.getMinutes();
                  var mon = date.getMonth() + 1;
                  var day = date.getDate();
                  if (hour < 10) { hour = '0' + hour }
                  if (minutes < 10) { minutes = '0' + minutes }
                  if (mon < 10) { mon = '0' + mon }
                  if (day < 10) { day = '0' + day }

                  return (
                    <Card key={value.id} className="card-home-profile col-sm-6 col-lg-4">
                      <div>
                        <CardBody>
                          <CardTitle tag="h5"
                            onClick={() => {
                              navigate(`/recipe/${value.id}`)
                            }}>
                            {value.name}
                          </CardTitle>
                        </CardBody >
                          <img
                            onClick={() => { navigate(`/recipe/${value.id}`) }}
                            alt="" width="90%"
                            src={listOfCategories[value.recipe_category_id-1].pic_url}
                          />
                        <CardBody>
                          <CardText>
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
                            <Col>
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
          </div>
        </>
      )}
      {!authState.status && (
        <>
          <h1>Nie masz prawa dostępu do tej strony!</h1>
          <h3>
            {" "}
            <Link to="/"> &gt;Strona główna</Link>
          </h3>

        </>
      )}
    </div>

  )
}

export default Profile