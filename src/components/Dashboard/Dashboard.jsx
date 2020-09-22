import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logUserOut, getAllUsers } from '../../redux/actions/authActions';

class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logUserOut();
	};

	onShowUsersClick = (e) => {
		e.preventDefault();
		this.props.getAllUsers();
	}

	showMyDetails = (e) => {
		e.preventDefault();
		this.props.history.push("/myaccount");
	}

	showMyPortofolio = (e) => {
		e.preventDefault();
		this.props.history.push("/portofolio");
	}

	render() { 
		const user = JSON.parse(localStorage.getItem("user"));

		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="col s12 center-align">
						<h4>
							<b>Hey there,</b> {user.name.split(" ")[0]}
							<p className="flow-text grey-text text-darken-1">
							You are logged into a full-stack{" "}
							<span style={{ fontFamily: "monospace" }}>DIVIDEND TRACKER</span> app 😎
							</p>
						</h4>
						<button style={{ minWidth: "200px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} onClick={this.showMyDetails} className="btn btn-large waves-effect waves-light hoverable blue accent-3">My Account</button><br />
						<button style={{ minWidth: "200px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} onClick={this.showMyPortofolio} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Portofolio</button><br />
						<button style={{ minWidth: "200px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logUserOut: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logUserOut, getAllUsers }
)(Dashboard);