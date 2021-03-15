/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import axios from 'axios';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft, faAngleRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import Loading from '../loading/loading';
import { shortHeader, shortBody, apiList, variables } from '../../helpers';

let booksData = [];
const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.SUCCUSS_TIMEOUT;
class Books extends Component {
  constructor() {
    super();
    this.state = {
      result: false,
      dataLoaded: false,
      searchedDataLoaded: false,

      data: [],
      searchedData: [],

      currentPage: 1,
      postPerPage: 9,
      pageCount: null,

      keyword: '',
    };
  }

  componentDidMount() {
    const { postPerPage } = this.state;
    this.setState({ result: true, data: [], dataLoaded: false, searchedData: [], searchedDataLoaded: false });

    axios.get(`${apiList.FETCH_BOOKS}`)
      .then((response) => {
        this.setState({
          data: [...response.data],
          dataLoaded: true,
          pageCount: Math.ceil(response.data.length / postPerPage)
        });

        setTimeout(() => {
          this.setState({ result: false });
        }, successTimeOut);
      })
      .catch((error) => {
        toast.error(`${error.response.data.error || error.response.data.message}`);
        setTimeout(() => {
          this.setState({ result: false });
        }, errorTimeOut);
      });
  }

  handlePreviouPage(key, page) {
    key.preventDefault();
    this.setState({ currentPage: page, searchedData: [], searchedDataLoaded: false });
  }

  handleNextPage(key, page) {
    key.preventDefault();
    this.setState({ currentPage: page, searchedData: [], searchedDataLoaded: false });
  }

  handleSearchBook(key) {
    key.preventDefault();
    const newData = [];
    const { keyword } = this.state;

    if (keyword.length < 1) {
      toast.error('Search keyword is required');
      return;
    }

    this.setState({ result: true });
    const filter = keyword.toLowerCase();

    booksData.find((element) => {
      if (element.title.toLowerCase().indexOf(filter) > -1) {
        newData.push(element);
        this.setState({ searchedData: [...newData], searchedDataLoaded: true });

        setTimeout(() => {
          this.setState({ result: false });
        }, successTimeOut);
      }
    });

    if (!booksData.find((element) => element.title.toLowerCase().indexOf(filter) > -1)) {
      toast.error('Matching results not found');
      setTimeout(() => {
        this.setState({ result: false });
      }, errorTimeOut);
    }
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({ [key.target.id]: key.target.value });
  }

  render() {
    const {
      result,
      keyword,

      data,
      searchedData,

      dataLoaded,
      searchedDataLoaded,

      pageCount,
      currentPage,
      postPerPage,
    } = this.state;

    const indexOfLastBook = currentPage * postPerPage;
    const indexOfFirstBook = indexOfLastBook - postPerPage;
    booksData = searchedData.length > 0 && searchedDataLoaded === true
      ? searchedData.slice(indexOfFirstBook, indexOfLastBook)
      : data.slice(indexOfFirstBook, indexOfLastBook);

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

              <input type="text" placeholder="Search" id="keyword" value={keyword} onChange={(id) => this.handleChange(id)} />
              <FontAwesomeIcon icon={faSearch} className="icon" onClick={(key) => { this.handleSearchBook(key); }} />

            </div>

            <div className="reload-action">

              <FontAwesomeIcon icon={faSyncAlt} className="icon" onClick={(key) => { this.componentDidMount(key); }} />

            </div>

            <div className="paginate-action">

              {
                currentPage > 1
                  ? (<FontAwesomeIcon icon={faAngleLeft} className="paginate-angles" style={{ color: '#1d7875' }} onClick={(key) => { this.handlePreviouPage(key, currentPage - 1); }} />)
                  : (<FontAwesomeIcon icon={faAngleLeft} className="paginate-angles" style={{ color: '#6d6868' }} />)
              }

              <span className="paginate-page"> {currentPage < 10 ? `0${currentPage}` : currentPage} </span>

              {
                pageCount > currentPage
                  ? (<FontAwesomeIcon icon={faAngleRight} className="paginate-angles" style={{ color: '#1d7875' }} onClick={(key) => { this.handleNextPage(key, currentPage + 1); }} />)
                  : (<FontAwesomeIcon icon={faAngleRight} className="paginate-angles" style={{ color: '#6d6868' }} />)
              }

            </div>

          </div>

          <div className="box-container">

            {dataLoaded === true && data.length
              ? booksData.map((element) => (
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
