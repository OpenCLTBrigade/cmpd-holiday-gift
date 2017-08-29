// @flow

import * as React from 'react';
import styled from 'styled-components';

import FormBox from './components/form-box';

import Footer from './components/footer';
import FooterLink from './components/footer-link';
import FormGroup from './components/form-group';
import Label from './components/form-label';

import { getAffiliationList } from '../../api/affiliation';
import { register } from '../../lib/auth';

const Icon = styled.i`top: 20px !important;`;

export default class Register extends React.Component <{
  history: *
}, *> {
  box: ?FormBox;
  AFFILIATION_PLACEHOLDER: string;
  state: {
    affiliationItems: Array<Object>,
    affiliationList: Array<Object> // UI option elements
  };
  constructor() {
    super();
    this.AFFILIATION_PLACEHOLDER = '=== Select affiliation ===';
    this.state = {
      affiliationItems: [],
      affiliationList: []
    };
  }
  async fetch(): Promise<void> {
    const response: Object = await getAffiliationList();
    if (response.items == null || response.items === '' || response.items === undefined) {
      throw new Error('items not defined');
    }
    this.setState({ affiliationItems: response.items });
    return Promise.resolve();
  }
  async setAffiliationList(): Promise<void> {
    let affiliationList;
    try {
      await this.fetch();
      const items: Array<Object> = this.state.affiliationItems;
      affiliationList = items.map(item =>
        <option key={item.id} value={item.id}>{item.type.toUpperCase()} - {item.name}</option>
      );
    } catch (err) {
      console.error(err);
      (this.box: $TODO).flashErrorMessage('Error: could not get affiliation list from server');
      return;
    }

    this.setState({ affiliationList: affiliationList });
    return Promise.resolve();
  }
  componentDidMount() {
    this.setAffiliationList();
  }
  render(): React.Element<$TODO> {
    return (
      <FormBox
        title="Register"
        submitText="Register"
        headerImageClass="fa fa-user-plus"
        onSubmit={this.onSubmit.bind(this)}
        ref={ref => (this.box = ref)}
        body={
          <div>
            <FormGroup className="form-group has-feedback">
              <Label>
                First Name
                <input className="form-control" name="name_first" type="text" />
              </Label>
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Last Name
                <input className="form-control" name="name_last" type="text" />
              </Label>
            </FormGroup>
            <FormGroup className="form-group has-feedback">
                <Label>
                  Affiliation
                  <select className="form-control" name="affiliation_id" type="text" >
                    <option>{this.AFFILIATION_PLACEHOLDER}</option>
                    {this.state.affiliationList}
                  </select>
                </Label>
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Rank
                <input className="form-control" name="rank" type="text" />
              </Label>
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Phone
                <input className="form-control" name="phone" type="text" />
              </Label>
              <Icon className="fa fa-phone form-control-feedback" />
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                E-mail address
                <input className="form-control" name="email" type="text" />
              </Label>
              <Icon className="fa fa-envelope form-control-feedback" />
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Password
                <input className="form-control" name="password" type="password" />
              </Label>
              <Icon className="fa fa-lock form-control-feedback" />
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Confirm Password
                <input className="form-control" name="password_confirm" type="password" />
              </Label>
              <Icon className="fa fa-lock form-control-feedback" />
            </FormGroup>
          </div>
        }
        footer={
          <Footer>
            <div className="col-xs-6">
              <FooterLink className="btn btn-link" to="/auth/login">
                <i className="fa fa-sign-in" />
                <span> Login</span>
              </FooterLink>
            </div>
            <div className="col-xs-6">
            </div>
          </Footer>
        }
      />
    );
  }

  async onSubmit({
    name_first,
    name_last,
    affiliation_id,
    rank, phone, email,
    password,
    password_confirm
  }: {
    name_first: string,
    name_last: string,
    affiliation_id: number,
    rank: string,
    phone: number,
    email: string,
    password: string,
    password_confirm: string
  }): Promise<void> {
    if (name_first == null || name_first === '' || !name_first.match('[a-zA-Z.-]{2,}')) {
      const ERROR_MESSAGE = 'Last Name must be at least two characters and only contain letters, dashes, or periods';
      (this.box: $TODO).flashErrorMessage(ERROR_MESSAGE);
      return;
    } else if (name_last == null || name_last === '' || !name_last.match('[a-zA-Z.-]{2,}')) {
      const ERROR_MESSAGE = 'Last Name must be at least two characters and only contain letters, dashes, or periods';
      (this.box: $TODO).flashErrorMessage(ERROR_MESSAGE);
      return;
    } else if (affiliation_id === this.AFFILIATION_PLACEHOLDER) {
      (this.box: $TODO).flashErrorMessage('Affiliation is required');
      return;
    } else if (phone == null || phone === '') {
      (this.box: $TODO).flashErrorMessage('Phone number is required');
      return;
    } else if (email == null || email === '' || !email.match('[a-zA-Z.-]{2,}')) {
      (this.box: $TODO).flashErrorMessage('Email is required, and must be in email address format (text@text.domain)');
      return;
    } else if (password == null || password === '') {
      (this.box: $TODO).flashErrorMessage('Password is required');
      return;
    } else if (password_confirm == null || password_confirm === '') {
      (this.box: $TODO).flashErrorMessage('Password confirmation is required');
      return;
    } else if (password !== password_confirm) {
      (this.box: $TODO).flashErrorMessage('Passwords do not match');
      return;
    }

    try {
      const result = await register(name_first, name_last, rank, affiliation_id, email, password);
      if (result.success === true) {
        this.props.history.replace((this.props: $TODO).returnTo || '/auth/login?justRegistered=true');
      } else {
        (this.box: $TODO).flashErrorMessage(result);
      }
    } catch (exc) {
      console.error(exc);
      (this.box: $TODO).flashErrorMessage('Registration failed: unknown error');
    }
  }

}
