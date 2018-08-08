import React, { Component } from 'react';
import Link from '../link/link'
import "./folder.css";

const linkStuff = (props) => (
    <div>
        <div className="row bg-dark rounded">
            <div className="col-12">
                    {props.links.map(link => {
                    return (<Link
                        folderID={props._id}
                        key={link.url}
                        name={link.name}
                        url={link.url}
                        deleteLink={props.deleteLink}
                        copy={props.copy}
                        description={link.description}
                    />)
                })}
            </div>
        </div>
        <div className="container mt-3">
            <h5>Add a new link</h5>
            <div className="form-group">
                <label>Search Term:</label>
                <input
                    type="text"
                    className="form-control col-8"
                    name="newname"
                    value={props.newname}
                    onChange={props.handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>URL:</label>
                <input
                    type="url"
                    className="form-control col-8"
                    name="newURL"
                    value={props.newURL}
                    onChange={props.handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input
                    type="text"
                    className="form-control col-8"
                    name="newDescription"
                    value={props.newDescription}
                    onChange={props.handleInputChange}
                />
            </div>
            <button className="btn btn-success my-2" onClick={() => props.addLink(props._id)}>Add New Link</button>
        </div>
    </div>
);

class NewFolder extends Component {

    componentWillMount() {
        // stuff
        this.state = {
            hi: 'what',
            active: false,
        };
    }

    setActiveFolder = () => {
        if (!this.state.active) {
            this.setState({
                ...this.state,
                active: true
            })
        }
        else if (this.state.active) {
            this.setState({
                ...this.state,
                active: false
            })
        }
    }

    //----------
    //Render
    render() {
        {
            if (this.state.active) 
                return (
                    <div>
                        <div className="col-12 py-2 m-2 bg-secondary text-white border border-2 border-white mt-4 rounded">
                            <div className="col-8" onClick={() => this.setActiveFolder()}>
                                <h4 className="col-10 mt-4">{this.props.name}</h4>
                            </div>
                            <div className="col-12">
                                <img onClick={() => this.props.copy(this.props._id)} className="copy-icon function-button m-1" id="copyButton" alt="Copy Link To Clipboard" src="./assets/images/icons/link.png"></img>
                                <img onClick={() => this.props.deleteFolder(this.props._id)} className="delete-icon function-button m-1" id="deleteButton" alt="Delete Link From Folder" src="./assets/images/icons/delete.png"></img>
                            </div>
                            <div className="ml-4">
                                <p>{this.props.description}</p>
                            </div>
                            {this.props.links.length > 0 ? linkStuff(this.props) : ''}
                        </div>
                    </div>
                );
            else 
                return (
                    <div>
                        <div className="col-12 py-2 m-2 bg-secondary text-white border border-2 border-white mt-4 rounded">
                            <div className="col-8" onClick={() => this.setActiveFolder()}>
                                <h4 className="col-10 mt-4">{this.props.name}</h4>
                            </div>
                            <div className="col-12">
                                <img onClick={() => this.props.copy(this.props._id)} className="copy-icon function-button m-1" id="copyButton" alt="Copy Link To Clipboard" src="./assets/images/icons/link.png"></img>
                                <img onClick={() => this.props.deleteFolder(this.props._id)} className="delete-icon function-button m-1" id="deleteButton" alt="Delete Link From Folder" src="./assets/images/icons/delete.png"></img>
                            </div>
                            <div className="ml-4">
                                <p>{this.props.description}</p>
                            </div>
                            {this.props.links.length > 0 ? linkStuff : ''}
                        </div>
                    </div>

                );
            };
        }
    };

    export default NewFolder;
