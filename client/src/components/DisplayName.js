import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function DisplayName(props){
    let user = props.dispalyName;
    return (
        <Nav.Item className="navbar-brand">
            <Button >
                {`NameDisplay ${user}`}
            </Button>
        </Nav.Item>  
        )
}

export default DisplayName;