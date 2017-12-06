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
    affiliationItems: Array<{}>,
    affiliationList: Array<React.Node>
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
    const response: Object = await getAffiliationList(1);
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
      this.flashErrorMessage('Error: could not get affiliation list from server');
      return;
    }

    this.setState({ affiliationList: affiliationList });
    return Promise.resolve();
  }

  componentDidMount() {
    this.setAffiliationList();
  }

  render(): React.Node {
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
    const validName = name => name != null && name !== '' && name.match('[a-zA-Z.-]{2,}');
    let error = null;
    if (!validName(name_first)) {
      error = 'First Name must be at least two characters and only contain letters, dashes, or periods';
    } else if (!validName(name_last)) {
      error = 'Last Name must be at least two characters and only contain letters, dashes, or periods';
    } else if (affiliation_id === this.AFFILIATION_PLACEHOLDER) {
      error = 'Affiliation is required';
    } else if (phone == null || phone === '' || !phone.match(/^\d{10}$/)) {
      error = 'Phone number is required and must be 10 digits.';
    } else if (email == null || email === '' || !email.match('[a-zA-Z.-]{2,}')) {
      error = 'Email is required, and must be in email address format (text@text.domain)';
    } else if (password == null || password === '') {
      error = 'Password is required';
    } else if (password_confirm == null || password_confirm === '') {
      error = 'Password confirmation is required';
    } else if (password !== password_confirm) {
      error = 'Passwords do not match';
    }

    if (error != null) {
      this.flashErrorMessage(error);
      return;
    }

    try {
      const result = await register(name_first, name_last, rank, affiliation_id, email, password);
      if (result.success) {
        this.props.history.replace('/auth/login?justRegistered=true');
      } else {
        this.flashErrorMessage(result.error);
      }
    } catch (exc) {
      console.error(exc);
      this.flashErrorMessage('Registration failed: unknown error');
    }
  }

  flashErrorMessage(msg: string) {
    if (this.box != null) {
      this.box.flashErrorMessage(msg);
    }
  }
}
