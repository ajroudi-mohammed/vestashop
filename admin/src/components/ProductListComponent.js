import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faChevronDown,
  faBoxOpen,
  faStore,
  faCartArrowDown,
  faChartPie,
  faRocket,
  faEdit,
  faEllipsisH,
  faSearch,
  faEye,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  InputGroup,
  Pagination,
  ButtonGroup
} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';
import { Form } from '@themesberg/react-bootstrap';
import transactions from '../data/transactions';
import commands from '../data/commands';

export default () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, price, issueDate, dueDate, status } =
      props;
    const statusVariant =
      status === 'Paid'
        ? 'success'
        : status === 'Due'
        ? 'warning'
        : status === 'Canceled'
        ? 'danger'
        : 'primary';

    return (
      <tr>
        <td>
          <Form.Check
            label="Disabled checkbox"
            id="checkbox2"
            htmlFor="checkbox2"
          />
        </td>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{subscription}</span>
        </td>
        <td>
          <span className="fw-normal">{issueDate}</span>
        </td>
        <td>
          <span className="fw-normal">{dueDate}</span>
        </td>
        <td>
          <span className="fw-normal">${parseFloat(price).toFixed(2)}</span>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Preview
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Row>
          <Col xs={12} xl={3}>
            <Dropdown className="mt-5 mb-4">
              <Dropdown.Toggle as={Button} variant="primary">
                <FontAwesomeIcon icon={faClipboard} className="me-2" /> Bulk
                actions
                <span className="icon icon-small ms-1">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Products
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faStore} className="me-2" /> Customers
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faCartArrowDown} className="me-2" />{' '}
                  Orders
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faChartPie} className="me-2" /> Console
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item>
                  <FontAwesomeIcon
                    icon={faRocket}
                    className="text-success me-2"
                  />{' '}
                  All Reports
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} xl={5}>
            <div className="d-flex align-items-center mt-5 mb-4">
              <Form className="navbar-search">
                <Form.Group id="topbarSearch">
                  <InputGroup className="input-group-merge search-bar">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Search" />
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">
                <Form.Check
                  label="Disabled checkbox"
                  id="checkbox2"
                  htmlFor="checkbox2"
                />
              </th>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Image</th>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Reference</th>
              <th className="border-bottom">Category</th>
              <th className="border-bottom">Price(tax excl.)</th>
              <th className="border-bottom">Price(tax incl.)</th>
              <th className="border-bottom">Quantity</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
