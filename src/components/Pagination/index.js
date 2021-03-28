import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from 'reactstrap'
import "./style.css";

const defaultButton = props => <button {...props}>{props.children}</button>;

export default class Pagination extends React.Component {
  constructor(props) {
    super();

    this.changePage = this.changePage.bind(this);

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages)
    };
  }

  static propTypes = {
    pages: PropTypes.any,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string,
    pageSize: PropTypes.any,
    rowsText: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages)
      });
    }
    this.changePage(nextProps.page + 1);
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page + 1;

    if (page === activePage) {
      return;
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages);

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    });

    this.props.onPageChange(page - 1);
  }

  render() {
    const { PageButtonComponent = defaultButton } = this.props;
    const { visiblePages } = this.state;
    const activePage = this.props.page + 1;

    return (
      <div className="Table__pagination">
        <Row className="w-100">
          <Col xs={12} md={4} className='py-2'>
           
            {this.props.showPageSizeOptions &&
              <span className="select-wrap -pageSizeOptions">
                <select
                  className="selectRow"
                  onChange={e => this.props.onPageSizeChange(Number(e.target.value))}
                  value={this.props.pageSize}
                >
                  {this.props.pageSizeOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option} {this.props.rowsText}
                    </option>
                  ))}
                </select>
              </span>}
          </Col>
          <Col xs={12} md={8} className="d-flex flex-row justify-content-end py-2">
            <div className="Table__prevPageWrapper">
              <PageButtonComponent
                className="Table__pageButton"
                onClick={() => {
                  if (activePage === 1) return;
                  this.changePage(activePage - 1);
                }}
                disabled={activePage === 1}
              >
                {this.props.previousText}
              </PageButtonComponent>
            </div>
            <div className="Table__visiblePagesWrapper">
              {visiblePages.map((page, index, array) => {
                return (
                  <PageButtonComponent
                    key={page}
                    className={
                      activePage === page
                        ? "Table__pageButton Table__pageButton--active"
                        : "Table__pageButton"
                    }
                    onClick={this.changePage.bind(null, page)}
                  >
                    {array[index - 1] + 2 < page ? `...${page}` : page}
                  </PageButtonComponent>
                );
              })}
            </div>
            <div className="Table__nextPageWrapper">
              <PageButtonComponent
                className="Table__pageButton"
                onClick={() => {
                  if (activePage === this.props.pages) return;
                  this.changePage(activePage + 1);
                }}
                disabled={activePage === this.props.pages}
              >
                {this.props.nextText}
              </PageButtonComponent>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}