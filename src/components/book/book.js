/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import axios from 'axios';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Loading from '../loading/loading';
import { shortHeader, shortBody, apiList } from '../../helpers';

class Books extends Component {
  constructor() {
    super();
    this.state = {
      result: false,
      dataLoaded: false,
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ result: true });

    axios.get(`${apiList.FETCH_BOOKS}`)
      .then((response) => {
        this.setState({ data: [...response.data], dataLoaded: true });
        setTimeout(() => {
          this.setState({ result: false });
        }, 1500);
      })
      .catch((error) => {
        toast.error(`${error.response.data.error || error.response.data.message}`);
        setTimeout(() => {
          this.setState({ result: false });
        }, 1500);
      });
  }

  render() {
    const { result, data, dataLoaded } = this.state;

    return (
      <div className="book-page">

        {result === true ? <Loading MainProps={this.props} /> : null }

        <ToastContainer />

        <Helmet>
          <style>{'body { background-color: #cccccc; }'}</style>
        </Helmet>

        <div className="container">

          <div className="header-container">
            <h1 className="header">Paginated Books</h1>
          </div>

          <div className="action-container">

            <div className="search-action">

              <input type="text" placeholder="Search" />
              <FontAwesomeIcon icon={faSearch} className="icon" />

            </div>

            <div className="paginate-action">

              <FontAwesomeIcon icon={faAngleLeft} className="paginate-angles" style={{ color: '#6d6868' }} />

              <span className="paginate-page"> 0 1 </span>

              <FontAwesomeIcon icon={faAngleRight} className="paginate-angles" style={{ color: '#6d6868' }} />

            </div>

          </div>

          <div className="box-container">

            {dataLoaded === true && data.length > 0
              ? data.map((element) => (
                <div className="box-option" key={element.id}>

                  <div className="window-description">

                    <span> {element.id} </span>

                    <div className="window-text">

                      <div className="text-title">{shortHeader(element.title)}</div>
                      <div className="text-contents"> {shortBody(element.body)}</div>

                    </div>

                  </div>

                  <div className="window-action">

                    <button type="submit"> View Book </button>

                  </div>

                </div>
              ))

              : null}

          </div>

        </div>

      </div>
    );
  }
}

export default Books;
