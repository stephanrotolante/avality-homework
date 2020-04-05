import React, { useState, FunctionComponent } from 'react';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const { PORT = 3333 } = process.env;


type AppProps = any;

const App: FunctionComponent<AppProps> =() => {

    const [text,setText] = useState<string>('');

    const [valid,setValid] = useState<number>(-1);

    const [typeOfValidation,setTypeOfValidation] = useState<null|string>(null);

    const [file,setFile] = useState<string| ArrayBuffer | null>('');

    const handleOnChange: any= (e: React.ChangeEvent<HTMLInputElement>) => {
        const _value = e.target.value;
        setValid(-1);
        setFile('');
        setTypeOfValidation('text');
        setText(_value);
    }
   
    const validateFile = () => {
        axios({
            method:"POST",
            url: `http://localhost:${PORT}/validate-file`,
            data: {
                file
            },
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token'
            }
        }).then(res => {
            const { valid } = res.data;
            if(valid) {
                setValid(0);
            } else {
                setValid(2);
            }
        }).catch(err =>  setValid(3));
    }
    
    const validateText:any = () => {
        axios({
            method:"POST",
            url: `http://localhost:${PORT}/validate-text`,
            data: {
                text
            },
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token'
            }
        }).then(res => {
            const { valid } = res.data;
            if(valid) {
                setValid(0);
            } else {
                setValid(2);
            }
        }).catch(err =>  setValid(3));
    }

    const clearText = () => {
        setValid(-1);
        setText('');
    }

    const uploadFile:any = () =>  {

        setTypeOfValidation('file');

        clearText();

        const node =  document.getElementById('hidden-input') as HTMLInputElement;
        
        node.click();


    } 
    const getImage:any = (e:any) => {

        const { files = [] } = e.target;

        console.log(e.target.files[0]);

        const file:File = files[0];
        const reader = new FileReader();
    
        
        reader.onload = function(e) {
            // The file's text will be printed here
            console.log(reader.result);
            setFile(reader.result)
;
        };

        reader.readAsDataURL(file);

        setTypeOfValidation('file');
        setValid(1);
    }

    const validate = () => {
        switch(typeOfValidation){
            case 'text':
                validateText();
                break;
            case 'file':
                validateFile();
                break;
            default:
        }
    }

    const ValidationMessage = () => {

        const _valid = "Every looks good :)";

        const _invalid = "Check your syntax :(";

        const successfulUpload = "Your file uploaded succesfully :D";

        const serviceFail = "Failure with the service :/"

        const success = 'success';
        const danger = 'danger';
        let message;
        let color;

        switch(valid){
            case 0:
                message = _valid;
                color = success;
                break;
            case 1:
                message = successfulUpload;
                color = success;
                break;
            case 2:
                message = _invalid;
                color = danger;
            case 3:
                message = serviceFail;
                color = danger;
            default:
        }

        return (
            <div>
                <Alert color={color}>{message}</Alert>
            </div>
        );
    }
    
    const displayAlert = valid !== -1;
   
    return (
        <Container>
             <Row>
                <Col>{displayAlert && <ValidationMessage/>}</Col>
            </Row>
            <Row>
                <Col lg={10}>
                     <Row>
                         <Col><textarea placeholder="Enter some text...." value={text} onChange={handleOnChange} className="my-text-area"></textarea></Col>
                    </Row>
                </Col>
                <Col lg={2}>
                    <Row>
                        <Col>
                            <div className="margin">
                            <Button block disabled={Boolean(text)} onClick={uploadFile}> <FontAwesomeIcon icon={faFileUpload}/> &nbsp; Upload .lsp</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="margin">
                            <Button block color="danger" onClick={clearText}> Clear</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="margin">
                            <Button  block color="success" disabled={!!!text && !!!file} onClick={validate} >Validate</Button>
                            </div>
                        </Col>
                    </Row> 
                </Col>
            </Row>
            <input id='hidden-input' onChange={getImage} type="file" accept=".lsp"/>
        </Container>
    )
};


export default App;