// @flow

import React from 'react';

export default class LoginBox extends React.Component {
  state: {errorMessage: ?string}
  email: HTMLInputElement
  password: HTMLInputElement

  constructor() {
    super();
    this.state = { errorMessage: null };
  }

  onSubmit(ev: Event) {
    ev.preventDefault();
    this.props.onSubmit({ email: this.email.value, password: this.password.value });
  }

  flashErrorMessage(message: string) {
    this.setState({ errorMessage: message });
  }

  render(): React.Element<any> {
    return <div className="login-box" id="login-box">
      {/* TODO: Better flash message */}
      { !this.state.errorMessage ? '' :
        <div style={{ border: '2px solid #f00', background: '#fdd' }}>
          {this.state.errorMessage}
        </div> }
      <div className="header">
        <i className="fa fa-user-plus" />
        {this.props.title}
      </div>

      <div className="body">
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group has-feedback">
          <label>First Name</label>
          <input name="name_first" className="form-control" type="text" ref={ref => this.name_first = ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Last Name</label>
          <input name="name_last" className="form-control" type="text" ref={ref => this.name_last = ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Affiliation</label>
          <select className="form-control" name="affiliation_id" ref={ref => this.affiliation_id = ref}>
            <option selected="selected" value="">=== Select affiliation ===</option>
            <option value="1">CFC - CODE FOR CHARLOTTE</option>
            <option value="2">CMPD - EASTWAY</option>
            <option value="3">CMPD - HQ</option>
            <option value="4">CMPD - MATTHEWS</option>
            <option value="5">CMPD - HUNTERSVILLE</option>
            <option value="6">CMPD - MINT HILL</option>
            <option value="7">CMPD - CORNELIUS</option>
            <option value="8">CMPD - DAVIDSON</option>
            <option value="9">CMPD - PINEVILLE</option>
            <option value="10">CMPD - NORTH TRYON</option>
            <option value="11">CMPD - UNIVERSITY CITY</option>
            <option value="12">CMPD - FREEDOM</option>
            <option value="13">CMPD - METRO</option>
            <option value="14">CMPD - NORTH</option>
            <option value="15">CMPD - AIRPORT</option>
            <option value="16">CMPD - HICKORY GROVE</option>
            <option value="17">CMPD - INDEPENDENCE</option>
            <option value="18">CMPD - PROVIDENCE</option>
            <option value="19">CMPD - SOUTH</option>
            <option value="20">CMPD - CENTRAL</option>
            <option value="21">CMPD - STEELE CREEK</option>
            <option value="22">CMPD - WESTOVER</option>
            <option value="23">CFD - STATION 1</option>
            <option value="24">CFD - STATION 2</option>
            <option value="25">CFD - STATION 3</option>
            <option value="26">CFD - STATION 4</option>
            <option value="27">CFD - STATION 5</option>
            <option value="28">CFD - STATION 6</option>
            <option value="29">CFD - STATION 7</option>
            <option value="30">CFD - STATION 8</option>
            <option value="31">CFD - STATION 9</option>
            <option value="32">CFD - STATION 10</option>
            <option value="33">CFD - STATION 11</option>
            <option value="34">CFD - STATION 12</option>
            <option value="35">CFD - STATION 13</option>
            <option value="36">CFD - STATION 14</option>
            <option value="37">CFD - STATION 15</option>
            <option value="38">CFD - STATION 16</option>
            <option value="39">CFD - STATION 17</option>
            <option value="40">CFD - STATION 18</option>
            <option value="41">CFD - STATION 19</option>
            <option value="42">CFD - STATION 20</option>
            <option value="43">CFD - STATION 21</option>
            <option value="44">CFD - STATION 22</option>
            <option value="45">CFD - STATION 23</option>
            <option value="46">CFD - STATION 24 </option>
            <option value="47">CFD - STATION 25</option>
            <option value="48">CFD - STATION 26</option>
            <option value="49">CFD - STATION 27</option>
            <option value="50">CFD - STATION 28</option>
            <option value="51">CFD - STATION 29</option>
            <option value="52">CFD - STATION 30</option>
            <option value="53">CFD - STATION 31</option>
            <option value="54">CFD - STATION 32</option>
            <option value="55">CFD - STATION 33</option>
            <option value="56">CFD - STATION 34</option>
            <option value="57">CFD - STATION 35</option>
            <option value="58">CFD - STATION 36</option>
            <option value="59">CFD - STATION 37</option>
            <option value="60">CFD - STATION 38</option>
            <option value="61">CFD - STATION 39</option>
            <option value="62">CFD - STATION 40</option>
            <option value="63">CFD - STATION 41</option>
            <option value="64">CFD - STATION 42</option>
            <option value="65">CMS - ALBEMARLE ROAD </option>
            <option value="66">CMS - ALLENBROOK</option>
            <option value="67">CMS - ASHLEY PARK</option>
            <option value="68">CMS - BAIN</option>
            <option value="69">CMS - BALLANTYNE</option>
            <option value="70">CMS - BARNETTE</option>
            <option value="71">CMS - BARRINGER ACADEMIC</option>
            <option value="72">CMS - BEREWICK</option>
            <option value="73">CMS - BERRYHILL</option>
            <option value="74">CMS - BEVERLY WOODS</option>
            <option value="75">CMS - BILLINGSVILLE</option>
            <option value="76">CMS - BLYTHE </option>
            <option value="77">CMS - BRIARWOOD</option>
            <option value="78">CMS - BRUNS</option>
            <option value="79">CMS - CHANTILLY </option>
            <option value="80">CMS - CLEAR CREEK</option>
            <option value="81">CMS - COLLINSWOOD LANGUAGE</option>
            <option value="82">CMS - CORNELIUS</option>
            <option value="83">CMS - COTSWOLD</option>
            <option value="84">CMS - CROFT COMMUNITY</option>
            <option value="85">CMS - CROWN POINT</option>
            <option value="86">CMS - DAVID COX</option>
            <option value="87">CMS - DAVIDSON</option>
            <option value="88">CMS - DEVONSHIRE</option>
            <option value="89">CMS - DILWORTH</option>
            <option value="90">CMS - DRUID HILLS ACADEMY</option>
            <option value="91">CMS - EASTOVER</option>
            <option value="92">CMS - EE WADDELL LANGUAGE</option>
            <option value="93">CMS - ELIZABETH LANE</option>
            <option value="94">CMS - ELIZABETH TRADITIONAL</option>
            <option value="95">CMS - ELON PARK</option>
            <option value="96">CMS - ENDHAVEN</option>
            <option value="97">CMS - FIRST WARD</option>
            <option value="98">CMS - GRAND OAK</option>
            <option value="99">CMS - GREENWAY PARK</option>
            <option value="100">CMS - GRIER ACADEMY</option>
            <option value="101">CMS - HAWK RIDGE</option>
            <option value="102">CMS - HICKORY GROVE</option>
            <option value="103">CMS - HIDDEN VALLEY</option>
            <option value="104">CMS - HIGHLAND CREEK</option>
            <option value="105">CMS - HIGHLAND MILL MONTESSORI</option>
            <option value="106">CMS - HIGHLAND RENAISSANCE</option>
            <option value="107">CMS - HORNET&rsquo;S NEST</option>
            <option value="108">CMS - HUNTERSVILLE</option>
            <option value="109">CMS - HUNTINGTOWNE FARMS</option>
            <option value="110">CMS - IDLEWILD</option>
            <option value="111">CMS - IRWIN ACADEMIC</option>
            <option value="112">CMS - JH GUNN</option>
            <option value="113">CMS - JV WASHAM</option>
            <option value="114">CMS - LAKE WYLIE</option>
            <option value="115">CMS - LANSDOWNE</option>
            <option value="116">CMS - LAWRENCE ORR</option>
            <option value="117">CMS - LEBANON ROAD ELEMENTARY</option>
            <option value="118">CMS - LONG CREEK</option>
            <option value="119">CMS - MALLARD CREEK</option>
            <option value="120">CMS - MARIE G. DAVIS</option>
            <option value="121">CMS - MATTHEWS</option>
            <option value="122">CMS - MCALPINE</option>
            <option value="123">CMS - MCKEE ROAD</option>
            <option value="124">CMS - MERRY OAKS</option>
            <option value="125">CMS - MONTCLAIRE</option>
            <option value="126">CMS - MOREHEAD STEM</option>
            <option value="127">CMS - MOUNTAIN ISLAND</option>
            <option value="128">CMS - MYERS PARK TRADITIONAL</option>
            <option value="129">CMS - NATHANIEL ALEXANDER</option>
            <option value="130">CMS - NATIONS FORD</option>
            <option value="131">CMS - NEWELL</option>
            <option value="132">CMS - OAKDALE</option>
            <option value="133">CMS - OAKHURST STEAM ACADEMY</option>
            <option value="134">CMS - OAKLAWN LANGUAGE ACADEMY</option>
            <option value="135">CMS - OLDE PROVIDENCE</option>
            <option value="136">CMS - PALISADES PARK</option>
            <option value="137">CMS - PARK ROAD</option>
            <option value="138">CMS - PARKSIDE</option>
            <option value="139">CMS - PAW CREEK</option>
            <option value="140">CMS - PINEVILLE</option>
            <option value="141">CMS - PINEWOOD</option>
            <option value="142">CMS - PINEY GROVE</option>
            <option value="143">CMS - POLO RIDGE</option>
            <option value="144">CMS - PROVIDENCE SPRINGS</option>
            <option value="145">CMS - RAMA ROAD</option>
            <option value="146">CMS - REEDY CREEK</option>
            <option value="147">CMS - REID PARK ACADEMY</option>
            <option value="148">CMS - RIVER GATE</option>
            <option value="149">CMS - RIVER OAKS ACADEMY</option>
            <option value="150">CMS - SEDGEFIELD</option>
            <option value="151">CMS - SELWYN</option>
            <option value="152">CMS - SHAMROCK GARDENS</option>
            <option value="153">CMS - SHARON</option>
            <option value="154">CMS - SMITHFIELD</option>
            <option value="155">CMS - STARMOUNT ES</option>
            <option value="156">CMS - STATESVILLE ROAD</option>
            <option value="157">CMS - STEELE CREEK</option>
            <option value="158">CMS - STERLING</option>
            <option value="159">CMS - STONEY CREEK</option>
            <option value="160">CMS - THOMASBORO</option>
            <option value="161">CMS - TORRENCE CREEK</option>
            <option value="162">CMS - TRILLIUM SPRINGS MONTESSORI</option>
            <option value="163">CMS - TUCKASEEGEE</option>
            <option value="164">CMS - UNIVERSITY MEADOWS</option>
            <option value="165">CMS - UNIVERSITY PARK</option>
            <option value="166">CMS - WALTER G. BYERS</option>
            <option value="167">CMS - WESTERLY HILLS</option>
            <option value="168">CMS - WHITEWATER ACADEMY</option>
            <option value="169">CMS - WINDING SPRINGS</option>
            <option value="170">CMS - WINDSOR PARK</option>
            <option value="171">CMS - WINGET PARK</option>
            <option value="172">CMS - WINTERFIELD</option>
          </select>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Rank</label>
          <input name="rank" className="form-control" type="text" ref={ref => this.rank = ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Phone</label>
          <input name="phone" className="form-control" type="text" ref={ref => this.phone= ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Email</label>
          <input name="email" className="form-control" type="text" ref={ref => this.email = ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Password</label>
          <input name="password" className="form-control" type="password" ref={ref => this.password = ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <div className="form-group has-feedback">
          <label>Confirm Password</label>
          <input name="password_confirmation" className="form-control" type="password" ref={ref => this.password_confirmation = ref}/>
          <i className="fa form-control-feedback"/>
        </div>
        <input className="btn bg-auth btn-block btn-flat" type="submit" value="Register"/>
      </form>
      </div>
      <div className="footer">
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <a className="btn btn-link">
              {' '}
              <i className="fa fa-sign-in"/>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>;
  }
}
