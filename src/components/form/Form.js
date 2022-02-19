import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';

const Form = () => {
  const [userInfo, setUserInfo] = useState({
    fields: {
      email: '',
      companyName: '',
      password: '',
    },
    errors: {
      email: '',
      companyName: '',
      password: '',
    },
  });

  const [check, setCheck] = useState(false);
  const checkBoxRef = useRef(null);

  const validate = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) {
          return 'Please enter email';
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return 'Invalid email address';
        } else {
          return '';
        }
      case 'companyName':
        if (!value || value.trim() === '') {
          return 'Please enter company name';
        } else if (value.length < 5) {
          return 'Too short';
        } else {
          return '';
        }
      case 'password':
        if (!value) {
          return 'Please enter password';
        } else if (value.length < 6) {
          return 'Please use more then 6 characters';
        } else if (!value.match(/[a-z]/g)) {
          return 'Please enter at least lower character';
        } else if (!value.match(/[A-Z]/g)) {
          return 'Please enter at least upper character';
        } else if (!value.match(/[0-9]/g)) {
          return 'Please enter at least one digit';
        } else {
          return '';
        }
      default: {
        return '';
      }
    }
  };

  const handleUserInput = (e) => {
    setUserInfo({
      ...userInfo,
      fields: {
        ...userInfo.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fields } = userInfo;
    let validationError = { email: '', companyName: '', password: '' };
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error.length > 0) {
        validationError[name] = error;
        setUserInfo({ ...userInfo, errors: validationError });
      } else {
        validationError[name] = '';
        setUserInfo({ ...userInfo, errors: validationError });
      }
    });

    if (
      userInfo.errors.email.length > 0 ||
      userInfo.errors.companyName.length > 0 ||
      userInfo.errors.password.length > 0
    ) {
      return;
    }

    if (
      userInfo.fields.email &&
      userInfo.fields.companyName &&
      userInfo.fields.password
    ) {
      if (!check) {
        alert('Please agree for terms and condtions');
      } else {
        alert('Login successfull');
        console.log('successfull');
        setUserInfo({
          ...userInfo,
          fields: {
            email: '',
            companyName: '',
            password: '',
          },
        });
        checkBoxRef.current.checked = false;
      }
    }
  };

  return (
    <section className="form__container">
      <div className="form__section">
        <h1>sign up</h1>
        <p>No credit card required</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input">
            {/* <label htmlFor="email"></label> */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={userInfo.fields.email}
              onChange={(e) => handleUserInput(e)}
            />
            <div className="input__fields__error">
              {userInfo.errors.email && userInfo.errors.email}
            </div>
          </div>

          <div className="form__input">
            {/* <label htmlFor="companyName"></label> */}
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company name"
              value={userInfo.fields.companyName}
              onChange={(e) => handleUserInput(e)}
            />
            <div className="input__fields__error">
              {userInfo.errors.companyName}
            </div>
          </div>

          <div className="form__input">
            {/* <label htmlFor="password"></label> */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={userInfo.fields.password}
              onChange={(e) => handleUserInput(e)}
            />
            <div className="input__fields__error">
              {userInfo.errors.password}
            </div>
          </div>

          <div className=" terms__condition">
            <div>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                ref={checkBoxRef}
                onChange={(e) => setCheck(handleChecked(e))}
              />
            </div>
            <span className="agree__to__terms">
              I agree to{' '}
              <a href="#" className="terms__and__conditions">
                Terms & conditions
              </a>
            </span>
          </div>

          <div className="button__container">
            <button type="submit">get started</button>
          </div>

          <div className="sign__in__container">
            <p>
              Already have an account?{' '}
              <a href="#" className="sign__in__link">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
