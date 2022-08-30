import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import headers from '../helpers/headers';
import { deleteExpense } from '../redux/actions';

function Table({ dispatch, expenses }) {
  const handleClick = (id) => dispatch(deleteExpense(id));

  return (
    <section>
      <table>
        <thead>
          <tr>
            {headers.map((header) => <th key={ header }>{header}</th>)}
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
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => handleClick(id) }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

Table.propTypes = {
  dispatch: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Table);
