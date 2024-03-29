import React from "react";
import "./ContactUsForm.css";
import {checkIfUserHasSignIn, currentUser} from "../../services/Util";

// 3. El nombre y apellidos del formulario deben inicializarse a los valores del nombre y apellidos del currentUser()

const initialState = () => {
    const {name, surname} = currentUser()
    return {
        name: name,
        surname: surname,
        subject: '',
        message: ''
    }
};

export default class ContactUsForm extends React.Component {
    constructor(props) {
        super(props);

        // 3. Comprobar que el usuario se ha registrado
        checkIfUserHasSignIn(this.props.history)

        this.state = initialState();

        // 3. Gestionar el formulario y verificar la información (onChange)
        // 3. Una vez verificada enviar a través de this.props.onSubmit
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        const field = event.target.name
        this.setState({[field]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
    
          if (this.state.name.trim().length === 0) {
            alert("Name should be more than 0 chars long")
            return
          }
    
          if (this.state.surname.trim().length === 0) {
            alert("Surname should be more than 0 chars long")
            return
          }
    
          if (this.state.subject.trim().length === 0) {
            alert("Subject not be should empty")
            return
          }

          if (this.state.message.trim().length === 0) {
            alert("Message not be should empty")
            return
          }

          this.setState({
            subject: "",
            message: ""
          });

          this.props.onSubmit(this.state);
    
    }


    render() {
        return <>
            <h4 className={`ml-2 mb-4`}>Contact with the WallaKeep team</h4>

            <form onSubmit={this.onSubmit}>
                <div>
                    <h5 className={`ml-2`}><b>Name</b></h5>
                    <input className={`form-control d-block contact-form-input`} type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <div>
                    <h5 className={`ml-2`}><b>Surname</b></h5>
                    <input className={`form-control d-block contact-form-input`} type="text" name="surname" value={this.state.surname} onChange={this.onChange}/>
                </div>
                <div>
                    <h5 className={`ml-2`}><b>Subject</b></h5>
                    <input className={`form-control d-block contact-form-input`} type="text" name="subject" value={this.state.subject} onChange={this.onChange}/>
                </div>
                <div>
                    <h5 className={`ml-2`}><b>Message</b></h5>
                    <textarea className={`form-control d-block contact-form-input`} value={this.state.message} name="message" cols="30" rows="10" onChange={this.onChange}/>
                </div>
                <div className={`ml-2`}>
                    <button type="submit" className="btn-primary btn">Save</button>
                </div>
            </form>
        </>;
    }
}
