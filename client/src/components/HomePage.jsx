import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <div className="bg-secodnary">
        <Card style={{textAlign: 'center', color: "white" }} className="container text-white bg-secondary">
          <CardTitle className="bg-secondary text-white" style={{ fontSize: '28px'}}>LinkSaver</CardTitle>
          {Auth.isUserAuthenticated() ? (
            <CardText className="bg-secondary text-white" >Welcome! You are logged in.</CardText>
          ) : (
              <CardText>
                <CardText style={{ fontSize: '20px'}} className="bg-secondary text-white">You are not logged in.</CardText>
                <CardText style={{ fontSize: '20px'}} className="bg-secondary text-white">Please Select Log In or Sign Up.</CardText>
              </CardText>
            )}
        </Card>
      </div>
    )
  }
};

export default HomePage;
