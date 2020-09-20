import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper, IconButton } from '@material-ui/core'
import { Search, Close } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { queryAPI, addNewHolding } from '../../redux/actions/userActions';
import DatePicker from "react-datepicker";
import classnames from 'classnames';

class NewHolding extends React.Component {
	state = {
		correctTicker: false,
		showError: false,
		showSuccess: false,
		searchQuery: ''
	};

	runQueryForTicker = async (e) => {
		e.preventDefault();
		const tickerInput = $('#ticker_search_input');
		await this.props.queryAPI(tickerInput.val());
		
		if (this.props.user.options.length === 1) {
			this.setState({ correctTicker: true, showError: false, showSuccess: false });
			tickerInput.val('');
		} else {
			this.setState({ showError: true, showSuccess: false, searchQuery: tickerInput.val() });
		}
	}

	hideError = () => {
		this.setState({ showError: !this.state.showError });
		$('#ticker_search_input').val('');
	}

	hideSuccess = () => {
		this.setState({ showSuccess: !this.state.showSuccess });
		$('#ticker_search_input').val('');
	}

	handleAddHoldingClick = (data) => {
		this.props.addNewHolding(data);
		this.setState({ correctTicker: false, showSuccess: true });
		setTimeout(this.hideSuccess, 3000);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<div>
							<Link to="/portofolio" className="btn-flat waves-effect left">
								<i className="material-icons left">keyboard_backspace</i>Back to Portofolio
							</Link>
							<div className="col s12" style={{ paddingLeft: "11.250px" }}>
								<h4>Add <b>New Holding</b></h4>
							</div>
						</div>
					</div>
				</div>
				<div className="row ">
					<form className="col s12">
						<div className="row">
							<div className="col s12 m12">
								<div className="input-field col s12 m10">
									<input id="ticker_search_input" type="text" />
									<label htmlFor="ticker_search_input">Enter Ticker</label>
									<span className="helper-text">Use (ticker).TO for Canadian stocks</span>
								</div>
								<div className="col s12 m2 input-field">
									<Button variant="contained" className="right" color="secondary" onClick={this.runQueryForTicker}>
										<Search /> <span className="hide-on-med-and-down">Search</span>
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
				{(this.state.showError) ? <ErrorAlert hideError={this.hideError} searchQuery={this.state.searchQuery} recommendation={this.props.user.options} /> : null}
				{(this.state.showSuccess) ? <SuccessAlert hideSuccess={this.hideSuccess} data={this.props.user.options[0]}/> : null}
				{(this.state.correctTicker) ? <TickerForm data={this.props.user.options[0]} addNewHolding={(data) => this.handleAddHoldingClick(data)} history={this.props.history} /> : null}
			</div>
		);
	}
}

const ErrorAlert = ({hideError, searchQuery, recommendation }) => {
	return (
		<>
			<Alert severity="error" action={
				<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={hideError}
				>
					<Close fontSize="inherit" />
				</IconButton>
			}>
			<AlertTitle>Error: Invalid Ticker Symbol</AlertTitle>
  				I think the ticker which you've entered ({searchQuery}) is incorrect! — <strong>Please try again with a valid ticker symbol!</strong>
				<br />
				<br />
				Suggestion from your input:
				<ol>
					{recommendation.map(rec => {
						return (
							<li key={rec["1. symbol"]}>
								{rec["2. name"]} - {rec["1. symbol"]}
							</li>
						);
					})}
				</ol>
			</Alert>
		</>
	);
}

const SuccessAlert = ({ hideSuccess, data }) => {
	return (
		<>
			<Alert severity="success" variant="filled" action={
				<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={hideSuccess}
				>
					<Close fontSize="inherit" />
				</IconButton>
			}>
				<AlertTitle>Success: {data["2. name"]} has been added to your Portofolio</AlertTitle>
			</Alert>
		</>
	);
}

class TickerForm extends React.Component {
	state = {
		date: new Date(),
		data: this.props.data,
		ticker_quantity: '',
		ticker_costpershare: '',
		shareTicker: this.props.data["1. symbol"],
		errors: {}
	};

	handleChange = date => {
		this.setState({ date });
	}

	onChange = e => {
		e.preventDefault();
		this.setState({ errors: {} });

		if (this.validateInput(e)) {
			this.setState({ [e.target.id]: e.target.value });
		} else {
			console.log("bad data");
			this.setState({ [e.target.id]: '' });
		}
	}

	validateInput = (e) => {
		if (e.target.id === "ticker_costpershare") {
			const val = e.target.value;
			const regex = /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
			const regex2 = /[0-9].$/;

			if (regex.test(val) || regex2.test(val)) {
				return true;
			} else {
				this.setState({ errors: { cps: 'Cost Per Share can only contain numbers/decimals' } });
			}
		} else {
			return true;
		}
	}

	addNewHolding = () => {
		const lastChar = this.state.ticker_costpershare.slice(-1);
		const regex = /[0-9]$/;

		if (regex.test(lastChar)) {
			const newHolding = {
				ts: this.state.shareTicker,
				tq: this.state.ticker_quantity,
				td: this.state.date.toISOString(),
				tc: this.state.ticker_costpershare
			};

			this.props.addNewHolding(newHolding);
			// this.props.history.push("/portofolio");
		} else {
			if (this.state.ticker_quantity === '') {
				this.setState({ errors: { tq: 'Ticker Quantity can not be empty!' } });
			}
			this.setState({ errors: { cps: 'Cost Per Share can only contain numbers/decimals' } });
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<Paper elevation={3} className="container paper_comp__new_holding">
				<div className="row col s12 comp_name">
					<blockquote>
						<b><h4>{this.state.data["2. name"]}</h4></b>
						<h5>({this.state.data["1. symbol"]})</h5>
					</blockquote>
				</div><br />
				<div className="row">
					<div className="col s12">
						<div className="row">
							<blockquote className="new_holding_header"><b>Shares</b></blockquote>
							<div className="input-field col s12">
								<input id="ticker_quantity" type="number" onChange={this.onChange} className={classnames("", { invalid: errors.tq })} value={this.state.ticker_quantity} />
								<label htmlFor="ticker_quantity">Enter # of shares</label>
								<span className="helper-text red-text">{errors.tq}</span>
							</div>
						</div>
						<div className="row" >
							<blockquote className="new_holding_header"><b>Trade Date</b></blockquote>
							<form noValidate>
								<div className="col s12 input-field" id="trade_date">
									<DatePicker
										selected={this.state.date}
										onChange={this.handleChange}
									/>
									<br />
									<span className="helper-text">Date of trade</span>
								</div>
							</form>
						</div>
						<div className="row" >
							<blockquote className="new_holding_header"><b>Cost</b></blockquote>
							<div className="input-field col s12">
								<input id="ticker_costpershare" type="text" className="validate" onChange={this.onChange} value={this.state.ticker_costpershare} />
								<label htmlFor="ticker_costpershare">Cost per Share</label>
								<span className="helper-text">{errors.cps}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="col s12 center-align" style={{ paddingLeft: "11.250px" }}>
					<button
						style={{ borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }}
						type="submit"
						onClick={this.addNewHolding}
						className="btn waves-effect waves-light hoverable blue accent-3">
						<i className="material-icons left">playlist_add</i>Add
					</button>
				</div>
			</Paper>
		);
	}
}

NewHolding.propTypes = {
	queryAPI: PropTypes.func.isRequired,
	addNewHolding: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	user: state.user
});
 
export default connect(
	mapStateToProps,
	{ queryAPI, addNewHolding }
)(NewHolding);