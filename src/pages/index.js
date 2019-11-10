import React, { Component } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import Users from "../components/users"

const API_KEY = process.env.GATSBY_API_KEY;
console.log('NETLIFY - ', process.env.NETLIFY)
console.log('KEY - ', process.env.GATSBY_API_KEY)
console.log('URL - ', process.env.GATSBY_API_URL)
console.log('TEST', process.env)

if (process.env.NETLIFY === 'true') {
 console.log(API_KEY)
}

class IndexPage extends Component {
  state = {
    loading: false,
    error: false,
    movies: {
      title: '',
      imdbRating: ''
    }
  }

  componentDidMount() {
    this.latestMovie()
  }

  render() {
    const { title, imdbRating } = this.state.movies

    return (
      <Layout>
        <SEO title="Home" />

        <div>
          {`${process.env.GATSBY_API_URL}/logo.png`}
        </div>

        <div style={{ textAlign: "center", width: "600px", margin: "50px auto" }}>
          <div>
            {this.state.loading ? (
              <p>Please hold, movie incoming!</p>
            ) : title && imdbRating ? (
              <>
                <h2>{`${title}`}</h2>
                <p>{imdbRating}</p>
              </>
            ) : (
              <p>Oh noes, error fetching movie :(</p>
            )}
          </div>
        </div>
      </Layout>
    )
  }

  // This data is fetched at run time on the client.
  latestMovie = () => {
    let API_URL = 'https://www.omdbapi.com/?apikey=' + API_KEY + '&i=tt3896198';

    this.setState({ loading: true })

    axios
      .get(API_URL)
      .then(movies => {
        const {
          data: {
            Title: title,
            imdbRating
          },
        } = movies
        // console.log(movies)
        this.setState({
          loading: false,
          movies: {
            ...this.state.movies,
            title,
            imdbRating,
          },
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }
}

export default IndexPage
