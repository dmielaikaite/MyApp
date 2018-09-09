import React, { Component } from 'react';
import Input from '../FormFields/input.js';
import Select from '../FormFields/select.js';
import Error from '../FormFields/error.js';

class FormContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      newUser: {
        username: '',
        password: '',
        confirmedPassword: '',
        email: '',
        gender: ''
      },
      genderOptions: ["Male", "Female", "Other"]
    }
    this.handleFieldChage = this.handleFieldChage.bind(this);
  }

  handleFieldChage(e) {
    let value = e.target.value;
    let name = e.target.name
    this.setState( prevState => {
       return {
          newUser : {
                   ...prevState.newUser, [name]: value
                 }
       }
    }, () => this.props.dataHandler(this.state.newUser)

    )
  }

  render(){
    return (
      <form role="form" data-toggle="validator" onSubmit={this.props.handleFormSubmit}>
        <Input type={'text'}
               title= {'User name'}
               name= {'username'}
               value={this.state.newUser.username}
               placeholder = {'Enter your username'}
               handleChange = {this.handleFieldChage}/>
               <Error errorText={this.props.errors.username}/>
         <Input type={'password'}
                title= {'Password'}
                name= {'password'}
                value={this.state.newUser.password}
                placeholder = {'Enter your password'}
                handleChange = {this.handleFieldChage} />
                <Error errorText={this.props.errors.password}/>
        <Input type={'password'}
               title= {'Confirm password'}
               name= {'confirmedPassword'}
               value={this.state.newUser.confirmedPassword}
               placeholder = {'Enter your confirmed password'}
               handleChange = {this.handleFieldChage} />
               <Error errorText={this.props.errors.confirmedPassword}/>
        <Input type={'email'}
               title= {'Email address'}
               name= {'email'}
               value={this.state.newUser.email}
               placeholder = {'Enter your email address'}
               handleChange = {this.handleFieldChage}/>
               <Error errorText={this.props.errors.email}/>
         <Select title={'Gender'}
                name={'gender'}
                options = {this.state.genderOptions}
                value = {this.state.newUser.gender}
                placeholder = {'Select Gender'}
                handleChange = {this.handleFieldChage}/>
                <Error errorText={this.props.errors.gender}/>
      </form>
    )
  }

}

export default FormContainer;
