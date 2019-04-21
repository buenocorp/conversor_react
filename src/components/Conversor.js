import React, { Component } from "react";

// import { Container } from './styles';
import "./Conversor.css";

export default class Conversor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moedaA_valor: "",
      moedaB_valor: 0
    };

    this.converter = this.converter.bind(this);
  }

  converter() {
    const de_para = `${this.props.moedaA}_${this.props.moedaB}`;
    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${de_para}&compact=ultra&apiKey=d15e64ff2ba68a1dca93`;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        const cotacao = json[de_para];

        const moedaB_valor = parseFloat(
          this.state.moedaA_valor * cotacao
        ).toFixed(2);
        this.setState({ moedaB_valor });
      });
  }

  render() {
    return (
      <div className="conversor">
        <h2>
          {this.props.moedaA} para {this.props.moedaB}
        </h2>
        <input
          type="text" 
          onChange={event => {
            this.setState({ moedaA_valor: event.target.value });
          }}
        />
        <input type="button" value="Converter " onClick={this.converter} />
        <h2>{this.state.moedaB_valor}</h2>
      </div>
    );
  }
}
