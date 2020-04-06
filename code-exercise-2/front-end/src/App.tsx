import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Input, Form, FormGroup, Label, FormFeedback, Button, Alert } from 'reactstrap';
import { MainFormSchema } from './yup-schema';
import axios from 'axios';

import {useForm} from './hooks/useForm';
import { states, formInfo} from './constants/main-form-constants';


const options = states.map(abbrev =>  <option>{abbrev}</option>);
 

type AppProps = any;

const App: FunctionComponent<AppProps> =() => {

    const [values,handleChange,handleBlur,getValidation] = useForm(formInfo);
 
    const {
        firstname,
        lastname,
        email,
        number,
        address,
        zip,
        city,
        state,
        npi
    } = values;



    

    const submit = e => {
         e.preventDefault();
    
        MainFormSchema.validate({
            firstname:firstname.value,
            lastname:lastname.value,
            email:email.value,
            number:number.value,
            address:address.value,
            zip:zip.value,
            city:city.value,
            state:state.value,
            npi:npi.value
        })
        .then(res => {
            axios.post('node-server/send-info',res);
        })
        .catch(err=> console.log(err))
    }

    return (
        <Container>
            { getValidation() && <div>
                <Alert color="danger">
                    Your missing some info :(
                </Alert> 
            </div>}
            <Form onSubmit={submit}>
                <Row>
                    <Col lg={6}>
                        <FormGroup>
                            <Label for="firstName">First name <span className="red">*</span></Label>
                            <Input  
                                invalid={firstname.invalid}
                                type="text" 
                                name="firstname" 
                                id="firstName" 
                                placeholder="Rick" 
                                value={firstname.value} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                          
                            />
                            <FormFeedback invalid>Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6}> 
                        <FormGroup>
                            <Label for="lastName">Last name <span className="red">*</span></Label>
                            <Input  
                                invalid={lastname.invalid}
                                type="text" 
                                name="lastname" 
                                id="lastname" 
                                placeholder="Sanchez" 
                                value={lastname.value} 
                                onChange={handleChange} 
                            />
                            <FormFeedback >Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <FormGroup>
                            <Label for="userEamil">Email <span className="red">*</span></Label>
                            <Input  
                                invalid={email.invalid}
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="RickSanchez@gmail.com"
                                value={email.value}
                                onChange={handleChange}

                            />
                            <FormFeedback >Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={4}> 
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number <span className="red">*</span></Label>
                            <Input  
                                invalid={number.invalid}
                                type="number" 
                                name="number" 
                                id="number" 
                                placeholder="9041234567"
                                value={number.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormFeedback >Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}> 
                        <FormGroup>
                            <Label for="npi">NPI Number<span className="red">*</span></Label>
                            <Input  
                                invalid={npi.invalid}
                                type="number" 
                                name="npi" 
                                id="npi" 
                                placeholder="123456"
                                value={npi.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormFeedback >Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>  
                        <FormGroup>
                            <Label for="userAddress">Address <span className="red">*</span></Label>
                            <Input 
                                invalid={address.invalid}
                                value={address.value}
                                type="text" 
                                name="address" 
                                id="address" 
                                placeholder="1234 Main St"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormFeedback >Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <Label for="userCity">City <span className="red">*</span></Label>
                            <Input 
                                invalid={city.invalid}
                                value={city.value}
                                type="text" 
                                name="city" 
                                id="city" 
                                placeholder="Seattle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormFeedback >Invalid input</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={4}> 
                        <FormGroup row>
                            <Label for="exampleSelect" >State</Label>
                            <Input 
                                invalid={state.invalid}
                                value={state.value}
                                type="select" 
                                placeholder="WA"
                                name="state" 
                                id="state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {options}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label for="userZip">Zip <span className="red">*</span></Label>
                            <Input 
                                invalid={zip.invalid}
                                value={zip.value}
                                type="text" 
                                name="zip" 
                                id="userZip"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormFeedback >Invalid input</FormFeedback>
                       </FormGroup>  
                    </Col>
                </Row>
                <Row>
                    <Col><Button block type='reset' color='danger'>Reset</Button></Col>
                    <Col><Button block type='submit' color='success'>Submit</Button></Col>
                </Row>
            </Form>
        </Container>
    )
};


export default App;