
import { Container, Col, Row, Button, Form, Card, ListGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { service } from "..";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const MyForm = ({ setListBrandGame }) => {
  const contextValue = useContext(AppContext);
  const listCategory = [
    { value: "all", label: "All category" },
    { value: "Category 1", label: "Category 1" },
    { value: "Category 2", label: "Category 2" },
    { value: "Category 3", label: "Category 3" },
  ]
  const listCountry = [
    { value: "UK", label: "UK" },
    { value: "US", label: "US" },
    { value: "FR", label: "FR" },
    { value: "KR", label: "KR" },
    { value: "CS", label: "CS" },
  ];
  const listBrandid = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];
  const [dataToSend, setDataToSend] = useState({});

  const getListGames = () => {
    service.game
      .getListGames(dataToSend)
      .then((response) => {
        console.log(response.data);
        setListBrandGame(response.data);
      });
  }

  return (
    <>
      <Formik
        initialValues={{
          brandid: 1,
          country: "UK",
          category: "all"
        }}
        onSubmit={async (values) => {
          dataToSend.brandid = values.brandid;
          dataToSend.country = values.country;
          dataToSend.category = values.category;
          getListGames();
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    as="select"
                    onChange={handleChange("country")}
                    value={values.country}
                  >
                    {listCountry.map((option, index) => {
                      return (
                        <option
                          key={`option-${index}`}
                          value={option.value}>
                          {option.label || option.value}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="brandid">
                  <Form.Label>Brandid</Form.Label>
                  <Form.Control
                    name="brandid"
                    as="select"
                    onChange={handleChange("brandid")}
                    value={values.brandid}
                  >
                    {listBrandid.map((option, index) => {
                      return (
                        <option
                          key={`option-${index}`}
                          value={option.value}>
                          {option.label || option.value}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    as="select"
                    onChange={handleChange("category")}
                    value={values.category}
                  >
                    {listCategory.map((option, index) => {
                      return (
                        <option
                          key={`option-${index}`}
                          value={option.value}>
                          {option.label || option.value}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Button
                type="submit"
                variant="outline-success"
                size="sm"
                className="btn-validation"
                onClick={handleSubmit}
              >
                Get
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  )

}

export default MyForm;
