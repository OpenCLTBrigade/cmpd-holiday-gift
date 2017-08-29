// @flow

import * as React from 'react';
import styled from 'styled-components';
import FooterLink from './components/footer-link';

import FormBox from './components/form-box';

import Footer from './components/footer';
import FormGroup from './components/form-group';
import Label from './components/form-label';

import { getAffiliationList } from '../../api/affiliation';
import type { AffiliationType } from '../../api/affiliation';
import { register } from '../../lib/auth';

const Icon = styled.i`top: 20px !important;`;

export default class Register extends React.Component <{
  history: *
}, *> {
  box: ?FormBox;
  AFFILIATION_PLACEHOLDER: string;
  state: {
    affiliationList: any
  };
  constructor() {
    super();
    this.AFFILIATION_PLACEHOLDER = '=== Select affiliation ===';
    this.state = { affiliationList: [] };
  }
  async fetch(): Promise<AffiliationType[]> {
    try {
      const response: Object = await getAffiliationList(0, null);
      return response;
    } catch (error) {
      console.log(error);
      return Promise.reject([]);
    }
  }
  async fetchAffiliationList(): Promise<void> {
    try {
      const rawList = await this.fetch();
      if (rawList == null || rawList === undefined || rawList === ''
        || rawList.items == null || rawList.items === undefined || rawList.items === '') {
        (this.box: any).flashErrorMessage('Error: could not get affilation list from server');
      } else if (rawList.items == null || rawList.items === undefined || rawList.items === '') {
        (this.box: any).flashErrorMessage('Error: not get correctly formatted affilation list from server');
      } else {
        const items = rawList.items;
        this.setState({ affiliationList: items });
        const affiliationList = this.state.affiliationList.map((affiliation_id, i) =>
          <option key={i}>{affiliation_id}</option>
          );
        this.setState({ affiliationList: affiliationList });
      }
      return Promise.resolve();
    } catch (err) {
      (this.box: any).flashErrorMessage('Error: could not get affilation list from server');
      return Promise.reject();
    }
  }
  componentDidMount() {
    this.fetchAffiliationList();
  }
  render(): React.Element<any> {
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
    affiliation_id: string,
    rank: string,
    phone: number,
    email: string,
    password: string,
    password_confirm: string
  }): Promise<void> {
    if (!name_first || !name_first.match('[a-zA-Z.-]{2,}')) {
      const ERROR_MESSAGE = 'Last Name must be at least two characters and only contain letters, dashes, or periods';
      (this.box: any).flashErrorMessage(ERROR_MESSAGE);
      return;
    } else if (!name_last || !name_last.match('[a-zA-Z.-]{2,}')) {
      const ERROR_MESSAGE = 'Last Name must be at least two characters and only contain letters, dashes, or periods';
      (this.box: any).flashErrorMessage(ERROR_MESSAGE);
      return;
    } else if (affiliation_id === this.AFFILIATION_PLACEHOLDER) {
      (this.box: any).flashErrorMessage('Affiliation is required');
      return;
    } else if (!phone) {
      (this.box: any).flashErrorMessage('Phone number is required');
      return;
    } else if (!email || !email.match('[a-zA-Z.-]{2,}')) {
      (this.box: any).flashErrorMessage('Email is required, and must be in email address format (text@text.domain)');
      return;
    } else if (!password || !password_confirm) {
      (this.box: any).flashErrorMessage('Password is required');
      return;
    } else if (password !== password_confirm) {
      (this.box: any).flashErrorMessage('Passwords do not match');
      return;
    }

    try {
      const success = await register(name_first, name_last, rank, affiliation_id, email, password);
      if (success) {
        // TODO: display a message after confirmation email is sent
        this.props.history.replace((this.props: any).returnTo || '/login');
      } else {
        // TODO: show error message from server
        (this.box: any).flashErrorMessage('Registration failed: wrong email or password');
      }
    } catch (exc) {
      (this.box: any).flashErrorMessage('Registration failed: unknown error');
    }
  }

}
