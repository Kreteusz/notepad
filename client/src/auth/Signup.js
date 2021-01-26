import React, {useState} from "react";
import axios from "axios"
const Signup = () => {
    const [values, setValues] = useState({
        email: "damianczepiel@gmail.com",
        password: "qwerty",
      });
      const {email,password} = values;

      const clickSubmit = (event) => {
        event.preventDefault();
        axios({
          headers: { 'Content-Type': 'application/json'},
          method: "POST",
          url: `${process.env.REACT_APP_API}/signup`,
          data: {email, password},
        })
          .then((response) => {
            console.log("SIGNUP SUCCESS", response);
            setValues({
              ...values,
              email: "",
              password: "",
            });
          })
          .catch((error) => {
            console.log("SIGNUP ERROR", error.response.data);
          });
      };

    return (
        <div>
            <form>
                <label>E-mail</label>
                <input value={values.email} type='email'></input>
                <label>Password</label>
                <input value={values.password} type='password'></input>
                <button onClick={clickSubmit}>Wyslij</button>
            </form>
        </div>
    )
}

export default Signup