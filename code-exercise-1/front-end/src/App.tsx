import React, { useState, FunctionComponent } from 'react';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';



type AppProps = any;

const App: FunctionComponent<AppProps> =() => {

    const [text,setText] = useState<string>('');

    const [valid,setValid] = useState<null|boolean>(null);

    const [typeOfValidation,setTypeOfValidation] = useState<null|string>(null);

    const [filePath,setFilePath] = useState<string| ArrayBuffer | null>('');

    const handleOnChange: any= (e: React.ChangeEvent<HTMLInputElement>) => {
        const _value = e.target.value;
        setValid(null);
        setTypeOfValidation('text');
        setText(_value);
    }

    const validateParanthesis:any = () => {
        const cleanString:string = text.replace(/([a-z]|[0-9]|[!@#$%^&*_+-={[\]|\\,.'"<>/?}])/g,'');

        let count:number = 0;

        cleanString.split('').forEach(char => {
            switch(char){
                case '(':
                    ++count;
                    break;
                case ')':
                    --count;
                    break;
                default:
                    break;
            }

            if(count < 0)  setValid(false);
        });

        if(count === 0) setValid(true);
    }

    const clearText = () => {
        setValid(null);
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
            setFilePath(reader.result)
;
        };

        reader.readAsDataURL(file);
    }

    const ValidationMessage = () => {

        const _valid = "Every looks good :)";

        const _invalid = "Check your syntax :(";

        const message = valid?_valid:_invalid;

        const color = valid?'success':'danger';

        return (
            <div>
                <Alert color={color}>{message}</Alert>
            </div>
        );
    }

    const displayAlert = valid !== null;
   
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
                            <Button block onClick={uploadFile}> <FontAwesomeIcon icon={faFileUpload}/> &nbsp; Upload .lsp</Button>
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
                            <Button  block color="success" onClick={validateParanthesis} >Validate</Button>
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