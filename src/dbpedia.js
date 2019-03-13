import React, { Component } from "react";
import axios from "axios";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.input !== prevProps.input) {
      let linkTest = /^http\w*/;
      let search = this.props.input;
      if (linkTest.test(search))
        search = "<" + this.props.input.replace("page", "resource") + ">";
      else search = "dbr:" + this.props.input.replace(" ", "_");
      const url = "https://dbpedia.org/sparql\\";
      const query = [
        "SELECT ?film",
        "WHERE {",
        "?film",
        "dbo:starring",
        search,
        "}"
      ].join(" ");

      const queryUrl = url + "?query=" + encodeURIComponent(query);
      console.log(queryUrl);
      axios.get(queryUrl).then(response => {
        this.setState({ films: response.data.results.bindings });
      });
    }
  }

  render(props) {
    console.log(this.state.films);

    const film = this.state.films.map(i => (
      <li>
        {i.film.value
          .replace("https://dbpedia.org/resource/", "")
          .replace(/_/g, " ")
          .replace(/\(([^\)]+)\)/, "")}
      </li>
    ));

    return <ul>{film}</ul>;
  }
}

export default Test;
