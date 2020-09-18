import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { queryAPI } from '../../redux/actions/userActions';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

class Portofolio extends Component {
	runQueryForTicker = async (e) => {
		e.preventDefault();
		await this.props.queryAPI(e.currentTarget.value);
	}

	render() {
		const columns = [
			{
				name: "tickerSymbol",
				label: "Ticker Symbol",
				options: {
					filter: true,
					sort: true,
				}
			},
			{
				name: "company",
				label: "Company Name",
				options: {
					filter: true,
					sort: false,
				}
			},
			{
				name: "holdings",
				label: "Holdings",
				options: {
					filter: true,
					sort: false,
				}
			},
			{
				name: "div",
				label: "Dividend",
				options: {
					filter: true,
					sort: false,
				}
			},
		];

		const data = [
			{ tickerSymbol: "Joe James", company: "Test Corp", holdings: "Yonkers", div: "NY" },
			{ tickerSymbol: "John Walsh", company: "Test Corp", holdings: "Hartford", div: "CT" },
			{ tickerSymbol: "Bob Herm", company: "Test Corp", holdings: "Tampa", div: "FL" },
			{ tickerSymbol: "James Houston", company: "Test Corp", holdings: "Dallas", div: "TX" },
		];

		const options = {
			download: false,
			print: false,
			responsive: "standard",
			filterType: "checkbox"
		};

		return (
			<div className="container">
				<div className="row">
					<div>
						<Link to="/dashboard" className="btn-flat waves-effect">
							<i className="material-icons left">keyboard_backspace</i>Back to Dashboard
						</Link>
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<h4>My <b>Portfolio</b></h4>
						</div>
					</div>
				</div>
				<div className="row">
					<Grid container spacing={1} justify="center">
						<Grid item component={Card} xs={12} md={3} className="card div_card">
							<CardContent>
								<Typography color="textSecondary" className="card_header" gutterBottom>ALL TIME DIVIDEND</Typography>
								<Typography variant="h5" className="div_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Amount of Dividend Earned</Typography>
							</CardContent>
						</Grid>
						<Grid item component={Card} xs={12} md={3} className="card invested_card">
							<CardContent>
								<Typography color="textSecondary" gutterBottom className="card_header">TOTAL INVESTMENT</Typography>
								<Typography variant="h5" className="invested_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Total amount invested</Typography>
							</CardContent>
						</Grid>
						<Grid item component={Card} xs={12} md={3} className="card monthly_card">
							<CardContent>
								<Typography color="textSecondary" gutterBottom className="card_header">MONTHLY DIVIDEND</Typography>
								<Typography variant="h5" className="monthly_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Amount of Dividend Earned current month</Typography>
							</CardContent>
						</Grid>
					</Grid>
				</div>
				<div className="row">
					<div className="col s12">
						<div className="input-field col s12">
							<input type="text" id="autocomplete_input" className="autocomplete" onKeyUp={this.runQueryForTicker} />
							<option>TEST</option>
							<label htmlFor="autocomplete_input" >Search Ticker Symbol</label>
						</div>
						{/* <button
									style={{ borderRadius: "3px", letterSpacing: "1px", marginTop: "1px" }}
									className="btn btn-large waves-effect waves-light hoverable blue accent-3 right col s2">
									<i className="material-icons left">add</i>Add
								</button> */}
					</div>
				</div>
				<div className="row">
						<div className="col s12">
							<div className="search__container">
								{/* <div className="row">
									<form className="col s12">
										<div className="row">
											<div className="input-field col s12">
												<input id="email" type="email" className="validate" onKeyUp={this.runQueryForTicker}/>
												<label>Ticker Symbol</label>
												<span className="helper-text" data-error="wrong" data-success="right">Type ticker symbol</span>
											</div>
										</div>
									</form>
								</div> */}
								{/* <div className="row">
									<div className="col s12">
										<div className="row">
											<div className="input-field col s12">
												<input type="text" id="autocomplete_input" className="autocomplete" onKeyUp={this.runQueryForTicker}/>
												<label htmlFor="autocomplete_input" >Search Ticker Symbol</label>
											</div>
										</div>
									</div>
								</div> */}
							</div>
							<div className="table__container">
								<MUIDataTable
									title={"Portfolio"}
									data={data}
									columns={columns}
									options={options}
								/>
							</div>
						</div>
					</div>
			</div>
		);
	}
}

Portofolio.propTypes = {
	auth: PropTypes.object.isRequired,
	queryAPI: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	options: state.user.options,
	fetchingData: state.user.fetchingData
});

export default connect(
	mapStateToProps,
	{ queryAPI }
)(Portofolio);