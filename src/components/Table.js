import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import headers from '../helpers/headers';

function Table({ expenses }) {
  return (
    <section>
      <table>
        <thead>
          <tr>
            {headers.map((header) => <td key={ header }>{header}</td>)}
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Table);
