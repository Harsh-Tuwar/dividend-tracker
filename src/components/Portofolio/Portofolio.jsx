import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

class Portofolio extends Component {
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
						<Grid item component={Card} xs={12} md={4} sm={4} lg={4} className="card portofolio_val_card">
							<CardContent>
								<Typography color="textSecondary" className="card_header" gutterBottom>PORTOFOLIO VALUE</Typography>
								<Typography variant="h5" className="portofolio_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										&nbsp;<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Amount of Dividend Earned</Typography>
							</CardContent>
						</Grid>
						<Grid item component={Card} xs={12} md={4} sm={4} lg={4} className="card div_yield_card">
							<CardContent>
								<Typography color="textSecondary" gutterBottom className="card_header">DIVIDEND YIELD</Typography>
								<Typography variant="h5" className="div_yield_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										&nbsp;<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Total amount invested</Typography>
							</CardContent>
						</Grid>
						<Grid item component={Card} xs={12} md={4} sm={4} lg={4} className="card yield_on_cost_card">
							<CardContent>
								<Typography color="textSecondary" gutterBottom className="card_header">YIELD ON COST</Typography>
								<Typography variant="h5" className="yield_on_cost_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										&nbsp;<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Amount of Dividend Earned current month</Typography>
							</CardContent>
						</Grid>
						<Grid item component={Card} xs={12} md={4} sm={4} lg={4} className="card monthly_inc_card">
							<CardContent>
								<Typography color="textSecondary" gutterBottom className="card_header">MONTHLY INCOME</Typography>
								<Typography variant="h5" className="monthly_inc_amnt amnt_container">
									<sup>$</sup>
									<b className="amnt">
										&nbsp;<CountUp start={0} end={50500} duration={2.5} separator="," />
									</b>
								</Typography>
								<Typography variant="body2">Amount of Dividend Earned current month</Typography>
							</CardContent>
						</Grid>
					</Grid>
				</div>
				<div className="row">
					<div className="col s12">
						<Link to="/portofolio/new-holding">
							<button
								className="btn blue waves-effect waves-light right accent-3"
								style={{ borderRadius: '3px' }}
								name="action"
							>
								<i className="material-icons left">add</i>
								New Holding
						</button>
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col s12">
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

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{}
)(Portofolio);